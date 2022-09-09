# Compilation Model

## Strictly Additive

A core technical constraint of Pax is that it is "strictly additive" to existing Rust code.

Pax should never get in the way of compiling your Rust program.  For example, the following should work out of the box:
 - Cargo commands like `cargo test`
 - vanilla CI/CD workflows for Rust
 - Cargo crates, imports & exports

Pax _does_ create different kinds of executables than `rustc`, however:  Pax outputs _application binaries_, for example `.exe` apps for Windows and `.app` for macOS.  While you can still create vanilla Rust executables with a Pax-connected codebase (with `rustc`), you can _additionally_ create app executables (with `pax`).

What do the `pax` macros add to a codebase?  Namely: feature-gated parsing logic & metadata so that the Pax compiler can make sense of _where_ to attach itself and _what_ data to compile.


## Nintendo-Like

Pax's compilation model is inspired by the Nintendo Entertainment System.  For illustration, let's divide the Nintendo into four functional parts:

 - Television (output)
 - Controller (input)
 - Console
 - Cartridge

The NES did not have an operating system, _per se_ — the console was half of a circuit, awaiting the cartridge to be inserted and complete that circuit.  Once connected and powered on, the four pieces together represent a single _application_ (in the NES's case, a game), similar to opening a .exe on Windows or a .apk on Android today.

Now consider Pax through the lens of those four pieces:

 - **Screen & audio / Output** — in Pax, rendering to the screen happens through a native rendering context, e.g. CoreGraphics on macOS and iOS, Direct2D on Windows, and Canvas2D in the browser.

 - **Controller / Input** — In Pax, native events like touch and click are handled by the runtime, similarly to pressing controller buttons on the NES.  A platform-specific `chassis` (see next) is in charge of translating native OS events into Pax's common event model.

 - **Console** — Imagine that instead of a single Nintendo Entertainment System, there were six different kinds of NES, for six different kinds of alien televisions and six different kinds of alien controllers.  Despite the alien nature of the various consoles, however, there's a shared cartridge format, which plugs into each of them.  These alien consoles are roughly the idea of platform-specific `chassis` in Pax (so-called because `console` already has specific meaning to developers.)  Like the Nintendo itself, these `chassis` act as the process entry-point for a given platform.

 - **Cartridge** — The cartridge contains compiled userland Pax code, as machine-code.  Anything written in Pax — templates, settings, expressions — get transpiled to Rust, in a specific format internally termed "RIL" or "Rust Intermediate Language".  That "cartridge definition" in RIL, akin to the integrated circuits of ROM and RAM in a Nintendo cartridge, gets compiled into platform-agnostic machine code, with an interface around the idea of "some user input" and "some rendering output."  That slug of machine code — again, the `cartridge` — gets imported as a dependency by the relevant platform `chassis` and compiled together into the final executable.

Noteworthy about this approach is its _inversion of dependencies_.  When you write a Pax program, you write a `library` rather than a `binary`.  The Pax compiler is in charge of wrapping your `library` into the containing `binary` for distribution, like plugging a cartridge into a console, then packaging the duo as a native software application.

#### Recap
When you write a Pax program, you are authoring a `cartridge`, like an NES game.  When you compile a Pax program, the Pax compiler takes care of plugging that `cartridge` into a platform-specific `chassis`, compiling the whole thing, and producing a syndication-ready executable for the target platform, like an .exe for Windows or a .apk for Android.  

At runtime, the `chassis` maps user inputs into Pax events, and maps Pax rendering commands to an operating system-native drawing context.


# Compiler Sequence

When you run `pax build` or `pax run`, the following sequence occurs:

### 0. Build the parser binary

Any Pax project can be compiled into a special bin target called `parser`.  Pax relies on building and executing this `parser` independently of your actual program, and it is through this special binary that Pax executes dynamic evaluation of Rust logic to finish parsing.  The parsing code is generated as part of the `pax` macros. 

Roughly, when the parser binary is run, it:
 - Looks for root component definitions (via `pax_root`)
 - For each of those roots, parses the template and discovers which dependencies are invoked, and parses properties to resolve names, types, and import paths
 - Code-gens recursive calls into Component dependencies' `parse_to_manifest` methods

Primarily, this approach solves the problem of "coordinating between macros," given that `rustc` makes no promises about when macros will be evaluated, and in practice evaluates macros seldom.  This model assures that `parse_to_manifest` always exists and is always as up-to-date as its attached Pax + Rust definitions.

### 1. Run the parser binary

After generating the `parse_to_manifest` logic during the compilation of the parser binary (above,) the Pax compiler calls the resulting executable, which gathers all the parsed information of a Pax program, packs that data into a `PaxManifest`, then serializes and passes that manifest back to the Pax compiler.

This `PaxManifest` represents the entire definition of the program, in a simple data structure.  Once the `PaxManifest` is populated, the parsing work is done.

### 2. Codegen

From the `PaxManifest` obtained by parsing, Pax generates "Rust Intermediate Language", i.e. just plain Rust in a specific configuration for the purposes of the Pax runtimes.  Some components of RIL:
 - The `PropertiesCoproduct` — data structure representing the disjoint union of all component property types, used by runtime to enable polymorphic management of Components and their Properties,
 - The `TypesCoproduct` — data strucure representing the disjoint union of all Property types, used by the runtime to enable polymorphic management of expression vtable entries, expression parameters, and expression return types
 - The `cartridge definition` — two major components:
   - a vtable containing every compiled Expression and
   - instance factories for components & primitives, invoked recursively underneath `get_root_component_instance`


### 3. Chassis Compilation

Recall the "inversion of dependencies" described earlier in this chapter.  The final executable for a given platform is the whole "NES Console", but we have only been building the "Cartridge" thus far.

Now it's time to put the cartridge into the console — which means we must involve a different compiler.  For example, to build for macOS, `xcode` is invoked to build the Swift + C `dev harness` which embeds the macOS `chassis`, which in turn embeds the dynamic `cartridge` built by Pax.

The `dev harness` is a nearly empty macOS app, built in Swift and Xcode, intended for developing Pax.  The harness + the chassis is collectively our metaphorical console.  Not yet built at the time of this authoring is a `production harness`, which is a separate macOS app (or configuration of the same macOS app) tuned for production builds.

To pass the compiled, code-genned `cartridge` into this compilation chain, the Pax compiler uses the Cargo `patch` directive.  This swaps the "placeholder" definitions, the basic stubs included on GitHub for `pax-cartridge` and `pax-properties-coproduct`, for example, out for the new, freshly generated `cartridge` content.

Now, when compiled through Xcode (for our macOS example,) we have a complete, native executable.

### 4. Run or Finish

Depending on whether you tasked the compiler with `run` or `build`, the compiler will either run the resulting executable immediately, or write the executable to disk in the specified directory


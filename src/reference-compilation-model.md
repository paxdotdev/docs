# Compilation Model

Pax's compilation model is inspired by the Nintendo Entertainment System.  For illustration, let's divide the Nintendo into four functional parts:

 - Screen & audio (output)
 - Controller (input)
 - Console
 - Cartridge

The NES did not have an operating system, _per se_ — the console was half of a circuit, awaiting the cartridge to be inserted and complete that circuit.  Once connected and powered on, the four pieces together represent a single _application_ (in the NES's case, a game), similar to opening a .exe on Windows or a .apk on Android today.

Now let's consider Pax through the lens of those four pieces:

 - **Screen & audio / Output** — in Pax, rendering to the screen happens through a native rendering context, e.g. CoreGraphics on macOS and iOS, Direct2D on Windows, and Canvas2D in the browser.

 - **Controller / Input** — In Pax, native events like touch and click are handled by the runtime, similarly to pressing controller buttons on the NES.  A platform-specific `chassis` (see next) is in charge of translating native OS events into Pax's common event model.

 - **Console** — Imagine that instead of a single Nintendo Entertainment System, there were six different kinds of NES, for six different kinds of alien televisions and six different kinds of alien controllers.  Despite the alien nature of the various consoles, however, there's a universal, shared cartridge format, which plugs into each of them.  These alien consoles are roughly the idea of platform-specific `chassis` in Pax (so-called because `console` already has specific meaning to developers.)  Like the Nintendo itself, these `chassis` act as the process entry-point for a given platform.

 - **Cartridge** — The cartridge contains compiled userland Pax code.  Anything written in Pax — templates, settings, expressions — get transpiled to Rust, in a specific format internally termed "RIL" or "Rust Intermediate Language".  That "cartridge definition" in RIL, akin to the integrated circuits of ROM and RAM in a Nintendo cartidge, gets compiled into platform-agnostic machine code, with an interface around the idea of "some user input" and "some rendering output."  That slug of machine code — again, the `cartridge` — gets imported as a dependency by the relevant platform `chassis`, and compiled together into the final executable.

Perhaps the most noteworthy piece of this approach is the _inversion of dependencies_ that it applies.  That is, when you write a Pax program, you are writing a `library` rather than a `binary`.  The compiler is in charge of wrapping your `library` into the containing `binary` for distribution, and it is exactly this approach — the "alien NES console" approach — that enables Pax's cross-platform compilation of shared logic.


### Recap
When you write a Pax program, you are authoring a `cartridge`, like an NES game.  When you compile a Pax program, the Pax compiler takes care of plugging that `cartridge` into a platform-specific `chassis`, compiling the whole thing, and producing a syndication-ready executable for the target platform, like an .exe for Windows or a .apk for Android.  

At runtime, the `chassis` maps user inputs into Pax events, and maps Pax rendering commands to an operating system-native drawing context.


# Compiler Internals

When you run `pax build` or `pax run`, the following sequence occurs:

### 0. Build the parser binary

Any Pax project can be compiled into a special bin target called `parser`.  This bin target also includes the activated feature `parser`.  When you compile a Pax project, the first step executed by the compiler is to compile your project into this parser binary.  In order to do this, the `pax` macros will be expanded.  These macros include generation of the necessary logic for the praser binary.

Roughly, when the parser binary is run, it:
    - Looks for root component definitions (e.g. via `pax_root`)
    - For each of those roots, parses the template and discovers which dependencies are invoked
    - Codegens recursive calls into those dependencies' `parse_to_manifest` method. 

Primarily, this approach solves the problem of "coordinating between macros," given that `rustc` makes no promises about when macros will be evaluated.  This model assures that `parse_to_manifest` always exists and is always as up-to-date as its attached Pax + Rust definitions.
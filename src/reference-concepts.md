# Concepts



## Components
The atomic unit of Pax is a `component definition`.  When you write Pax, you will usually be editing a component definition.  Any component created in Pax can be used inside other components.  This "components all the way down" pattern may be familiar if you have used a framework like React or Vue.

## Host Codebase
`Component definitions` attach to a host codebase — currently, a Rust codebase — which is where **properties** are declared and **imperative, side-effectful logic** occurs.

The host codebase is also responsible for module definitions & imports — for example, using `<SomeComponent />` in a template requires that `SomeComponent` is available to `rustc` in the local file scope — for example:

```rust
use some_lib::SomeComponent; //required import for use in template below

#[pax(
    <SomeComponent />
)]
pub struct SomeHigherComponent {} //We are defining the Pax component `SomeHigherComponent` here
```

 
## Primitives
Primitives are a special case of `component` — they are "advanced mode" components with direct access to the engine, runtime, and rendering context.  Primitives are authored in pure Rust, without any Pax language sugar: templates, expressions, or settings.

Most of Pax's included primitives are housed in the standard library (`pax-std`), and include: `<Group />`, `<Rectangle />`, `<Frame />`, and `<Image />`.  The built-in constructs for control flow, like `if` (`Conditional`) and `for` (`Repeat`) are implemented as primitives, too, with special handling by the engine.

**Using** primitives is easy.  Any place you can use a component in a template, you can use a `primitive` instance in exactly the same way.  For example, `<Stacker />` is a component, but `<Rectangle />` is a primitive.  They are consumed the same way.

**Authoring** primitives is more advanced.  This should be better documented (TODO) — for now, refer to `pax-std/pax-std-primitives/src/*` and `pax-std/src/lib.rs`.  Primitives are authored in an engine-adjacent context, where certain imports are disallowed to avoid circular dependencies.  

This complexity is due to Pax's [compilation model](/reference-compilation-model), where the userland logic is ultimately a _dependency of_ the engine, instead of the other way around.  This is normally papered over when writing normal components and applications — the compiler handles this dependency inversion.  When writing primitives, it is useful to comprehend this distinction.

Primitives are exposed to userland (e.g. for importing and using `<Group />`) through the `pax_primitive` macro — you can find examples of this in `pax-std/src/lib.rs`.


## Templates

Templates declare the 

 - Expressions
 - Properties & Settings

# Concepts



## Components
The atomic unit of Pax is a `component definition`.  When you write Pax, you will usually be editing a component definition.  Any component created in Pax can be used inside other components.  This "components all the way down" pattern may be familiar if you have used a framework like React or Vue.

## Host Codebase
`Component definitions` attach to a host codebase — currently, a Rust codebase — which is where **properties** are declared and **imperative, side-effectful logic** occurs.

The host codebase is also responsible for module definitions & imports — for example, using `<SomeComponent />` in a template requires that `SomeComponent` is available in the local file scope — for example:

```rust
use some_lib::SomeComponent;

#[pax(
    <SomeComponent /> //usable here because `some_lib::SomeComponent` is imported above.
)]
pub struct SomeApp {} //We are defining the Pax component `SomeApp` here, with the template declared above.
```

 
## Primitives
Primitives are a special case of `component` — they are "advanced mode" components with direct access to the engine, runtime, and rendering context.  Primitives are authored in pure Rust, without any Pax language sugar: templates, expressions, or settings.

Most of Pax's included primitives are housed in the standard library (`pax-std`), and include: `<Group />`, `<Rectangle />`, `<Frame />`, and `<Image />`.  The built-in constructs for control flow, like `if` (`Conditional`) and `for` (`Repeat`) are implemented as primitives, too, with special handling by the engine.

**Using** primitives is easy.  Any place you can use a component in a template, you can use a `primitive` instance in exactly the same way.  For example, `<Stacker />` is a component, but `<Rectangle />` is a primitive.  They are consumed the same way.

**Authoring** primitives is more advanced.  This should be better documented (TODO) — for now, refer to `pax-std/pax-std-primitives/src/*` and `pax-std/src/lib.rs`.  Primitives are authored in an "engine-adjacent" context, where certain imports are disallowed to avoid circular dependencies.  This complexity is due to Pax's compilation model.  Separately, primitives are exposed to userland (e.g. for importing and using `<Group />`) through the `pax_primitive` macro.  This macro



## Templates

 - Expressions
 - Properties & Settings

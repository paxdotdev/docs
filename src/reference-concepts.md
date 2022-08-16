# Concepts




## Components
The atomic unit of Pax is a `component definition`.  Almost any time you write Pax, you'll be creating or contributing to a component definition.  This pattern may be familiar if you have used a framework like React or Vue.

Any component created in Pax can be used inside other components.  This model has been described as "components all the way down."  
## Host Codebase
`Component definitions` attach to a host codebase — currently, Rust — which is where properties are declared and imperative, side-effectful logic occurs.


 
## Primitives
Primitives are a special case of `component` — they are "advanced mode" components with direct access to the engine, runtime, and rendering context.  Primitives are authored in pure Rust, without any Pax-level templates, expressions, or settings.

Most of Pax's primitives are housed in `pax-std`, and include: `<Group />`, `<Rectangle />`, `<Frame />`, and `<Image />`.

**Using** primitives is easy.  Any place you can declare a reusable component in a template, you can declare a `primitive` instance in exactly the same way.

**Authoring** primitives is more advanced.  This should be better documented (TODO) — for now, refer to `pax-std/pax-std-primitives/src/*` and `pax-std/src/lib.rs`.  Primitives are authored in a special "engine-adjacent" context, then exposed to userland (e.g. for importing and using `<Group />` in a Pax template) through the `pax_primitive` macro.




## Templates


 - Expressions
 - Properties & Settings

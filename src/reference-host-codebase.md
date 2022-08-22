# Host Codebase

`Component definitions` attach to a **host codebase** — currently, a Rust codebase — which is where **properties** are declared and **imperative, side-effectful logic** occurs.

The host codebase is also responsible for module definitions & imports — for example, using `<SomeComponent />` in a template requires that `SomeComponent` is available to `rustc` in the local file scope — for example:

```rust
use some_lib::SomeComponent; //required import for use in template below

#[pax(
    <SomeComponent />
)]
pub struct SomeHigherComponent {} //We are defining the Pax component `SomeHigherComponent` here
```
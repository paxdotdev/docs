# The Pax Language

Pax is a Rust-based language for interactive graphics & GUIs.  As of September 2022, Pax is [in alpha preview](./status-sept-2022.md).  

Pax works as a companion language to Rust.  Here's a simple example:

```rust

#[pax(
    <Text>"Hello, world!"</Text> // pax
)]
pub struct HelloWorld {} // rust

```
_Above: the `#[pax()]` Rust macro attaches some Pax rendering content to the Rust struct `HelloWorld`_

In addition to static content like the example above, Pax supports [high-performance](./intro-goals-prior-art.md) 2D drawing, expressions, animations, composable responsive layouts, and form controls for GUIs.

The Pax compiler outputs platform-specific application executables, for example `.app`s for macOS or `.wasm`-powered webpages for browsers.  Today, Pax supports only Web and macOS, though it is planned to extend to: iOS, Android, Windows, and Linux.

This book will give a brief introduction to Pax: its goals, how to use it, and details of is design and implementation.

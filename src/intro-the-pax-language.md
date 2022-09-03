# The Pax Language

Pax is a Rust-based language for interactive graphics & GUIs.  As of September 2022, Pax is [in alpha preview](./intro-current-status.md).

Pax works as a companion language to Rust.  Here's a simple, static example:

```rust

#[pax(
    <Text>"Hello, world!"</Text> // pax
)]
pub struct HelloWorld {} // rust

```

In addition to static content like the text example above, Pax supports [high-performance](./intro-goals-prior-art.md) 2D drawing, dynamic expressions, animations, composable responsive layouts, and (soon) form controls for GUIs.

The Pax compiler outputs platform-specific application executables, for example `.app`s for macOS or `.wasm`-powered webpages for browsers.  Today, Pax supports only Web and macOS, though it is planned to extend to: iOS[1], Android, Windows, and Linux.

This book will give a brief introduction to Pax: its goals, how to use it, and details of is design and implementation.


--

[1] As of September 2022, Pax native iOS development is about 90% ready
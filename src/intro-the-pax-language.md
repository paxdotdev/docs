# The Pax Language

Pax is a Rust-based language for interactive graphics & GUIs.  As of September 2022, Pax is [in alpha preview](./intro-current-status.md).

Pax works as a companion language to Rust.  Here's a simple, static example:

```rust

#[pax(
    <Text>"Hello, world!"</Text> // pax
)]
pub struct HelloWorld {} // rust

```

The above compiles into a platform-specific executable, for example a `.app` for macOS or a `.wasm`-powered webpage for browsers.  Today, Pax supports only Web and macOS, though it is designed to be extensible to at least: iOS (90% complete), Android, Windows, and Linux.

In addition to static content like the text example above, Pax supports [high-performance](./intro-goals-prior-art.md) 2D drawing, animations, composable responsive layouts, and (soon) form controls for GUIs.

This book will give a brief introduction to Pax — its goals, how to use it, and details of is design and implementation.

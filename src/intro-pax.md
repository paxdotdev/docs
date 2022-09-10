# Introduction to Pax

<br />

---

# STATUS: DRAFT
**Pax is not yet available on GitHub -- these docs are drafted in preparation for release and are not yet intended for broad publication.**

---

<br />
<br />


Pax is a Rust-based language for interactive graphics & GUIs.  As of September 2022, Pax is [in alpha preview](./status-sept-2022.md).  

Pax works as a companion language to Rust.  Here's a simple example:

```c

#[pax(                              //rust
    <Text>"Hello, world!"</Text>    //pax
)]                                  //rust
pub struct HelloWorld {}            //rust

```
<!-- <div style="font-weight: 100; font-style: italic; text-align: center;">
Above: the <span style="font-family: courier new;">#[pax()]</span> Rust macro attaches some Pax rendering content to the Rust struct `HelloWorld`
</div> -->


In addition to static content like the example above, Pax supports [high-performance](./intro-goals-prior-art.md) 2D drawing, expressions, animations, composable responsive layouts, and form controls for GUIs.

The Pax compiler outputs platform-specific application executables, for example `.app`s for macOS or `.wasm`-powered webpages for browsers.  Today, Pax supports only Web and macOS, though it is planned to extend to: iOS, Android, Windows, and Linux.

This book will give a brief introduction to Pax: its goals, how to use it, and details of is design and implementation.

# Introduction to Pax

Pax is a cross-platform rendering engine & Rust framework for interactive graphics, animations, and GUIs.

Pax extends the Rust programming language with a syntax for declarative component-based graphical content and behavior. Pax programs compile through Rust into lightweight native app executables or WebAssembly-powered Web apps with a <100kB base footprint and up to 120FPS rendering.

As of September 2022, Pax is being developed in the open, [in alpha preview](./status-sept-2022.md).

Here's a simple Pax component called `IncrementMe`:

```rust
//increment-me.rs

use pax::*;
use pax_std::{Text};
use pax_std::forms::{Button, ArgsButtonSubmit};
use pax_std::layout::{Stacker};

#[pax(
  <Stacker cells=2>
    <Text>{"I have been clicked " + self.num_clicks + " times."}</Text>
    <Button @submit=self.increment>"Increment me!"</Button>
  </Stacker>
)] 
pub struct IncrementMe {
  pub num_clicks: Property<i64>
}
impl IncrementMe {
  pub async fn increment(&self, args: ArgsButtonSubmit) {
    let old_num_clicks = self.num_clicks.get();
    self.num_clicks.set(old_num_clicks + 1);
  }
}

```

Any Pax component like the example above may be included inside other Pax components, or may be mounted as the root of a stand-alone app.

This book will give a brief introduction to Pax: its goals, how to use it, and details of is design and implementation.

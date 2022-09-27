# Introduction to Pax

Pax is a cross-platform graphical app runtime and [declarative](https://docs.pax-lang.org/reference-designability.html) authoring language.  

Pax aims to render any GUI or interactive 2D graphics you could imagine, offering fine-grained control over 2D vector drawing and animations.

Pax is authored alongside Rust, and compiles through Rust into lightweight native executables or WebAssembly-powered Web apps.

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

This book will give a brief introduction to Pax: its goals, how to use it, and details of is design and implementation.

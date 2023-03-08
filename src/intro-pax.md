# Introduction to Pax

Pax is a user interface language and 2D layout engine.  Use Pax to develop cross-platform apps with Rust.

Pax compiles through Rust into native Mac apps (LLVM) or Web apps (WebAssembly). Support for more platforms is planned, at least: Linux, Windows, iOS, and Android.

As of September 2022, Pax is being developed in the open, [in alpha preview](./status-sept-2022.md).


## Example

Writing Pax is intended to feel familiar, and the language borrows many ideas from [prior art](./intro-goals-prior-art.md#prior-art--inspiration).

Following is a simple Pax component called `IncrementMe`:

```rust
//increment-me.rs

use pax::*;
use pax_std::{Text};
use pax_std::forms::{Button, ArgsButtonSubmit};
use pax_std::layout::{Stacker};

/// Following is the description of a simple form GUI, encapsulated 
/// into a reusable component called `IncrementMe`.

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
The above `IncrementMe` component could be mounted as its own app, or could be composed into other Pax components.

This book will give a brief introduction to Pax: its goals, how to use it, and details of is design and implementation.

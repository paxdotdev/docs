# Introduction to Pax


Pax is a Rust-based language for interactive graphics & GUIs.  As of September 2022, Pax is being developed in the open, [in alpha preview](./status-sept-2022.md).  

Pax works as a companion language to Rust. Here's a simple example of a Pax component called `IncrementMe`:

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
  pub async fn increment(mut self, args: ArgsButtonSubmit) {
    let old_num_clicks = self.num_clicks.get();
    self.num_clicks.set(old_num_clicks + 1);
  }
}

```

In addition to responsive layouts, form controls, and GUIs, Pax supports [high-performance](./intro-goals-prior-art.md) 2D vector drawing and 120fps rendering with fine-grained, creativity-friendly animation APIs.

Pax runs in browsers via WebAssembly and as native macOS apps via LLVM. Native support will be extended to: iOS, Android, Windows, and Linux.


This book will give a brief introduction to Pax: its goals, how to use it, and details of is design and implementation.

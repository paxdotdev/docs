# Introduction to Pax

Pax extends the Rust programming language with a syntax for declarative component-based GUIs.

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

In addition to responsive layouts, form controls, and GUIs, Pax [aims to maintain](./intro-goals-prior-art.md) high-performance 2D vector drawing and 120fps rendering with fine-grained, creativity-friendly animation APIs.

Pax compiles across platforms: as native macOS apps via LLVM and in browsers via WebAssembly. Native targets will be extended to: iOS, Android, Windows, and Linux.


This book will give a brief introduction to Pax: its goals, how to use it, and details of is design and implementation.

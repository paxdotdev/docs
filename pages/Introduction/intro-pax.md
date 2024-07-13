# Introduction to Pax

Build extremely fast user interfaces that run anywhere.

Write application logic in Rust (or TypeScript, coming soon) — declare your user interface in Pax's user interface description language.

Pax compiles into native desktop/mobile apps, WebAssembly-driven sites, and embeddable universal UI components.

## Example

Writing Pax is intended to feel familiar, and the language borrows many ideas from [prior art](./intro-priorities-and-prior-art#prior-art--inspiration).

Following is a simple Pax component called `IncrementMe`:

<iframe style="width: calc(100%); height: 200px; border: none;" src="https://static.pax.dev/increment/"></iframe>


```pax
//increment-me.pax
<Group x=50% y=50% width=120px height=120px @click=self.increment >
    <Text text={self.num_clicks + " clicks"} id=text />
    <Rectangle
        fill={rgb(ticks, 75, 150)}
        corner_radii={RectangleCornerRadii::radii(10.0,10.0,10.0,10.0)}
    />
</Group>

@settings {
    @pre_render: handle_pre_render,
    #text {
        style: {
                font: {Font::system("Times New Roman", FontStyle::Normal, FontWeight::Bold)},
                font_size: 22px,
                fill: WHITE,
                align_vertical: TextAlignVertical::Center,
                align_horizontal: TextAlignHorizontal::Center,
                align_multiline: TextAlignHorizontal::Center
        }
    }
}
```

```rust
//File: lib.rs
#![allow(unused_imports)]

use pax_engine::api::*;
use pax_engine::*;
use pax_std::components::Stacker;
use pax_std::components::*;
use pax_std::primitives::*;
use pax_std::types::text::*;
use pax_std::types::*;

#[pax]
#[main]
#[file("lib.pax")]
pub struct Example {
    pub ticks: Property<usize>,
    pub num_clicks: Property<usize>,
}

impl Example {
    pub fn handle_pre_render(&mut self, ctx: &NodeContext) {
        let old_ticks = self.ticks.get();
        self.ticks.set((old_ticks + 1) % 255);
    }

    pub fn increment(&mut self, ctx: &NodeContext, args: Event<Click>) {
        let old_num_clicks = self.num_clicks.get();
        self.num_clicks.set(old_num_clicks + 1);
    }
}
```

The above `IncrementMe` component could be mounted as its own app, or could be composed into other Pax components.

This book will give a brief introduction to Pax: its goals, how to use it, and details of is design and implementation.

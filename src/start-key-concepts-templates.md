# Templates

A component's _template_ describes that component's _content_ and _hierarchy_.  

Example template:
```
<Group>
    <Rectangle />
</Group>
```

Each component declares a template in an XML-like syntax, which describes how its UI should be displayed.  A component's template is made up of other components.


## Control flow

Templates are not just static -- they allow three kinds of control-flow, affecting the tree structure of the template based on certain data conditions.

#### `if`

`if` allows turning on or off a subtree of a template dynamically, based on a boolean condition.  For example:


```rust
use pax_lang::api::*;
use crate::{DetailsView, SummaryView};

#[derive(Pax)]
#[inlined(
    <Group>
        if self.should_show_details {
            <DetailsView />
        } else {
            <SummaryView />
        }
    </Group>
)]
pub struct IfExample {
    pub should_show_details: Property<bool>
}
```

Internally, Pax handles evaluation of the `if` condition as an Expression, via the primitive `Conditional`.  

#### `for`

`for` allows repeating of template elements dynamically based on data.  

For example:



```rust
use pax_lang::api::*;
use pax_std::layout::{Stacker, StackerDirection};
use crate::DeviceRecord;


#[derive(Pax)]
#[inlined(
    <Stacker>
        for device_record in self.connected_devices {
            <Stacker direction=StackerDirection::Vertical cells=3>
                <Text text={device_record.id}></Text>
                <Text text={device_record.name}></Text>
                <Text text={device_record.load_capacity}></Text>
            </Stacker>
        }
    </Stacker>
)]
pub struct ForExample {
    pub connected_devices: Property<Vec<DeviceRecord>>
}
```

Internally, Pax handles the `for` range declaration as an Expression, via the primitive `Repeat`.  


#### `slot`
`slot` allows a component to _defer its content_ at a certain place in its template.  Specifically, it _defers its content_ to the component's instantiator.

For a practical example, consider `<Stacker />`.  When you use a Stacker, you pass children into it, like:
```rust
//src/slot-example.rs
#[derive(Pax)]
#[inlined(
    <Stacker>
        <Rectangle id=a />
        <Rectangle id=b />
        <Rectangle id=c />
    </Stacker>
)]
pub struct SlotExample {}
```

When `Stacker` renders, like any component, it will render the elements declared in its template, from `/pax-std/.../stacker.rs`.  However, the above rectangles are NOT in Stacker's template; they are declared in `SlotExample`'s template in `./slot-example.rs`.  

How do we "teleport" these `Rectangle`s from `SlotExample`'s template into `Stacker`?  The answer is `slot`.

If you pop open the source code for `Stacker`, you will find that it uses the `slot` keyword in its template, along with an index specifying "which indexed child should go in this slot."

If we were to write a new simplified `Stacker` that only accepts three children, its template might look like:

```rust
<Frame id=cell_0>
    slot(0) //the 1st child to an instance of this component will get mounted here
</Frame>
<Frame id=cell_1>
    slot(1) //the 2nd child to an instance of this component will get mounted here
</Frame>
<Frame id=cell_2>
    slot(2) //the 3rd child to an instance of this component will get mounted here
</Frame>
```

Because `slot`, like `if` and `repeat`, is evaluated as an expression, you can also pass symbol values (expressions) into `slot`s arguments.  This is how the real Stacker accepts `i` dynamic children via `slot`, with a template like: 

```rust
for (elem, i) in self.computed_layout_spec {
    <Frame x={elem.x_px} y={elem.y_px} width={elem.width_px} height={elem.height_px}>
        slot(i)
    </Frame>
}
```
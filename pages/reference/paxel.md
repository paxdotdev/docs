# PAXEL

PAXEL is Pax's expression language.

### The Language

PAXEL is very similar to at least two existing languages: Microsoft's Excel spreadsheet formula language, and Google's Common Expression Language (CEL). PAXEL shares the following characteristics with CEL[1]:

> **memory-safe**: programs cannot access unrelated memory, such as out-of-bounds array indexes or use-after-free pointer dereferences;
> 
> **side-effect-free**: a PAXEL program only computes an output from its inputs;
> 
> **terminating**: PAXEL programs cannot loop forever;
> 
> **strongly-typed**: values have a well-defined type, and operators and functions check that their arguments have the expected types;
> 
> **type-inferred**: while explicit type declarations are not required in PAXEL, a type-checking phase occurs before runtime via `rustc`, which detects and rejects programs that would violate type constraints.

**Why not CEL?** Because PAXEL and CEL are so alike, it was tempting to use CEL rather than create a new language.  However:  PAXEL has a tighter, more specialized scope than CEL and carries a much smaller runtime footprint — namely because CEL is written in Go, which requires embedding Go's runtime and garbage collector, adding megabytes to every WASM / binary file.  Further, having complete control of the memory underlying the expression runtime enables the scoping & integration functionality between Pax Properties and Pax Expressions, and the Rust-based machine-code-compiled Expression vtable fits nicely within Pax's ["cartridge" model](./compilation-model.md).

### PAXEL Grammar

See [the source code](https://github.com/paxengine/pax/blob/master/pax-lang/src/pax.pest#L169).

### Symbolic Identifiers in PAXEL

The following are valid symbolic identifiers in PAXEL:

 - properties from the attached Rust struct, such as `self.some_symbol` from `#[pax] pub struct Foo {some_symbol: Property<usize>}`
 - temporaries created by for loops (like `i` in `for i in 0..10`)
 - functions exposed as *helpers* on Pax structs
 - certain grammar built-ins like color constants (RED, BLUE, etc.)

If a PAXEL expression refers to `self.some_symbol`, it will be reactively subscribed to changes in `self.some_symbol`, updating via the Pax runtime similarly to how a spreadsheet updates.

### Helpers

Helpers are functions exposed on a struct and available in PAXEL.  See the following example of helpers as exposed by PathElement in pax-std:

```
#[pax]
#[has_helpers]
pub enum PathElement {
    #[default]
    Empty,
    Point(Size, Size),
    Line,
    Curve(Size, Size),
    Close,
}

#[helpers]
impl PathElement {
    pub fn line() -> Self {
        Self::Line
    }
    pub fn close() -> Self {
        Self::Close
    }
    pub fn point(x: Size, y: Size) -> Self {
        Self::Point(x, y)
    }
    pub fn curve(x: Size, y: Size) -> Self {
        Self::Curve(x, y)
    }
}
```

Example usage of the above in Pax:

```
<Path class=hr />
@settings {
    .hr {
        elements: {[
            PathElement::point(0%, 0%),
            PathElement::line(),
            PathElement::point(100%, 0%),
        ]},
        stroke: {
            color: rgb(40, 48, 54),
            width: 1px,
        },
        fill: NONE
    }
}
```

### Shadowing

PAXEL supports shadowed nested symbol declarations, for example you can redeclare `i` across two nested for loops.

---

[1] Text modified from source: https://github.com/google/cel-spec/blob/master/doc/langdef.md


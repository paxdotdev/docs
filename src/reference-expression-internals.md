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

**Why not CEL?** Because PAXEL and CEL are so alike, it was tempting to use CEL rather than create a new language.  Here's why it shook out this way:  PAXEL has a tighter, more specialized scope than CEL and carries a much smaller runtime footprint — namely because CEL is written in Go, which requires embedding Go's runtime and garbage collector.  Further, having complete control of the memory underlying the expression runtime enables the scoping & integration functionality between Pax properties and Pax expressions, and the Rust-based machine-code-compiled Expression vtable fits nicely within Pax's ["cartridge" model](./reference-compilation-model.md).



### PAXEL Compilation

PAXEL is compiled by transpiling through Rust.  In practice, this is fairly straight-forward — in many cases, PAXEL and Rust are syntatically identical.

The largest difference comes in PAXEL's scoping mechanism — for example, inside a [template `for` loop](./start-key-concepts-templates.md#for), PAXEL can refer to the scoped _predicate declaration_ (e.g. the `i` in `for i in 0..10`).  For example:

```
//template:
<Group>
    for i in 0..10 {
        <Rectangle transform={Translate2D::translate(i * 100.0, i * 100.0)} /> //notice that PAXEL can refer to the `i` from the for loop.  This works when nesting `for` loops, too.
    }
</Group>
```

PAXEL can also refer to symbols available on the attached Rust stuct, through `self.some_symbol`.

PAXEL also shadows scopes, allowing stacking of scope contexts and overriding previously scoped symbols with newer/more specific references.



---

[1] Text modified from source: https://github.com/google/cel-spec/blob/master/doc/langdef.md
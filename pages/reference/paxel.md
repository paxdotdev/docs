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

### PAXEL Compilation

[//]: # (62e3c3e1ceb61335e83d631afbbb5080:start)

PAXEL is compiled by transpiling through Rust.  In practice, this is fairly straight-forward — in many cases, PAXEL and Rust are syntactically identical.

PAXEL's scoping mechanism requires special consideration by Pax's compiler — for example, inside a [template `for` loop](../key-concepts/templates.mdx#for), PAXEL can refer to the scoped _predicate declaration_ (e.g. the `i` in `for i in 0..10`). 

```pax
//template:
<Group>
    for i in 0..10 {
        //notice that PAXEL can refer to the `i` from the for loop.  This works when nesting `for` loops, too.
        <Rectangle transform={Translate2D::translate(i * 100.0, i * 100.0)} /> 
    }
</Group>
```

PAXEL can also refer to symbols available on the attached Rust struct, through `self.some_symbol`, and can refer to certain cartridge "prelude imports", a [compiler-hard-encoded list]() of symbols that are imported and available to all Expressions, such as `Transform2D::*` and `Color::*` (which is where `translate()`, `scale()`, `rgba()`, etc. are defined.) .

PAXEL shadows scopes, allowing stacking of scope contexts and overriding previously scoped symbols with newer/more specific references — for example, when nesting `for` loops.

Finally, PAXEL can refer to the symbol representing the type of the Property associated with an expression — for example an expression bound to `some_complex_property: Property<SomeComplexType>` can use `SomeComplexType`:
```jsx
#some_id {
    some_complex_property: {
        // The following returns a new instance of SomeComplexType.
        // The symbol `SomeComplexType` may be used here because the Pax compiler + runtime knows
        // that `some_complex_property`'s type is `Property<SomeComplexType>`.
        SomeComplexType {
            a: self.num_clicks + 5,
            b: self.active_width,
            c: "Hello"
        }
    }
}
```

[//]: # (62e3c3e1ceb61335e83d631afbbb5080:stop)

With a reasonable and finite amount of work, PAXEL will also be able to refer to "anything within scope" within a Rust file, allowing the import & use of arbitrary symbols & packages.  This approach will build on the `get_type_id` work done by the parser to reflect on Property types.  Until that time, using an arbitrary import — for example, calling an imported method — requires re-exposing that method through a method available on `self`.

---

[1] Text modified from source: https://github.com/google/cel-spec/blob/master/doc/langdef.md
# PAXEL (Pax Expression Language)

```
<Rectangle transform={
    rotate(engine.frames_elapsed / 200.0) *
    translate(in.mouse_x, in.mouse_y)
}/>
```

Consider the above snippet of Pax.  If you're familiar with a templating language like JSX, you might expect that the Expression code within the braces above `{ ... }` is inline Rust code.  It's not.

That is PAXEL -- part of Pax, a special-purpose language for declaring computed properties in the spirit of spreadsheet formulas.

Anytime you write in between `{}`s in Pax, you are writing PAXEL.  You can create a PAXEL Expression anywhere you can declare a settings value, in `template` definitions or in `@settings` blocks.

For example the expression `self.activeColor.adjustBrightness(50%)` might live in a template:

```
<Rectangle fill={ self.activeColor.adjustBrightness(50%) } />
```
or in a settings block:
```
@settings {
  #my_rectangle {
    fill: { self.activeColor.adjustBrightness(50%) }
  }
}
```

Pax expressions are ultimately compiled to machine code (WASM or LLVM), managing each expression as its own compiled function in a vtable.

Because Pax Expressions are pure, side-effect free functions, the Pax runtime can make aggressive optimizations: caching values
and only recomputing when one of the stated inputs changes.  Expressions are also readily parallelizable, a prospective future performance optimization.

PAXEL is very similar to at least two existing languages: Microsoft's Excel spreadsheet formula language, and Google's Common Expression Language (CEL). PAXEL shares the following characteristics with CEL[1]:

> **memory-safe**: programs cannot access unrelated memory, such as out-of-bounds array indexes or use-after-free pointer dereferences;
> 
> **side-effect-free**: a PAXEL program only computes an output from its inputs;
> 
> **terminating**: PAXEL programs cannot loop forever;
> 
> **strongly-typed**: values have a well-defined type, and operators and functions check that their arguments have the expected types;
> 
> **gradually-typed**: a type-checking phase occurs before runtime via `rustc`, which detects and rejects some programs that would violate type constraints.

PAXEL has a tighter, more specialized scope than CEL and carries a much smaller runtime footprint.


[1] Text modified from source: https://github.com/google/cel-spec/blob/master/doc/langdef.md
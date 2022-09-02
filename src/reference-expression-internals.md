# PAXEL


PAXEL is Pax's expression language.

It's very similar in spirit to 



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
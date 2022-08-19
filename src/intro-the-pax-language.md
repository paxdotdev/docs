# The Pax Language

Pax is a computer language for portable 2D graphics and GUIs.

Pax includes a grammar, a parser, a compiler, a runtime, native bindings for various target platforms, and a standard library of component building blocks (`pax-std`).

Even though Pax includes many of elements of a "programming language," Pax is not a general purpose programming language.  There are no notions of sequencing, assignment, or side-effects in Pax.  Specifically: Pax describes the **content** and **behavior** of a graphical scene or GUI.

By attaching to a [host codebase](/reference-host-codebase), Pax can be augmented with imperative, Turing-complete, and side-effectful code to describe full applications.  Finally, the Pax compiler bundles the combination of 

This book will give a brief introduction to Pax — its goals, how to use it, and details of is design and implementation.







An emergent property of the above is that Pax "code" is just data.  For example, Pax could be losslessly and deterministically serialized to relational database, edited in that database, then serialized back to meaningful Pax.  The purpose of this design is that **Pax is intended to be designed**.  Pax is intended to be a suitable language for encoding design data, like the contents of a Figma file or an Illustrator file.  Additionally, Pax is intended to be a suitable language for encoding GUI or interactive graphical scene definitions — like an old Flash file, a Visual Basic screen, or a modern Web GUI.


By attaching to a host codebase — currently, Rust — Pax expressions can refer to that codebases's exposed state (any Pax `Property<T>`), like referring to a cell `A1` in a spreadsheet.  Pax can also bind events, like `@click` or `@tap`, to trigger methods of the host codebase.  Finally, in those host codebase methods, Pax `Property<T>`s may be imperatively updated, thus triggering an update of the render tree.




# The Pax Language

Pax is a computer language for portable 2D graphics and GUIs.

Pax includes a grammar, a parser, a compiler, a runtime, native bindings for various target platforms, and a standard library of component building blocks (`pax-std`).

Even though Pax includes many of elements of a "programming language," Pax is not a general purpose programming language.  There are no notions of sequencing, assignment, or side-effects in Pax.  Specifically: Pax describes the **content** and **behavior** of a graphical scene or GUI.

By attaching to a host codebase — currently, Rust — Pax expressions can refer to that codebases's properties in expressions, like referring to a cell `A1` in a spreadsheet.
 
When attached to a host codebase, Pax allows declarative authoring of interactive graphics & GUIs, which can refer to the host codebase's `state`, and trigger the host codebase's methods through `event bindings`.


Together, these grammars allow an author to describe any scene or layout, and the behavior of that scene as a function of some tuple of state.

For example:





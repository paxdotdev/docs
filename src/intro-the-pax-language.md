# The Pax Language

Pax is a computer language for portable 2D graphics and GUIs.

[The Pax project](https://www.github.com/pax-lang/pax-lang) includes a grammar, a parser, a compiler, a runtime, native bindings for various target platforms, and a standard library of component building blocks (`pax-std`).

Even though Pax includes many of elements of a programming language, Pax is _not_ a general purpose programming language.  There are no notions of sequencing, assignment, or side-effects in Pax.  Specifically: Pax describes the **content** and **behavior** of a graphical scene or GUI.

By attaching to a [host codebase](/reference-host-codebase), Pax can be augmented with imperative, Turing-complete, and side-effectful code to describe full applications.  This connection is similar in spirit to the connection between HTML/CSS and JavaScript on the World Wide Web.

This book will give a brief introduction to Pax — its goals, how to use it, and details of is design and implementation.

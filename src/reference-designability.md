# Designability







### Scrap

...An emergent property of the above is that Pax "code" is just data.  For example, Pax could be losslessly and deterministically serialized to relational database, edited in that database, then serialized back to meaningful Pax.  The purpose of this design is that **Pax is intended to be designed**.  Pax is intended to be a suitable language for encoding design data, like the contents of a Figma file or an Illustrator file.  Additionally, Pax is intended to be a suitable language for encoding GUI or interactive graphical scene definitions — like an old Flash file, a Visual Basic screen, or a modern Web GUI.

By attaching to a host codebase — currently, Rust — Pax expressions can refer to that codebases's exposed state (any Pax `Property<T>`), like referring to a cell `A1` in a spreadsheet.  Pax can also bind events, like `@click` or `@tap`, to trigger methods of the host codebase.  Finally, in those host codebase methods, Pax `Property<T>`s may be imperatively updated, thus triggering an update of the render tree.

# Designability

Pax is designed with a very specific goal in mind.  In fact, Pax wouldn't exist if there were existing compelling solutions that already achieved this goal.

That goal is _designability._  What does that mean?

Simply put, Pax code should be readable and writable by a machine _as well as_ readable and writable by a human.  Instead of one-way "codegen" paradigms, Pax is designed to go two ways: from code to design, and from design back to code.

### How does this work?

#### Pax is just data 

Pax's _templates_, _settings_, and even _expressions_ are just data.  In fact, _expressions_ are the crux of enabling this designability. 

Recall that an expression can be written anywhere you set a property.  Such expressions are constrained to be "Excel-formula-like" — in more precise words, each expression is a pure function of some tuple of state.

This means no side effects, no sequencing of operations — essentially, none of the hairy stuff that might break a computer's expectation of reading & writing back to, for example: React JSX templates, SwiftUI views, or Flutter widgets.

Pax's entire format, including Expressions, can be losslessly and deterministically loaded _into_ and _back out of_ a relational data store like a RDBMS: the same kind of data store used by any modern vector design tool.

#### Pax renders in design tool coordinates

[This chapter goes into more detail](./layout.md), but in short: Pax elements are positioned like you would expect them to be positioned in a vector design tool.  The most notable addition is Pax's notion of `align`, which allows you to create responsive positioning and layouts, still in a design-friendly way. (c.f. autolayout in Figma.)


#### Pax can encode any design file, and any UI

<!-- As a thought exercise, imagine what a novel language would look like if designed to encapsulate the union of `design file data` and `GUI declaration data`, with a constraint of ergonomic authoring. -->

Pax is intended to be a suitable language for encoding design data, like the contents of a Figma file or an Illustrator file.  Additionally, Pax is intended to be a suitable language for encoding GUI or interactive graphical scene definitions — like an old Flash source file, a Visual Basic screen, or a modern Web GUI.



### FAQ

#### Shouldn't design live in a separate world vs. code?

Many people believe this way.  Many others do not.  In the end, Pax will support either paradigm:  you can choose to create _pictures or prototypes_ with Pax-enabled design tools, or you can build & ship _production apps_ by collaborating through version control.  It all depends on your team, your tech stack, and your workflow.


#### Isn't code-gen bad? Or limited?

Yes.  Consider the traditional code-generating design tool: most prior art in this space has found workflow limitions due to the "ejecting" nature of codegen.  

When you generate code from a traditional design tool, you embark on a **one-way bridge** — the moment that code is edited by hand, e.g. by a developer who's responsible for shipping it at the end of the day — that code irrevocably breaks away from the design tool, disallowing further collaboration.

Pax enables a **two-way bridge** through language-level constraints — there's no way to "break away" because Pax will always be re-parsable by a Pax-enabled design tool, even after it's edited by hand.

One piece of mainstream prior art that achieved this "two-way" bridge was Macromedia Dreamweaver (now Adobe Dreamweaver.)  Dreamweaver's primary challenge to visual designers was that it inherited the Web's document layout model, instead of "design tool coordinates" — so simple tasks like _drawing a box_ or _vertically centering an element_ were arcane and very "un-design-tool-like."   Pax addresses exactly this concern with its _design tool coordinates_ for rendering.

#### Pax programs include Rust.  How is that designable?

In short: separation of concerns.  Recall that Pax describes the content and behavior of a UI.  Incidentally, that's exactly what a design tool does.

When Pax is designed by a Pax-enabled design tool, the attached Rust logic can be either _evaluated_ or _ignored_ while designing, depending on the context.  Separately, you can pop open a code editor and edit that Rust code.  

Rust code (and future other supported languages, like JavaScript) are not intended to be designed with Pax; they're intended to be coded.  If you ever authored a program in Flash, you will find this model familiar.  

Pax's major departure from Flash's design+code model is Pax's addition of `expressions`, which are intended to be authored by coding them into a design tool — anywhere you might enter a literal value into a text box in a design tool, e.g. to write a hex color by hand, or set the width of a vector rectangle, you can alternatively write an expression. Think: spreadsheet formula.



<!-- Scrap, ported from old README




## Appendix C: Declarative and designable

At first glance, Pax templates look quite a bit like familiar templating languages like React/JSX.

On closer inspection, you may notice an important distinction: _Pax's templates are not evaluated within a closure_ — they are declared statically and evaluated entirely at compile time.  
Symbols in expressions that refer to a component's properties, like `color=self.active_bg_color`, are handled via special runtime lookups
in the expression vtable — again, specifically _not_ a direct reference to some `self` in the scope of some closure.

Because the template is evaluated entirely at compile-time, the template is exactly what it is described to
be in the code — or in other words, it is both _code_ and _data_, in the same sense as Lisp.  Expressions themselves, given their functional constraints,
are roughly equivalent to formulas in spreadsheets: declarative, easy to isolate, easy to hack.

The reason _all of that_ matters is because Pax was **designed to be designed** — in the sense of "design tools" that can read and write Pax code as a comprehensive
description of any visual content, design, prototype, document, production GUI, or scene.




-->
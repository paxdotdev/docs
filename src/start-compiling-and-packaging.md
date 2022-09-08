# Compiling & Packaging

<br />

---

# STATUS: DRAFT
**The instructions on this page are not expected to work until Pax reaches alpha.  See the [latest status](./status-sept-2022.md).**

---

<br />
<br />

Once you have writften a Pax program, you may want to package it for distribution to users beyond yourself.

The [Pax compiler](https://www.github.com/pax-lang/pax/blob/master/src/pax-compiler/) is responsible for the heavy lifting, both for developing Pax projects (`pax run`) and compiling for distribution (`pax build`)

**To build a Pax project** for a given platform, use:

```bash
pax build --target=macos --out=my_app.app
```

where `macos` could be any of the supported platforms:

 - macos
 - web
 - NOT YET SUPPORTED: android
 - NOT YET SUPPORTED: ios
 - NOT YET SUPPORTED: windows
 - NOT YET SUPPORTED: linux


For further reading about the internals of the compiler, see: [Pax's compilation model](/reference-compilation-model.md)
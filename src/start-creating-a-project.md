# Creating a Project

**Alpha Preview**:  you can run the Jabberwocky demo project locally, but you cannot yet create new Pax projects from scratch.  

To run the demo:

1. Install Rust (>= 1.61.0) and Cargo

2. Optional — to compile to macOS and iOS:
   - Be on a Mac
   - Install Xcode >= 13.3.0 and Xcode CLI Tools

3. Optional — to compile to Web:
   - Install node (recommended 14.19.x via [nvm](https://github.com/nvm-sh/nvm)) and yarn (recommended >=1.22.x)

4. Clone the [`pax` repo](https://www.github.com/pax-lang/pax-lang/) and run `./run.sh` for the macOS demo and `./run-web.sh` for the Web demo.

<br />

---

# STATUS: DRAFT
**The following instructions are not expected to work until Pax reaches alpha.  See the [latest status](./status-sept-2022.md).**

---
<br />

## First-time Installation

1. Install Rust (>= 1.61.0) and Cargo

2. Install the Pax CLI
   ```bash
   cargo install pax-cli
   ```

3. Optional — to compile to macOS and iOS:
   - Be on a Mac
   - Install Xcode >= 13.3.0 and Xcode CLI Tools

4. Optional — to compile to Web:
   - Install node (recommended 14.19.x via [nvm](https://github.com/nvm-sh/nvm)) and yarn (recommended >=1.22.x)


## Create a Project

When starting a new Pax project, you have two choices: either use `pax` via CLI to generate a new Rust + Pax project, or manually add dependencies to an existing Rust project.

#### A. Generate a new Pax project with the Pax CLI

Using the CLI-generated project is the easiest way to start a Pax project

```bash
pax create new_pax_project
cd new_pax_project && pax run
```

#### B. Add Pax to an existing Rust codebase

This approach is more complex than using the generator, but it will sometimes be necessary to add Pax manually to an existing codebase.

Note that Pax must be authored in a `lib` crate, rather than a `bin` crate. 

Modify your `Cargo.toml` to include the following four dependencies, with the specified attributes:

```toml
[dependencies]
pax = {package="pax-lang", features=["parser"]}
pax-std = {features=["parser"]}
pax-compiler = {optional = true}
serde_json = {version = "1", optional = true}
```

Also add the following feature:

```toml
[features]
parser = ["pax-std/parser", "dep:pax-compiler", "dep:serde_json"]
```

And the following target, which enables running the parser:

```toml
[[bin]]
name = "parser"
path = "src/lib.rs"
required-features = ["parser"]
```

With the preceding additions to your Cargo.toml in place, you can now expose a `#[pax_root()]` component in your codebase at `src/lib.rs` and then use the pax compiler: `pax run` or `pax build`.

<!-- TODO: the above modifications to Cargo.toml _should_ be automatable with something like `pax attach` -->
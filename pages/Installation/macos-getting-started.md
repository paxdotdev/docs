# macOS workstation

## 1. Install toolchains

- Get rust (if already installed, ensure rustc version 1.73.0 or higher):

  `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`

- Install xcode build tools:

  `xcode-select --install`

- Web build requires wasm-pack: 

  `cargo install wasm-pack`

## 2. Install pax-cli

  `cargo install pax-cli`

  NOTE: `cargo install pax-cli` and first run of `pax-cli run` might take some time.  Subsequent builds are faster.

## 3. Run

You can either **run the examples in the Pax repo** (recommended while the project is in [Alpha](https://github.com/paxengine/pax?tab=readme-ov-file#status), or you can **create a project from scratch.**

### Running examples in the Pax repo (recommended)
[Follow the instructions in the GitHub README](https://github.com/paxengine/pax?tab=readme-ov-file#examples)

### Creating a project from scratch

- Create a new project:

  `pax-cli new my-first-project`

- Run: 

  `cd my-first-project && pax-cli run --target=web`
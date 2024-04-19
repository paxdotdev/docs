# macOS workstation

 - Get rust: `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh` (if already installed, ensure rustc version 1.73.0 or higher)
 - If not already installed, install xcode build tools: `xcode-select --install`
 - Install the Pax CLI: `cargo install pax-cli`
 - For the web build, wasm-pack is needed: `cargo install wasm-pack`
 - Create a new project `pax-cli new my-first-project`
 - And run: `cd my-first-project && pax-cli run --target=web`

NOTE: `cargo install pax-cli` and first run of `pax-cli run` take some time.

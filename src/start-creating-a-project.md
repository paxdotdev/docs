# Getting Started
## Installation

### Setup, macOS workstation

 - Install `rustc` 1.70.0 via `rustup`
 - Install the Pax CLI: `cargo install pax-cli`
 - Follow instructions to build for [WebAssembly](#to-build-pax-projects-for-webassembly) or [macOS](#to-build-pax-projects-as-native-macos-apps) below
 - Create a new project `pax-cli new my-first-project`

### Setup, Linux (Debian / Ubuntu) workstation

 - Install `rustc` 1.70.0 via `rustup`
 - Install development dependencies: `apt install pkg-config libssl-dev`
 - Install the Pax CLI: `cargo install pax-cli`
 - Follow instructions to build for [WebAssembly](#to-build-pax-projects-for-webassembly) below
 - Create a new project `pax-cli new my-first-project`

### Setup, Windows workstation

 - Install `rustc` via installer
 - Install the Pax CLI: `cargo install pax-cli`
 - Follow instructions to build for [WebAssembly](#to-build-pax-projects-for-webassembly) below
 - Create a new project `pax-cli new my-first-project`

### To build Pax projects for WebAssembly

- Install 'wasm-pack' via:
   ```shell
    curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh 
   ```
  For Windows, follow instructions to use installer [here.](https://rustwasm.github.io/wasm-pack/installer/)

- Install `node` v20 LTS, recommended via [`nvm`](https://github.com/nvm-sh/nvm#installing-and-updating)
  ```shell
  # For macOS / Linux:  first install nvm
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
  # After restarting terminal:
  nvm install 20
  nvm use 20 --default
  ```
  For Windows, install [`nvm-windows`](https://github.com/coreybutler/nvm-windows) and install Node v20 LTS.

### To build Pax projects as native macOS apps

- Building macOS apps requires running a Mac with macOS.  This is a constraint enforced technically and legally by Apple.
- Install xcode `>=15.0` and Xcode command line utils: `xcode-select --install`
- Make sure to accept Xcode's license agreement (prompted during Xcode startup for the first time)
- SDK Version `macosx13.3`, Xcode version `>=15.0`
- Current Minimum Deployment `13.0`
- Install all necessary build architectures for Rust, so that binaries can be built for both Intel and Apple Silicon macs
  ```
  rustup target add aarch64-apple-darwin x86_64-apple-darwin
  ```

### To build Pax projects as native iOS apps

- Follow instructions for building native macOS apps, above
- Install all necessary build architectures for Rust, so that binaries can be built for iOS and simulator targets:
  ```
  rustup target add aarch64-apple-ios x86_64-apple-ios aarch64-apple-ios-sim
  ```
- Install [ios simulator through Xcode](https://developer.apple.com/documentation/safari-developer-tools/adding-additional-simulators)

## Creating & Running a Pax Project

- Install  `pax-cli`
   ```
   cargo install pax-cli
   ```
- To create the project run:
   ```
   pax-cli create hello-world
   ```
- To run the project:
   ```
   pax-cli run --target=web
   ```
   - Note: pax-cli run currently accepts 3 targets: web , macos, ios

## Writing Pax

Currently Pax's best supported editor is [Visual Studio Code](https://code.visualstudio.com/). We offer language authoring features (like syntax highlighting and auto-complete) through our [extension](https://marketplace.visualstudio.com/items?itemName=Pax.pax-vscode-extension) (available in the marketplace). We highly recommend installing both the [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer) and [Pax extension](https://marketplace.visualstudio.com/items?itemName=Pax.pax-vscode-extension)

[Let's continue and explain how Pax works](./start-key-concepts-components.md).
# POS Management System (React TS + RTK + Tailwind CSS)

## Description

A POS Management System made with React and Tailwind CSS + Tauri

## Prerequisites

The first step is to install Rust and system dependencies. Keep in mind that this setup is only needed for developing Tauri apps. Your end-users are not required to do any of this.

### For Windows

#### Windows Build Tools
You will need to install Microsoft Visual Studio C++ build tools. The easiest way is to install Build Tools for Visual Studio 2022. When asked which workloads to install, ensure "C++ build tools".

```powershell
#Install Rust for Windows
winget install --id Rustlang.Rustup
```

### For MacOS

#### X Code Build Tools
You will need to download and install Mac os Developement Tools

```bash
#CLang and macOS Development Dependencies
xcode-select --install
```

```bash
#Installing Rust from curl
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
```

```bash
#Installing Rust from Homebrew
brew install rust
```

## Installation

```bash
$ pnpm install
```

## Running and Building the Vite App

```bash
# development
$ pnpm dev

# build production
$ pnpm build

# preview build
$ pnpm preview
```

## Running and Building the Tauri App

```bash
# development
$ pnpm tauri dev

# build production
$ pnpm tauri build
```

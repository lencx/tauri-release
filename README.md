# tauri-release

> 🔗 tauri release toolchain

## [@tauri-release/cli](./packages/cli/README.md)

[![npm](https://img.shields.io/npm/v/@tauri-release/cli.svg)](https://www.npmjs.com/package/@tauri-release/cli)
[![npm downloads](https://img.shields.io/npm/dm/@tauri-release/cli.svg)](https://npmjs.org/package/@tauri-release/cli)
[![node version](https://img.shields.io/badge/Node.js-^14.16.0-343434?style=flat&labelColor=026e00)](https://nodejs.org/en/)

*Note: `@tauri-release/cli` needs to be used with [Tauri GitHub Action](https://github.com/tauri-apps/tauri-action).*

### Why you need `Tauri GitHub Action`?

The `@tauri-release/cli updater` subcommand need to read the zip information from the [github releases](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases), and use it as a data source for the [updater json](https://tauri.app/v1/guides/distribution/updater/#update-file-json-format) to automate the application updates.

### Features

- new
- release
- updater

### Install

```bash
# Npm
npm i -D @tauri-release/cli

# Yarn
yarn add -D @tauri-release/cli

# Pnpm
pnpm i -D @tauri-release/cli
```

### Usage

```bash
# long command
tauir-release

# short command
tr

# help
tr -h

# tr new log
# tr new action --actionfile=".github/workflows/tauri-release.yml"

# tr release --major
# tr release --major --git
# tr release --git --logfile="src/update_log.md"

# tr updater --owner=GITHUB_OWNER --repo=GITHUB_REPO --token=GITHUB_TOKEN --logfile="src/update_log.md"

# tr override --name="hello-tauri" --version="../package.json" --tauriconf="src/path/tauri.conf.json"
```

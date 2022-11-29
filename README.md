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

*Note: `@tauri-release/cli` needs to be used with [Tauri GitHub Action](https://github.com/tauri-apps/tauri-action).*

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
```

### subCommand

#### release

#### [[semver]](https://semver.org/)

Automatic version upgrade, the default value is `--patch`:

- `major`
- `minor`
- `patch`

```bash
# 0.x.x -> 1.x.x
tr release --major

# x.0.x -> x.1.x
tr release --minor

# x.x.0 -> x.x.1
tr release
```

##### --git

Enable the git command to automatically submit after the version is updated, create a tag and push it to the remote repository (`git add -> git commit -> git tag -> git push`)

```bash
# default is not enabled
tr release -major

# enable
tr release --major --git
```

##### --logfile

Customize the `update-log` file path, the default name is `UPDATE_LOG.md`.

```bash
tr release --git

# custom file
tr release --git --logfile="src/update_log.md"
```

#### new

##### log

Generate tauri update-log file, the default name is `UPDATE_LOG.md`.

```bash
tr new log

# custom file
tr new --logfile="src/update_log.md"
```

##### action

Generate github action file, the default name is `.github/workflows/release.yml`.

```bash
tr new action

# custom file
tr new action --actionfile=".github/workflows/tauri-release.yml"
```

#### updater

Generate tauri update file, the default name is `updater/install.json`. [[Tauri doc] Update File JSON Format](https://tauri.app/v1/guides/distribution/updater/#update-file-json-format).

```bash
tr updater --owner=GITHUB_OWNER --repo=GITHUB_REPO --token=GITHUB_TOKEN

# custom file
# The notes field value in the json file needs to be obtained from the update_log file
tr updater --owner=GITHUB_OWNER --repo=GITHUB_REPO --token=GITHUB_TOKEN --logfile="src/update_log.md"
```

#### override

Override [productName or version](https://tauri.app/v1/api/config/#packageconfig) (`tauri.conf.json > package`):

##### --name

```bash
# package.productName
tr override --name=TauriApp
```

##### --version

```bash
# package.version
tr override --version="../package.json"
```

##### --tauriconf

Customize the `tauri.conf.json` path, the default is `src-tauri/tauri.conf.json`

```bash
tr override --name="hello-tauri" --version="../package.json" --tauriconf="src/path/tauri.conf.json"
```

# @tauri-release/cli

## Install

```bash
# Npm
npm i -D @tauri-release/cli

# Yarn
yarn add -D @tauri-release/cli

# Pnpm
pnpm i -D @tauri-release/cli
```

## Usage

```bash
# long command
tauir-release

# short command
tr

# help
tr -h
```

## subCommand

### release

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

#### --git

Enable the git command to automatically submit after the version is updated, create a tag and push it to the remote repository (`git add -> git commit -> git tag -> git push`)

```bash
# default is not enabled
tr release -major

# enable
tr release --major --git
```

#### --logfile

Customize the `update-log` file path, the default name is `UPDATE_LOG.md`.

```bash
tr release --git

tr release --git --logfile="src/update_log.md"
```

### updater

Generate tauri update file. [[Tauri doc] Update File JSON Format](https://tauri.app/v1/guides/distribution/updater/#update-file-json-format)

```bash
tr updater

# The notes field value in the json file needs to be obtained from the update_log file
tr updater --logfile="src/update_log.md"
```

### override

Override [productName or version](https://tauri.app/v1/api/config/#packageconfig) (`tauri.conf.json > package`):

#### --name

```bash
# package.productName
tr override --name=TauriApp
```

#### --version

```bash
# package.version
tr override --version="../package.json"
```

#### --tauriconf

Customize the `tauri.conf.json` path, the default is `src-tauri/tauri.conf.json`

```bash
tr override --name="hello-tauri" --version="../package.json" --tauriconf="src/path/tauri.conf.json"
```

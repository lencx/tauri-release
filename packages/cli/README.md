# @tauri-release/cli

*Note: `@tauri-release/cli` needs to be used with [Tauri GitHub Action](https://github.com/tauri-apps/tauri-action).*

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

# custom file
tr release --git --logfile="src/update_log.md"
```

### new

#### log

Generate tauri update-log file, the default name is `UPDATE_LOG.md`.

```bash
tr new log

# custom file
tr new --logfile="src/update_log.md"
```

#### action

Generate github action file, the default name is `.github/workflows/release.yml`.

```bash
tr new action

# custom file
tr new action --actionfile=".github/workflows/tauri-release.yml"
```

### updater

Generate tauri update file, the default name is `updater/install.json`. [[Tauri doc] Update File JSON Format](https://tauri.app/v1/guides/distribution/updater/#update-file-json-format).

```bash
tr updater --owner=GITHUB_OWNER --repo=GITHUB_REPO --token=GITHUB_TOKEN

# custom file
# The notes field value in the json file needs to be obtained from the update_log file
tr updater --owner=GITHUB_OWNER --repo=GITHUB_REPO --token=GITHUB_TOKEN --logfile="src/update_log.md"
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

### Examples

[lencx/WA/package.json](https://github.com/lencx/WA/blob/main/package.json)

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "tauri": "tauri",
    "tr": "tr",
    "updater": "tr updater",
    "release": "tr release --git",
    "fix:linux": "tr override --name=WA"
  },
}
```

[lencx/WA/.github/workflows/release.yml](https://github.com/lencx/WA/blob/main/.github/workflows/release.yml)

```yml
# ...
      - name: fix linux build
        if: matrix.platform == 'ubuntu-latest'
        run: |
          yarn fix:linux

# ...
  updater:
    runs-on: ubuntu-latest
    needs: [create-release, build-tauri]

    steps:
      - uses: actions/checkout@v2
      - run: yarn
      - run: yarn updater --token=${{ secrets.GITHUB_TOKEN }}

      - name: Deploy install.json
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./updater
          force_orphan: true
```

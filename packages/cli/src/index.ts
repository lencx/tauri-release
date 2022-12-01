import c from 'kleur';
import path from 'path';
import { fileURLToPath } from 'url';

import release from './release';
import updater from './updater';
import override from './override';
import create from './create';
import { $argv, require } from './utils';

// https://github.com/nodejs/help/issues/2907#issuecomment-757446568
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

function init() {
  const argv = $argv();
  const subcmd = argv._[0];

  if (argv.h || argv.help) {
    cliHelp();
    return;
  }

  try {
    switch (subcmd) {
      case 'release':
        // semver: major | minor | patch, default: patch
        // usage: tr release [--semver] [--git]
        release(); break;
      case 'updater':
        // usage: tr updater
        updater(); break;
      case 'override':
        // usage: tr override [--jsonfile="src-tauri/tauri.conf.json"] --name="tauri-app" --version="../package.json"
        override(); break;
        // usage: tr new [log|action]
      case 'new':
        create(); break;
      default:
        cliHelp();
    }
  } catch (e) {
    console.error(e);
  }
}

init();

function cliHelp() {
  const pkgJson = require(path.join(__dirname, '..', 'package.json'));
  console.log(`${c.green('tauir-release (tr)')}:
${c.gray('https://github.com/lencx/tauri-release')}
${c.gray(`v${pkgJson.version}`)} tauri release toolchain

usage: tr [subcommand] [options]

options:
  ${c.green('new')}                      generate file, support custom path
   ${c.gray('log [--logfile]         UPDATE_LOG.md (default)')}
   ${c.gray('action [--actionfile]   .github/workflows/release.yml (default)')}
  ${c.green('release')}                  tauri release
  ${c.green('updater')}                  generate tauri update file
  ${c.green('-h, --help')}               print node command line options
`);
}

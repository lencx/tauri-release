import c from 'kleur';

import release from './release';
import updater from './updater';
import override from './override';
import { $argv, pkgJson } from './utils';

function init() {
  const argv = $argv();
  const subcmd = argv._[0];

  if (argv.h || argv.help) {
    cliHelp();
    return;
  }

  // const
  try {
    switch (subcmd) {
      case "release":
        // semver: major | minor | patch, default: patch
        // usage: tr release --semver
        release(); break;
      case "updater":
        // usage: tr updater --git
        updater(); break;
      case "override":
        // usage: tr override --name="tauri-app" --version="../package.json"
        override(); break;
      default:
        cliHelp();
    }
  } catch (e) {
    console.error(e);
  }
}

init();

function cliHelp() {
  console.log(`${c.green('tauir-release (tr)')}:
${c.gray(`v${pkgJson().version}`)} tauri release toolchain

usage: tr [subcommand] [options]

options:
  ${c.green('release')}         tauri release
  ${c.green('updater')}         generate tauri update file
  ${c.green('-h, --help')}      print node command line options
`);
}

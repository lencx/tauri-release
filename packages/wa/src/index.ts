import path from 'path';
import c from 'kleur';

import waInit from './init';
import { $argv } from './utils';

function init() {
  const argv = $argv();
  const subcmd = argv._[0];

  if (argv.h || argv.help) {
    cliHelp();
    return;
  }

  try {
    switch (subcmd) {
      case 'init':
        waInit(); break;
      default: break;
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
  ${c.green('init')}                     generate tauri app
  ${c.green('-h, --help')}               print node command line options
`);
}

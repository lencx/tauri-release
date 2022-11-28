import { $argv, pkgJson } from './utils';
import release from './release';
import updater from './updater';
import rename from './rename';

function init() {
  const subcmd = $argv()._[0];
  try {
    switch (subcmd) {
      case "release":
        release(); break;
      case "updater":
        updater(); break;
      case "rename":
        rename(); break;
      default:
        cliHelp();
    }
  } catch (e) {
    console.error(e);
  }
}

init();

function cliHelp() {
  console.log(`tauir-release (tr) v${pkgJson().version}:
  tauri release toolchain

usage: tr [subcommand] [options]

options:
  release         tauri release
  updater         generate tauri update file
  -h, --help      print node command line options
`);
}

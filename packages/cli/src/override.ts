import fs from 'fs';
import path from 'path';
import c from 'kleur';

import { $argv, relativePath, ROOT_PATH, TAURI_CONF_PATH } from './utils';

export default async function override() {
  const argv = $argv();
  let confPath = TAURI_CONF_PATH;

  if (argv.tauriconf) {
    confPath = path.join(ROOT_PATH, argv?.tauriconf);
    if (!fs.existsSync(confPath)) {
      console.log(c.red('[💢 override]'), c.yellow(argv.tauriconf), `file does not exist.`);
      process.exit(0);
    }
  }

  const confJson = JSON.parse(fs.readFileSync(confPath, 'utf8'));
  const name = argv.name;
  const version = argv.version;
  if (name) {
    confJson.package.productName = name;
  }
  if (version) {
    confJson.package.version = version;
  }

  fs.writeFileSync(confPath, JSON.stringify(confJson, null, 2));
  console.log(c.green('[✨ override]'), c.yellow(relativePath(confPath)));
}

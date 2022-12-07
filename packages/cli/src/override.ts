import fs from 'fs';
import path from 'path';
import c from 'kleur';
import _ from 'lodash';

import { $argv, relativePath, ROOT_PATH, TAURI_CONF_PATH } from './utils';

export default async function override() {
  const argv = $argv();
  let filePath = TAURI_CONF_PATH;

  if (argv.jsonfile) {
    filePath = path.join(ROOT_PATH, argv?.jsonfile);
    if (!fs.existsSync(filePath)) {
      console.log(c.red('[💢 override]'), c.yellow(argv.jsonfile), `file does not exist.`);
      process.exit(0);
    }
  }

  const confJson = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const name = argv.name;
  const version = argv.version;

  if (name) {
    confJson.package.productName = name;
  }
  if (version) {
    confJson.package.version = `${version}`;
  }

  // --json.package_productName -> package.productName
  // --json.tauri_allowlist_all -> tauri.allowlist.all
  if (argv.json) {
    Object.entries(argv.json).forEach(([key, val]: any) => {
      const key2 = key.replace(/_/g, '.')
      let val2 = val;

      switch (true) {
        case val === 'true':
          val2 = true; break;
        case val === 'false':
          val2 = false; break;
        case val === 'null':
          val2 = null; break;
        case val === 'null':
          val2 = null; break;
        case /\d+\.?\d+$/.test(val):
          if (key2 !== 'package.version') {
            val2 = +val;
          } else {
            val2 = `${val}`
          }
        default: break;
      }

      _.set(confJson, key2, val2);
    })
  }

  fs.writeFileSync(filePath, JSON.stringify(confJson, null, 2));
  console.log(c.green('[✨ override]'), c.yellow(relativePath(filePath)));
}

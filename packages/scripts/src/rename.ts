import fs from 'fs';

import { require, TAURI_CONF_PATH } from './utils';

async function rename(name: string) {
  const confJson = require('../src-tauri/tauri.conf.json');
  confJson.package.productName = name;

  fs.writeFileSync('./src-tauri/tauri.conf.json', JSON.stringify(confJson, null, 2));
  console.log(`Rewrite WA+ Name: WA+ --> WA`);
}

// build().catch(console.error);
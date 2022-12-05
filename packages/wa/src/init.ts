import dgh from 'dgh';

import { $argv } from './utils';

export default async function init() {
  const argv = $argv();
  const name = argv._[1] || 'wa-app';

  dgh({
    owner: 'lencx',
    repo: 'tauri-release',
    ref: 'main',
    subdir: 'templates/wa',
    name,
  }).on('end', () => {
    // TODO:
  });
}

// 1. download wa template
// 2. set tauri icon
// 3. tauri build
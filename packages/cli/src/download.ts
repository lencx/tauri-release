import path from 'path';
import fs from 'fs';
import c from 'kleur';

import { $argv, ROOT_PATH } from './utils';

export default function download() {
  const argv = $argv();
  if (!argv.mdfile) {
    console.log(c.red('[💢 download]'), `Could not found file`);
    return;
  }
  const fileList = argv.mdfile.split(',');
  if (fileList.length > 0) {
    fileList.forEach(write);
  }
}

function write(filePath: string, idx: number) {
  const startRe = `<!-- tr-download-start -->`;
  const endRe = `<!-- tr-download-end -->`;
  const argv = $argv();
  let ignoreLines: any[] = [];
  if (argv[`f${idx+1}`]) {
    ignoreLines = `${argv[`f${idx+1}`]}`?.split(',')?.map((i: string) => +i);
  }

  const file = path.join(ROOT_PATH, filePath);
  if (!fs.existsSync(file)) {
    console.log(c.red('[💢 download]'), `Could not found ${c.yellow(file)}`);
    process.exit(0);
  }

  const content = fs.readFileSync(file, 'utf8').split('\n');

  let isStart = false;
  for (let i = 0; i < content.length; i++) {
    const line = content[i];
    if (new RegExp(startRe).test(line)) {
      isStart = true;
    }
    if (isStart) {
      if (!ignoreLines.includes(i+1)) {
        content[i] = content[i].replace(/(\d+).(\d+).(\d+)/g, argv.version);
      } else {
        console.log(c.green('[⤵️  download]'), 'ignore line number', c.green(i+1));
      }
    }
    if (new RegExp(endRe).test(line)) {
      break;
    }
  }

  fs.writeFileSync(file, content.join('\n'), 'utf8');

  console.log(c.green('[✅ download]'), c.yellow(argv.version), c.gray(file));
}
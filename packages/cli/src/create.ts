import fs from 'fs';
import path from 'path';
import c from 'kleur';

import { $argv, relativePath, ROOT_PATH, UPDATE_LOG_PATH, RELEASE_YML_PATH } from './utils';
import { RELEASE_YML_TXT } from './template';

export default async function create() {
  const argv = $argv();

  const type = argv._[1];

  if (type === 'log') {
    let logPath = UPDATE_LOG_PATH;
    if (argv.logfile) {
      logPath = path.join(ROOT_PATH, argv.logfile);
      if (!fs.existsSync(path.dirname(argv.logfile))) {
        fs.mkdirSync(path.dirname(argv.logfile), { recursive: true });
      } else {
        console.log(c.red('[💢 new]'), c.yellow(relativePath(logPath)), 'File already exists.');
        process.exit(0);
      }
    }
    fs.writeFileSync(logPath, `# UPDATE LOG\n
## v0.1.1\n
- feat: xx
- fix: xx\n
## v0.1.0\n
test\n`, 'utf8');
    console.log(c.green('[✨ new]'), c.yellow(relativePath(logPath)));
  }

  if (type === 'action') {
    let ymlPath = RELEASE_YML_PATH;
    if (argv.actionfile) {
      ymlPath = path.join(ROOT_PATH, argv.actionfile);
    }
    if (!fs.existsSync(path.dirname(ymlPath))) {
      fs.mkdirSync(path.dirname(ymlPath), { recursive: true });
    } else {
      console.log(c.red('[💢 new]'), c.yellow(relativePath(ymlPath)), 'File already exists.');
      process.exit(0);
    }
    fs.writeFileSync(ymlPath, RELEASE_YML_TXT, 'utf8')
    console.log(c.green('[✨ new]'), c.yellow(relativePath(ymlPath)));
  }
}

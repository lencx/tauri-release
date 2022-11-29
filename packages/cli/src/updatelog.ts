import fs from 'fs';
import path from 'path';
import c from 'kleur';

import { $argv, relativePath, UPDATE_LOG_PATH, ROOT_PATH } from './utils';
import type { UpdaterLog } from './types';

export default function updatelog(tag: string): UpdaterLog {
  const reTag = /## v[\d\.]+/;
  const argv = $argv();

  let filePath = UPDATE_LOG_PATH;

  if (argv.logfile) {
    const logPath = path.join(ROOT_PATH, argv.logfile);
    filePath = logPath;
  }

  if (!fs.existsSync(filePath) && !fs.existsSync(UPDATE_LOG_PATH)) {
    console.log(c.red('[💢 updater]'), `Could not found ${c.yellow('UPDATE_LOG.md')}`);
    process.exit(0);
  }

  let _tag: string | null;
  const tagMap: Record<string, any> = {};
  const content = fs.readFileSync(filePath, 'utf8').split('\n');

  content.forEach((line, index) => {
    if (reTag.test(line)) {
      _tag = line.slice(3).trim();
      if (!tagMap[_tag]) {
        tagMap[_tag] = [];
        return;
      }
    }
    if (_tag) {
      tagMap[_tag].push(line.trim());
    }
    if (reTag.test(content[index + 1])) {
      _tag = null;
    }
  });

  if (!tagMap?.[tag]) {
    console.log(
      c.red('[💢 updater]'),
      c.yellow(relativePath(filePath)),
      `Tag ${tag} does not exist.`,
    );
    process.exit(0);
  }

  return {
    filename: relativePath(filePath),
    content: tagMap[tag].join('\n').trim() || '',
  };
}
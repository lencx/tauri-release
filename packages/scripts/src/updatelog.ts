import fs from 'fs';

import { UPDATE_LOG_PATH } from './utils';

export default function updatelog(tag: string, type = 'updater') {
  const reTag = /## v[\d\.]+/;

  if (!fs.existsSync(UPDATE_LOG_PATH)) {
    console.log('Could not found UPDATE_LOG.md');
    process.exit(1);
  }

  let _tag: string | null;
  const tagMap: Record<string, any> = {};
  const content = fs.readFileSync(UPDATE_LOG_PATH, { encoding: 'utf8' }).split('\n');

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
      `${type === 'release' ? '[UPDATE_LOG.md] ' : ''}Tag ${tag} does not exist`
    );
    process.exit(1);
  }

  return tagMap[tag].join('\n').trim() || '';
}
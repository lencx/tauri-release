
import { execSync } from 'child_process';
import fs from 'fs';

import { $argv, packageJSON } from './utils';
import updatelog from './updatelog';

export default async function release() {
  const argv = $argv();
  const packageJson = packageJSON();
  let [a, b, c] = packageJson.version.split('.').map(Number);

  if (argv.major) {
    a += 1;
    b = 0;
    c = 0;
  } else if (argv.minor) {
    b += 1;
    c = 0;
  } else {
    c += 1;
  }

  const nextVersion = `${a}.${b}.${c}`;
  const oldVersion = packageJson.version;
  packageJson.version = nextVersion;

  const nextTag = `v${nextVersion}`;
  await updatelog(nextTag, 'release');

  // rewrite package.json
  fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));

  if (argv.git) {
    execSync('git add ./package.json ./UPDATE_LOG.md');
    execSync(`git commit -m "v${nextVersion}"`);
    execSync(`git tag -a v${nextVersion} -m "v${nextVersion}"`);
    execSync(`git push`);
    execSync(`git push origin v${nextVersion}`);
    console.log(`Publish Successfully...`);
  } else {
    console.log(`update package.json version: ${oldVersion} -> ${nextVersion}`);
  }
}

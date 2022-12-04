import { spawnSync } from 'child_process';

// console.log('«3» /wa/src/index.ts ~> ', dgh);

// execSync(`npm run rgd --owner=lencx --repo=tauri-release --jsontype=md`)
// const a= spawnSync(`npm -v`, { encoding : 'utf8' });
spawnSync('ls', ['-l'], {
  shell: true,
  encoding: 'utf8',
  stdio: 'inherit',
});
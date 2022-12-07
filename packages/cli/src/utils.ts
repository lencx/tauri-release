import path from 'path';
import minimist from 'minimist';
import { createRequire } from 'module';

export const require = createRequire(import.meta.url);

export const $argv = () => minimist(process.argv.slice(2));

// file
export const ROOT_PATH = process.cwd();
export const PACKAGE_PATH = path.join(ROOT_PATH, 'package.json');
export const UPDATE_LOG_PATH = path.join(ROOT_PATH, 'UPDATE_LOG.md');
export const TAURI_CONF_PATH = path.join(ROOT_PATH, 'src-tauri', 'tauri.conf.json');
export const UPDATER_JSON_PATH = path.join(ROOT_PATH, 'updater', 'install.json');
export const RELEASE_YML_PATH = path.join(ROOT_PATH, '.github', 'workflows', 'release.yml');
export const packageJSON = (): Record<string, any> => require(PACKAGE_PATH);
export const tauriConfJSON = (): Record<string, any> => require(TAURI_CONF_PATH);
export const relativePath = (p: string): string => `${p.split(ROOT_PATH)?.[1].substring(1)}` || '';
import path from 'path';
import { createRequire } from 'module';
import minimist from 'minimist';

export const require = createRequire(import.meta.url);

export const $argv = () => minimist(process.argv.slice(2));

// file
export const ROOT_PATH = process.cwd();
export const PACKAGE_PATH = path.join(ROOT_PATH, "package.json");
export const UPDATE_LOG_PATH = path.join(ROOT_PATH, "UPDATE_LOG.md");
export const TAURI_CONF_PATH = path.join(ROOT_PATH, "src-tauri", "tauri.conf.json");
// export const README_PATH = path.join(ROOT_PATH, "README.md");

export const packageJSON = (): Record<string, any> => require(PACKAGE_PATH);
export const pkgJson = () => require(path.join('..', 'package.json'));

export const relativePath = (p: string): string => p.split(ROOT_PATH)?.[1] || '';
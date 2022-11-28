import path from 'path';
import { createRequire } from 'module';

export const require = createRequire(import.meta.url);

export const ROOT_PATH = process.cwd();
export const README_PATH = path.join(ROOT_PATH, "README.md");
export const PACKAGE_PATH = path.join(ROOT_PATH, "package.json");
export const UPDATE_LOG_PATH = path.join(ROOT_PATH, "UPDATE_LOG.md");
export const TAURI_CONF_PATH = path.join(ROOT_PATH, "src-tauri", "tauri.conf.json");

export const readme = () => require(README_PATH);
export const updateLog = () => require(UPDATE_LOG_PATH);
export const packageJSON = (): Record<string, any> => require(PACKAGE_PATH);
export const tauriConfJSON = () => require(TAURI_CONF_PATH);
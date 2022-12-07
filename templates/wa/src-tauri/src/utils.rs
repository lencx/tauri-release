use anyhow::Result;
use regex::Regex;
use std::fs::{self, File};
use std::path::{Path, PathBuf};
use tauri::utils::config::Config;

pub fn get_tauri_conf() -> Option<Config> {
    let config_file = include_str!("../tauri.conf.json");
    let config: Config =
        serde_json::from_str(config_file).expect("failed to parse tauri.conf.json");
    Some(config)
}

pub fn get_wa_conf() -> WaJson {
    let config_file = include_str!("../wa.json");
    let config: serde_json::Value =
        serde_json::from_str(config_file).expect("failed to parse wa.json");
    let wajson: WaJson = serde_json::from_value(config).unwrap_or_else(|_| wa_json_default());

    wajson
}

#[derive(serde::Serialize, serde::Deserialize, Debug)]
pub struct WaJson {
    pub url: String,
    pub resizable: bool,
    pub theme: tauri::Theme,
    pub mode: String,
    pub title: String,
    pub always_on_top: bool,
    pub hidden_title: bool,
    pub hide_title_bar: bool,
}

pub fn wa_json_default() -> WaJson {
    serde_json::from_value(serde_json::json!({
        "url": "https://github.com/lencx/tauri-release",
        "resizable": true,
        "theme": "Light",
        "mode": "PC",
        "title": "WA",
        "always_on_top": false,
        "hidden_title": true,
        "hide_title_bar": true,
    }))
    .unwrap()
}

pub fn exists(path: &Path) -> bool {
    Path::new(path).exists()
}

pub fn create_file(path: &Path) -> Result<File> {
    if let Some(p) = path.parent() {
        fs::create_dir_all(p)?
    }
    File::create(path).map_err(Into::into)
}

pub fn script_path() -> PathBuf {
    let conf = get_tauri_conf().unwrap();
    let identifier = conf.tauri.bundle.identifier;

    let re = Regex::new(r"(?x)([\w\d_-]+.){2}(?P<app_name>[\.\w\d_-]+)").unwrap();
    let caps = re.captures(&identifier).unwrap();
    let app_name = caps["app_name"].to_owned();

    let root = tauri::api::path::home_dir().unwrap().join(".wa");
    let script_file = root.join(format!("{}.js", app_name));
    if !exists(&script_file) {
        create_file(&script_file).unwrap();
        fs::write(&script_file, format!("// *** WA User Script ***\n// @github: https://github.com/lencx/tauri-release \n// @path: {}\n\nconsole.log('🤩 Hello WA!!!');", &script_file.to_string_lossy())).unwrap();
    }

    script_file
}

pub fn user_script() -> String {
    let user_script_content = fs::read_to_string(script_path()).unwrap_or_else(|_| "".to_string());
    format!(
        "window.addEventListener('DOMContentLoaded', function() {{\n{}\n}})",
        user_script_content
    )
}

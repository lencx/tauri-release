use tauri::utils::config::Config;

pub fn get_tauri_conf() -> Option<Config> {
  let config_file = include_str!("../tauri.conf.json");
  let config: Config = serde_json::from_str(config_file)
      .expect("failed to parse tauri.conf.json");
  Some(config)
}

pub fn get_wa_conf() -> Option<WaJson> {
  let config_file = include_str!("../wa.json");
  let config: serde_json::Value = serde_json::from_str(config_file)
      .expect("failed to parse wa.json");

  let wajson: WaJson = serde_json::from_value(config).unwrap();
  Some(wajson)
}

#[derive(serde::Deserialize, Debug)]
pub struct WaJson {
  pub width: f64,
  pub height: f64,
  pub resizable: bool,
  pub theme: tauri::Theme,
  pub mode: String,
  pub title: String,
  pub hidden_title: bool,
  pub always_on_top: bool,
}

pub fn wa_json_default() -> WaJson {
  serde_json::from_value(serde_json::json!({
    "width": 800,
    "height": 600,
    "resizable": false,
    "theme": "Light",
    "mode": "PC",
    "title": "WA",
    "hidden_title": true,
    "always_on_top": false,
  })).unwrap()
}

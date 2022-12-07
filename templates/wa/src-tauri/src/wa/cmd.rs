use tauri::api::dialog;
use tauri::Manager;

use crate::utils;

#[tauri::command]
pub fn hello(app: tauri::AppHandle, name: String) {
    dialog::message(Some(&app.get_window("core").unwrap()), "[WA] Hello", name);
}

#[tauri::command]
pub fn drag_window(app: tauri::AppHandle) {
    app.get_window("core").unwrap().start_dragging().unwrap();
}

#[tauri::command]
pub fn fullscreen(app: tauri::AppHandle) {
    let win = app.get_window("core").unwrap();
    if win.is_fullscreen().unwrap() {
        win.set_fullscreen(false).unwrap();
    } else {
        win.set_fullscreen(true).unwrap();
    }
}

#[derive(Clone, serde::Serialize)]
pub struct WaPayload {
    watype: String,
    is_overlay: bool,
}

#[tauri::command]
pub fn get_wa_conf() -> serde_json::Value {
    serde_json::json!(utils::get_wa_conf())
}

#[tauri::command]
pub fn get_tauri_conf() -> serde_json::Value {
    serde_json::json!(utils::get_tauri_conf().unwrap())
}

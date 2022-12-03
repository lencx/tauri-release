use tauri::Manager;
use tauri::api::dialog;

#[tauri::command]
pub fn hello(app: tauri::AppHandle, name: String) {
    dialog::message(Some(&app.get_window("core").unwrap()), "Hello", name);
}

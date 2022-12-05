#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod utils;
mod wa;

use tauri::SystemTray;
use wa::{cmd, menu, setup};

fn main() {
    let content = tauri::generate_context!();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            cmd::hello,
            cmd::drag_window,
            cmd::fullscreen,
            cmd::get_conf,
        ])
        .setup(setup::init)
        .menu(menu::init(&content))
        .on_menu_event(menu::menu_handler)
        .system_tray(SystemTray::default())
        .on_system_tray_event(menu::tray_handler)
        .run(content)
        .expect("error while running WA application");
}

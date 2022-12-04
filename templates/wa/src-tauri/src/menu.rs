use tauri::{
    utils::assets::EmbeddedAssets, AboutMetadata, AppHandle, Context, CustomMenuItem, Manager,
    Menu, MenuItem, Submenu, SystemTrayEvent, WindowMenuEvent,
};

use crate::utils;

pub fn init(context: &Context<EmbeddedAssets>) -> Menu {
    let name = &context.package_info().name;
    let app_menu = Submenu::new(
        name,
        Menu::new()
            .add_native_item(MenuItem::About(name.into(), AboutMetadata::default()))
            .add_item(CustomMenuItem::new("inject_script".to_string(), "Inject Script"))
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::Hide)
            .add_native_item(MenuItem::HideOthers)
            .add_native_item(MenuItem::ShowAll)
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::Quit),
    );

    // let setting_menu = Submenu::new(
    //     "Setting",
    //     Menu::new()
    //         .add_submenu(Submenu::new(
    //             "Mode",
    //             Menu::new()
    //                 .add_item(CustomMenuItem::new("phone".to_string(), "Phone"))
    //                 .add_item(CustomMenuItem::new("pc".to_string(), "PC"))
    //         ))
    // );

    let edit_menu = Submenu::new(
        "Edit",
        Menu::new()
            .add_native_item(MenuItem::Undo)
            .add_native_item(MenuItem::Redo)
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::Cut)
            .add_native_item(MenuItem::Copy)
            .add_native_item(MenuItem::Paste)
            .add_native_item(MenuItem::SelectAll),
    );

    let view_menu = Submenu::new(
        "View",
        Menu::new()
            .add_item(
                CustomMenuItem::new("go_back".to_string(), "Go Back").accelerator("CmdOrCtrl+Left"),
            )
            .add_item(
                CustomMenuItem::new("go_forward".to_string(), "Go Forward")
                    .accelerator("CmdOrCtrl+Right"),
            )
            .add_item(
                CustomMenuItem::new("scroll_top".to_string(), "Scroll to Top of Screen")
                    .accelerator("CmdOrCtrl+Up"),
            )
            .add_item(
                CustomMenuItem::new("scroll_bottom".to_string(), "Scroll to Bottom of Screen")
                    .accelerator("CmdOrCtrl+Down"),
            )
            .add_native_item(MenuItem::Separator)
            .add_item(
                CustomMenuItem::new("reload".to_string(), "Refresh the Screen")
                    .accelerator("CmdOrCtrl+R"),
            ),
    );

    let help_menu = Submenu::new(
        "Help",
        Menu::new()
            .add_item(CustomMenuItem::new("report_bug".to_string(), "Report Bug"))
            .add_item(
                CustomMenuItem::new("dev_tools".to_string(), "Toggle Developer Tools")
                    .accelerator("CmdOrCtrl+Shift+I"),
            ),
    );

    Menu::new()
        .add_submenu(app_menu)
        // .add_submenu(setting_menu)
        .add_submenu(edit_menu)
        .add_submenu(view_menu)
        .add_submenu(help_menu)
}

pub fn menu_handler(event: WindowMenuEvent<tauri::Wry>) {
    let win = Some(event.window()).unwrap();
    let app = win.app_handle();
    match event.menu_item_id() {
        // App
        "inject_script" => {
            tauri::api::shell::open(
                &app.shell_scope(),
                utils::script_path().to_string_lossy(),
                None,
            )
            .unwrap();
        }
        // View
        "go_back" => {
            win.emit("WA_EVENT", "GO_BACK").unwrap();
        }
        "go_forward" => {
            win.emit("WA_EVENT", "GO_FORWARD").unwrap();
        }
        "scroll_top" => {
            win.emit("WA_EVENT", "SCROLL_TOP").unwrap();
        }
        "scroll_bottom" => {
            win.emit("WA_EVENT", "SCROLL_BOTTOM").unwrap();
        }
        "reload" => {
            win.emit("WA_EVENT", "RELOAD").unwrap();
        }
        "report_bug" => {
            tauri::api::shell::open(
                &app.shell_scope(),
                "https://github.com/lencx/tauri-release/issues",
                None,
            )
            .unwrap();
        }
        "dev_tools" => {
            win.open_devtools();
            win.close_devtools();
        }
        _ => (),
    }
}

// --- SystemTray Event
pub fn tray_handler(app: &AppHandle, event: SystemTrayEvent) {
    if let SystemTrayEvent::LeftClick {
        position: _,
        size: _,
        ..
    } = event
    {
        let win = app.get_window("core").unwrap();
        if win.is_visible().unwrap() {
            win.hide().unwrap();
        } else {
            win.show().unwrap();
            win.set_focus().unwrap();
        }
    }
}

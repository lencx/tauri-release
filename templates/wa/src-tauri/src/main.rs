#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::{
    utils::config::WindowUrl,
    window::WindowBuilder,
    TitleBarStyle,
    Theme,
};

mod utils;
mod cmd;

fn main() {
    tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![cmd::hello])
    .setup(|app| {
            let conf = utils::get_tauri_conf().unwrap();
            let wa_conf = utils::get_wa_conf().unwrap_or_else(utils::wa_json_default);

            let url = conf.build.dev_path.to_string();
            let mut theme = Some(Theme::Light);

            if wa_conf.theme == Theme::Dark {
                theme = Some(Theme::Dark);
            }

            if wa_conf.mode == "Phone" {
                WindowBuilder::new(app, "core", WindowUrl::App(url.into()))
                    .initialization_script(include_str!("wa.js"))
                    .title_bar_style(TitleBarStyle::Visible)
                    .resizable(true)
                    .fullscreen(false)
                    .title(wa_conf.title)
                    .hidden_title(wa_conf.hidden_title)
                    .theme(theme)
                    .inner_size(wa_conf.width, wa_conf.height)
                    .max_inner_size(wa_conf.width + 150.0, wa_conf.height + 150.0)
                    .always_on_top(wa_conf.always_on_top)
                    .user_agent("Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1")
                    .build()?;
            } else {
                WindowBuilder::new(app, "core", WindowUrl::App(url.into()))
                    .initialization_script(include_str!("wa.js"))
                    .title_bar_style(TitleBarStyle::Visible)
                    .resizable(true)
                    .fullscreen(false)
                    .hidden_title(true)
                    .theme(theme)
                    .title(wa_conf.title)
                    .hidden_title(wa_conf.hidden_title)
                    .inner_size(wa_conf.width, wa_conf.height)
                    .always_on_top(wa_conf.always_on_top)
                    .user_agent("5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36")
                    .build()?;
            }

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running WA application");
}

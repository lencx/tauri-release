use tauri::{utils::config::WindowUrl, window::WindowBuilder, App, Theme, TitleBarStyle};

use crate::utils;

pub fn init(app: &mut App) -> std::result::Result<(), Box<dyn std::error::Error>> {
    let conf = utils::get_tauri_conf().unwrap();
    let wa_conf = utils::get_wa_conf().unwrap_or_else(utils::wa_json_default);

    let url = conf.build.dev_path.to_string();
    let script = utils::user_script();

    let mut theme = Some(Theme::Light);
    let mut title_bar_style = TitleBarStyle::Overlay;

    if wa_conf.theme == Theme::Dark {
        theme = Some(Theme::Dark);
    }

    if !wa_conf.title_bar_overlay {
        title_bar_style = TitleBarStyle::Visible;
    }

    if wa_conf.mode == "Phone" {
        WindowBuilder::new(app, "core", WindowUrl::App(url.into()))
            .resizable(true)
            .fullscreen(false)
            .initialization_script(&script)
            .title_bar_style(title_bar_style)
            .title(wa_conf.title)
            .hidden_title(wa_conf.hidden_title)
            .theme(theme)
            .inner_size(360.0, 640.0)
            .max_inner_size(540.0, 800.0)
            .always_on_top(wa_conf.always_on_top)
            .user_agent("Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1")
            .build()?;
    } else {
        WindowBuilder::new(app, "core", WindowUrl::App(url.into()))
            .resizable(true)
            .fullscreen(false)
            .initialization_script(&script)
            .title_bar_style(title_bar_style)
            .hidden_title(wa_conf.hidden_title)
            .theme(theme)
            .title(wa_conf.title)
            .hidden_title(wa_conf.hidden_title)
            .inner_size(800.0, 600.0)
            .always_on_top(wa_conf.always_on_top)
            .user_agent("5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36")
            .build()?;
    }

    Ok(())
}

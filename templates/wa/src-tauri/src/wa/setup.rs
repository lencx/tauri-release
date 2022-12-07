use tauri::{utils::config::WindowUrl, window::WindowBuilder, App, Theme, TitleBarStyle};

use crate::utils;

pub fn init(app: &mut App) -> std::result::Result<(), Box<dyn std::error::Error>> {
    let wa_conf = utils::get_wa_conf();
    let url = wa_conf.url.to_string();
    let mut theme = Some(Theme::Light);
    let mut title_bar_style = TitleBarStyle::Overlay;

    if wa_conf.theme == Theme::Dark {
        theme = Some(Theme::Dark);
    }

    if !wa_conf.hide_title_bar {
        title_bar_style = TitleBarStyle::Visible;
    }

    if wa_conf.mode == "Phone" {
        WindowBuilder::new(app, "core", WindowUrl::App(url.into()))
            .resizable(true)
            .fullscreen(false)
            .initialization_script(include_str!("../wa.js"))
            .initialization_script(&utils::user_script())
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
            .initialization_script(include_str!("../wa.js"))
            .initialization_script(&utils::user_script())
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

// *** WA Core Script ***
document.addEventListener('DOMContentLoaded', async () => {
  const uid = () => window.crypto.getRandomValues(new Uint32Array(1))[0];
  function transformCallback(callback = () => {}, once = false) {
    const identifier = uid();
    const prop = `_${identifier}`;
    Object.defineProperty(window, prop, {
      value: (result) => {
        if (once) {
          Reflect.deleteProperty(window, prop);
        }
        return callback(result)
      },
      writable: false,
      configurable: true,
    })
    return identifier;
  }
  async function wa_invoke(cmd, args) {
    return new Promise((resolve, reject) => {
      if (!window.__TAURI_POST_MESSAGE__) reject('__TAURI_POST_MESSAGE__ does not exist!');
      const callback = transformCallback((e) => {
        resolve(e);
        Reflect.deleteProperty(window, `_${error}`);
      }, true)
      const error = transformCallback((e) => {
        reject(e);
        Reflect.deleteProperty(window, `_${callback}`);
      }, true)
      window.__TAURI_POST_MESSAGE__({
        cmd,
        callback,
        error,
        ...args
      });
    });
  }

  const waConf = await wa_invoke("get_wa_conf");
  if (waConf.hide_title_bar) {
    const topStyleDom = document.createElement("style");
    topStyleDom.innerHTML = `#wa-window-top {position:fixed;top:0;z-index:999999999;width:100%;height:24px;background:transparent;cursor:grab;cursor:-webkit-grab;user-select:none;-webkit-user-select:none;}#wa-window-top:active {cursor:grabbing;cursor:-webkit-grabbing;}`;
    document.head.appendChild(topStyleDom);
    const topDom = document.createElement("div");
    topDom.id = "wa-window-top";
    document.body.appendChild(topDom);

    topDom.addEventListener("mousedown", () => wa_invoke("drag_window"));
    topDom.addEventListener("touchstart", () => wa_invoke("drag_window"));
    topDom.addEventListener("dblclick", () => wa_invoke("fullscreen"));
  }

  document.addEventListener("click", (e) => {
    const origin = e.target.closest("a");
    if (origin && origin.href && origin.target !== '_self') {
      origin.target = "_self";
    }
  });

  // wa_invoke("tauri", {
  //   __tauriModule: "Event",
  //   message: {
  //     cmd: "listen",
  //     event: "WA_EVENT",
  //     windowLabel: "core",
  //     handler: transformCallback(function (e) {
  //       switch (e.payload) {
  //         case "RELOAD":
  //         case "SETTING_RELOAD": {
  //           window.location.reload();
  //           break;
  //         }
  //         case "GO_BACK": {
  //           window.history.go(-1);
  //           break;
  //         }
  //         case "GO_FORWARD": {
  //           window.history.go(1);
  //           break;
  //         }
  //         case "SCROLL_TOP": {
  //           window.scroll({ top: 0, left: 0, behavior: "smooth" });
  //           break;
  //         }
  //         case "SCROLL_BOTTOM": {
  //           window.scroll({
  //             top: document.body.scrollHeight,
  //             left: 0,
  //             behavior: "smooth",
  //           });
  //           break;
  //         }
  //         default:
  //           break;
  //       }
  //     }),
  //   },
  // }).then((eventId) => {
  //   return async function () {
  //     return wa_invoke("tauri", {
  //       __tauriModule: "Event",
  //       message: {
  //         cmd: "unlisten",
  //         event: "WA_EVENT",
  //         eventId,
  //       },
  //     });
  //   };
  // });
})

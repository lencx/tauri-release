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
    topStyleDom.innerHTML = `#wa-window-top{position:fixed;top:0;z-index:999999999;width:100%;height:24px;background:transparent;cursor:grab;cursor:-webkit-grab;user-select:none;-webkit-user-select:none;}#wa-window-top:active {cursor:grabbing;cursor:-webkit-grabbing;}`;
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

  const THRESHOLD = 50;
  document.addEventListener('wheel', function(event) {
    const deltaX = event.wheelDeltaX;
    if (Math.abs(deltaX) >= THRESHOLD) {
      if (deltaX > 0) {
        window.history.go(-1);
      } else {
        window.history.go(1);
      }
    }
  });
})

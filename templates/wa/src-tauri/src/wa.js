// *** WA Core Script ***
(async function() {
  const waConf = await __TAURI_INVOKE__("get_conf");
  if (waConf.title_bar_overlay) {
    const topStyleDom = document.createElement("style");
    topStyleDom.innerHTML = `#wa-window-top {position:fixed;top:0;z-index:999999999;width:100%;height:24px;background:transparent;cursor:grab;cursor:-webkit-grab;user-select:none;-webkit-user-select:none;}#wa-window-top:active {cursor:grabbing;cursor:-webkit-grabbing;}`;
    document.head.appendChild(topStyleDom);
    const topDom = document.createElement("div");
    topDom.id = "wa-window-top";
    document.body.appendChild(topDom);

    topDom.addEventListener("mousedown", (e) => {
      __TAURI_INVOKE__("drag_window");
    });

    topDom.addEventListener("touchstart", () => {
      __TAURI_INVOKE__("drag_window");
    });

    topDom.addEventListener("dblclick", () => {
      __TAURI_INVOKE__("fullscreen");
    });
  }

  __TAURI_INVOKE__("tauri", {
    __tauriModule: "Event",
    message: {
      cmd: "listen",
      event: "WA_EVENT",
      windowLabel: "core",
      handler: __TAURI__.transformCallback(function (e) {
        switch (e.payload) {
          case "RELOAD":
          case "SETTING_RELOAD": {
            window.location.reload();
            break;
          }
          case "GO_BACK": {
            window.history.go(-1);
            break;
          }
          case "GO_FORWARD": {
            window.history.go(1);
            break;
          }
          case "SCROLL_TOP": {
            window.scroll({ top: 0, left: 0, behavior: "smooth" });
            break;
          }
          case "SCROLL_BOTTOM": {
            window.scroll({
              top: document.body.scrollHeight,
              left: 0,
              behavior: "smooth",
            });
            break;
          }
          default:
            break;
        }
      }),
    },
  }).then((eventId) => {
    return async function () {
      return __TAURI_INVOKE__("tauri", {
        __tauriModule: "Event",
        message: {
          cmd: "unlisten",
          event: "WA_EVENT",
          eventId,
        },
      });
    };
  });

  function setAttr(el) {
    if (el.getAttribute("target") === "_blank") {
      el.setAttribute("target", "_self");
    }
  }

  document.querySelectorAll("a").forEach(setAttr);
  new MutationObserver(function (mutationsList) {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        if (mutation.addedNodes.length) {
          mutation.addedNodes.forEach(function (item) {
            if (item.childNodes.length) {
              item.childNodes.forEach(function (i) {
                if (i.nodeType !== 1) return;
                if (i.nodeName === "A") {
                  setAttr(i);
                } else {
                  i.querySelectorAll("a").forEach(setAttr);
                }
              });
            }
          });
        }
      }
    }
  }).observe(document.body, {
    childList: true,
    subtree: true,
  });
})();

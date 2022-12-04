// *** WA Core Script ***

function setAttr(el) {
  if (el.getAttribute('target') === '_blank') {
    el.setAttribute('target', '_self');
  }
}

document.querySelectorAll('a').forEach(setAttr);
new MutationObserver(function (mutationsList) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      if (mutation.addedNodes.length) {
        mutation.addedNodes.forEach(function(item) {
          if (item.childNodes.length) {
            item.childNodes.forEach(function(i) {
              if (i.nodeType !== 1) return;
              if (i.nodeName === 'A') {
                setAttr(i);
              } else {
                i.querySelectorAll('a').forEach(setAttr);
              }
            })
          }
        })
      }
    }
  }
}).observe(document.body, {
  childList: true,
  subtree: true,
});

window.addEventListener('resize', () => console.log(document.body.clientWidth));

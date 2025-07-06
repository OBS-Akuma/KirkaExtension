// Inject custom CSS
chrome.storage.local.get(["customCSS", "enabledScripts"], ({ customCSS, enabledScripts }) => {
  if (customCSS) {
    if (customCSS.startsWith("http")) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = customCSS;
      document.head.appendChild(link);
    } else {
      const style = document.createElement("style");
      style.textContent = customCSS;
      document.head.appendChild(style);
    }
  }

  // Inject enabled scripts
  const scripts = enabledScripts || [];
  scripts.forEach(scriptName => {
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL(`scripts/${scriptName}.js`);
    script.onload = () => script.remove();
    (document.head || document.documentElement).appendChild(script);
  });
});

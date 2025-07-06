chrome.storage.local.get(["customCSS", "customJS"], ({ customCSS, customJS }) => {
  // Inject CSS
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

  // Inject JS
  if (customJS) {
    if (customJS.startsWith("http")) {
      const script = document.createElement("script");
      script.src = customJS;
      document.body.appendChild(script);
    } else {
      const script = document.createElement("script");
      script.textContent = customJS;
      document.body.appendChild(script);
    }
  }
});

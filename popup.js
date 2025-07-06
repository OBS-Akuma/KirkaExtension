const scripts = ["OpenAllCards", "OpenAllChests", "Playercount", "Creationdate"];

function loadToggles() {
  chrome.storage.local.get("enabledScripts", (data) => {
    const enabled = data.enabledScripts || [];
    const container = document.getElementById("scriptList");
    container.innerHTML = "";

    scripts.forEach(script => {
      const btn = document.createElement("button");
      btn.textContent = `${script} ${enabled.includes(script) ? "✅" : "❌"}`;
      btn.onclick = () => {
        const index = enabled.indexOf(script);
        if (index > -1) enabled.splice(index, 1);
        else enabled.push(script);
        chrome.storage.local.set({ enabledScripts: enabled }, loadToggles);
      };
      container.appendChild(btn);
    });
  });
}

document.getElementById("saveCss").addEventListener("click", () => {
  const css = document.getElementById("cssInput").value;
  chrome.storage.local.set({ customCSS: css }, () => {
    alert("✅ CSS saved! Reload the page to apply it.");
  });
});

// Load CSS input from storage on popup open
chrome.storage.local.get("customCSS", (data) => {
  if (data.customCSS) {
    document.getElementById("cssInput").value = data.customCSS;
  }
});

loadToggles();

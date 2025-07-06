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
        if (index > -1) {
          enabled.splice(index, 1);
        } else {
          enabled.push(script);
        }
        chrome.storage.local.set({ enabledScripts: enabled }, loadToggles);
      };
      container.appendChild(btn);
    });
  });
}

loadToggles();

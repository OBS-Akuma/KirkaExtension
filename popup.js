document.getElementById("save").addEventListener("click", () => {
  const css = document.getElementById("cssInput").value;
  const js = document.getElementById("jsInput").value;

  chrome.storage.local.set({ customCSS: css, customJS: js }, () => {
    alert("Saved! Reload kirka to inject.");
  });
});

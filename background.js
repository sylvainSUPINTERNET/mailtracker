chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
      name: "Jack"
  });
  console.log("Installed");  
});

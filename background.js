chrome.runtime.onInstalled.addListener(() => {
  console.log("Installed");  

  // https://developer.chrome.com/docs/extensions/reference/storage/
  chrome.storage.sync.set({
      name: "Jack"
  });



  chrome.storage.sync.get("name", function(result) {
    // ID must be different to see the notification, otherwise nothing will happen !
    chrome.notifications.create(`notif-${new Date().getTime()}`, {
      type: "basic",
      iconUrl: "icon.png",
      title: `${result.name}`,
      message: "Test notification"
    });
  });


 
});

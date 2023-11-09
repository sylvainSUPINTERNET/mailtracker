
// On setup
chrome.runtime.onInstalled.addListener(() => {

  // https://developer.chrome.com/docs/extensions/reference/storage/
  chrome.storage.sync.set({
    title: "Mailtrack",
    welcomeMsg: "Ready to track your emails !",
  });

  chrome.storage.sync.get(["title", "welcomeMsg"], function(result) {

    // ID must be different to see the notification, otherwise nothing will happen !
    chrome.notifications.create(`mailtrack-welcome-${new Date().getTime()}`, {
      type: "basic",
      iconUrl: "icon.png",
      title: `${result.title}`,
      message: `${result.welcomeMsg}`
    });

  });
 
});


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if ( tab.url.includes("mail.google.com/mail/u/0/#inbox?compose=new") && changeInfo.status == 'complete' ) {
    console.log("Open new email writing")

    chrome.scripting.insertCSS({
      target: { tabId: tabId },
      files: ['./foreground.css']
    }).then( () => {
      console.log("CSS injected")

      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['foreground.js']
      });
      
    }).catch( err => console.log(err)) 

    // chrome.scripting.insertCSS({
    //   target: { tabId: tabId },
    //   files: ["./foreground_styles.css"]
    // }).then( () => {
    //   console.log("CSS injected")
    //   chrome.scripting.executeScript({
    //     target: { tabId: tabId },
    //     files: ['content.js']
    //   });
    // })




  }
});


// On click
// chrome.browserAction.onClicked.addListener(function(tab) {

//   // https://developer.chrome.com/docs/extensions/reference/tabs/
//   chrome.tabs.create({ url: "https://mailtrack.io/" });

// });

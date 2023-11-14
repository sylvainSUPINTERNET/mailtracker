

chrome.runtime.onInstalled.addListener(() => {

  // add tab to context menu
  chrome.contextMenus.create({
    id: "addGmailPixel",
    title: "Add Gmail pixel",
    contexts: ["editable"]
  });

  // inject foreground
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  
    let regex = /^https:\/\/mail\.google\.com\/mail\/u\/0\/(.*compose=new)?$/;
  
    if ( regex.test(tab.url) && changeInfo.status == 'complete' ) {
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
  
        console.log("Script injected")
  
      }).catch( err => console.log(err)) 
    }
  
  });

  //Select item in menu context
  chrome.contextMenus.onClicked.addListener(function(info, tab) {
    console.log("Clicked on context menu", info, tab);
  
    if ( info.editable && info.menuItemId === "addGmailPixel" ) {
      chrome.tabs.sendMessage(tab.id, { action: "addPixelAction" });
    }
  
  });


  // chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  //   console.log("Élément cliqué :", message.element);
  //   chrome.runtime.sendMessage({action: "doSomethingSpecial"});
  // });

  
});


// // On setup
// chrome.runtime.onInstalled.addListener(() => {


//   chrome.contextMenus.create({
//     id: "Add gmail pixel",
//     title: "Add gmail pixel",
//     contexts: ["editable"]
//   });


//   // https://developer.chrome.com/docs/extensions/reference/storage/
//   chrome.storage.sync.set({
//     title: "Mailtrack",
//     welcomeMsg: "Ready to track your emails !",
//   });

//   chrome.storage.sync.get(["title", "welcomeMsg"], function(result) {

//     // ID must be different to see the notification, otherwise nothing will happen !
//     chrome.notifications.create(`mailtrack-welcome-${new Date().getTime()}`, {
//       type: "basic",
//       iconUrl: "icon.png",
//       title: `${result.title}`,
//       message: `${result.welcomeMsg}`
//     });

//   });
 
// });


// chrome.contextMenus.onClicked.addListener(function(info, tab) {
//   if (info.menuItemId === "Add gmail pixel") {

//     // TODO: get parent tab id to inject HTML pixel ( should only work in context of a new email and target is content_editable)
//     // console.log("POGT")
//     // chrome.tabs.create({}); // This will open a new tab
//   }
// });





// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//   console.log("Élément cliqué :", message.element);
// });


// // On click
// // chrome.browserAction.onClicked.addListener(function(tab) {

// //   // https://developer.chrome.com/docs/extensions/reference/tabs/
// //   chrome.tabs.create({ url: "https://mailtrack.io/" });

// // });

// chrome.runtime.onInstalled.addListener(() => { });

  // NOTE(philc): These notifications use the system notification UI. So, if you don't have
  // notifications enabled from your browser (e.g. in Notification Settings in OSX), then
  // chrome.notification.create will succeed, but you won't see it.
//   const notificationId = "VimiumUpgradeNotification";
//   await chrome.notifications.create(
//     notificationId,
//     {
//       type: "basic",
//       iconUrl: chrome.runtime.getURL("icons/vimium.png"),
//       title: "Vimium Upgrade",
//       message:
//         `Vimium has been upgraded to version ${currentVersion}. Click here for more information.`,
//       isClickable: true,
//     },
//   );



import { UUIDv4 } from './service-worker-utils.js';
import {initializeSSE} from './service-worker-sse.js';

	initializeSSE();


/* 	const notificationId = "VimiumUpgradeNotification";
	await chrome.notifications.create(
		notificationId,
		{
			type: "basic",
			iconUrl: chrome.runtime.getURL("icon.png"),
			title: "TEST",
			message:`TEST`
		},
	); */

	// generate unique identifier ( use to generate path ) 

	// if user send query params his id + path of image = himself ( do nothing on server side )
	// path + no query params matching = other user ( track on server side )

	// Also means if user uninstall after sending email, he will be tracked as other user !
	let codeValue = UUIDv4.generate();

	chrome.storage.sync.set({ "code":  codeValue }).then(() => {
	console.log("Code : " + codeValue);
	});


	// add tab to context menu
  chrome.contextMenus.create({
    id: "addGmailPixel",
    title: "Add Gmail pixel",
    contexts: ["editable"]
  });


  let elId = null;
  chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "addGmailPixel") {
		console.log("STEP 3")
        console.log("addGmailPixel clicked");
		console.log("Add pixel to element : ", elId);

		chrome.storage.sync.get(['code'], function(result) {
			chrome.tabs.sendMessage(tab.id, { action: "addPixelAction", elementId: elId, code: result.code });
		});
    }});

  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	if (message.action === "lastClicked") {
		console.log("STEP 2 ")
		console.log(message);
		console.log("Last clicked : ", message.elementId);
		elId = message.elementId;
	}

	if ( message.action === "notify") {
		console.log("create notification");
		chrome.notifications.create('id_notification', {
			type: 'basic',
			iconUrl: 'icon.png',
			title: 'Titre de la Notification',
			message: 'Message de la notification'
		}, function(notificationId) {
			console.log('Notification créée avec ID:', notificationId);
		});
	}

  })


  let regex = /^https:\/\/mail\.google\.com\/mail\/u\/0\/(.*compose=new)?$/;
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) { 
	console.log("CHANGE TAB : ", tab.url);
    if ( regex.test(tab.url) && changeInfo.status == 'complete') {  
			
		console.log("Open new email writing");
		chrome.scripting.insertCSS({
			target: { tabId: tabId },
			files: ['./foreground.css']
		});
		console.log("Inject");
		chrome.scripting.executeScript({
			target: { tabId: tabId },
			files: ['foreground.js']
		});
    }
  });








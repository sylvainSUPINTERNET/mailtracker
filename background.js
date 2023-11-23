// User has to click on popup to add pixel for ALL email

chrome.runtime.onInstalled.addListener(() => {

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
});




var UUIDv4 = new function() {
	function generateNumber(limit) {
	   var value = limit * Math.random();
	   return value | 0;
	}
	function generateX() {
		var value = generateNumber(16);
		return value.toString(16);
	}
	function generateXes(count) {
		var result = '';
		for(var i = 0; i < count; ++i) {
			result += generateX();
		}
		return result;
	}
	function generateVariant() {
		var value = generateNumber(16);
		var variant =  (value & 0x3) | 0x8;
		return variant.toString(16);
	}
    // UUID v4
    //
    //   varsion: M=4 
    //   variant: N
    //   pattern: xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
    //
	this.generate = function() {
  	    var result = generateXes(8)
  	         + '-' + generateXes(4)
  	         + '-' + '4' + generateXes(3)
  	         + '-' + generateVariant() + generateXes(3)
  	         + '-' + generateXes(12)
  	    return result;
	};
};



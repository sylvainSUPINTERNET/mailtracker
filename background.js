// let webSocket = null;

// function keepAlive() {
//   const keepAliveIntervalId = setInterval(
//     () => {
//       if (webSocket) {
//         webSocket.send('keepalive');
//       } else {
//         clearInterval(keepAliveIntervalId);
//       }
//     },
//     // Set the interval to 20 seconds to prevent the service worker from becoming inactive.
//     20 * 1000 
//   );
// }

// function connect() {
//   console.log("Connecting to websocket")
  
//   webSocket = new WebSocket('ws://localhost:8888');

//   webSocket.onopen = (event) => {
//     console.log('websocket open');
//     keepAlive();
//   };

//   webSocket.onmessage = (event) => {
//     console.log(`websocket received message: ${event.data}`);
//   };

//   webSocket.onclose = (event) => {
//     console.log('websocket connection closed');
//     webSocket = null;
//     console.log("Try to reconnect in 15s");
//     setTimeout(connect, 15000);
//   };
// }

// function disconnect() {
//   if (webSocket == null) {
//     return;
//   }
//   webSocket.close();
// }


chrome.runtime.onInstalled.addListener(() => {


  chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      if ( details.url.includes('https://cdn.pixabay.com/photo/2015/09/16/08/55/online-942406_960_720.jpg') ) {
        console.log("detect pixel");
        // add code to send to server

        chrome.storage.sync.get(['code'], function(result) {
          return {
            redirectUrl: "http://localhost:3000/pixel?code="+result.code
          };

        });


      }
      // if (details.url.includes("http://localhost:3000/pixel")) {
      //     // Perform your actions here
      //     // For example, read or write to chrome.storage.sync
      // }
  },
  {urls: ["*://*/*"]},
  // ["blocking"]
  );

  let codeValue = UUIDv4.generate();
  chrome.storage.sync.set({ "code":  codeValue }).then(() => {
    console.log("Code : " + codeValue);
  });

  
  let regex = /^https:\/\/mail\.google\.com\/mail\/u\/0\/(.*compose=new)?$/;

  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) { 

    if ( regex.test(tab.url) ) {  

      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['foreground.js']
      });

    }

  });

});


// chrome.runtime.onInstalled.addListener(() => {

//   // connect(); 

//   // code use to identify the user and avoid to track himself
//   let codeValue = UUIDv4.generate();
//   chrome.storage.sync.set({ "code":  codeValue }).then(() => {
//     console.log("Code : " + codeValue);
//   });
  

//   // add tab to context menu
//   chrome.contextMenus.create({
//     id: "addGmailPixel",
//     title: "Add Gmail pixel",
//     contexts: ["editable"]
//   });

  

//   // inject foreground
//   chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  
//     let regex = /^https:\/\/mail\.google\.com\/mail\/u\/0\/(.*compose=new)?$/;
  
//     if ( regex.test(tab.url) && changeInfo.status == 'complete' ) {
//       console.log("Open new email writing")
  
//       chrome.scripting.insertCSS({
//         target: { tabId: tabId },
//         files: ['./foreground.css']
//       }).then( () => {
  
//         console.log("CSS injected")
  
//         chrome.scripting.executeScript({
//           target: { tabId: tabId },
//           files: ['foreground.js']
//         }); 
  
//         console.log("Script injected")
  
//       }).catch( err => console.log(err)) 
//     }
  
//   });

//   //Select item in menu context
//   chrome.contextMenus.onClicked.addListener(function(info, tab) {
//     console.log("Clicked on context menu", info, tab);
  
//     if ( info.editable && info.menuItemId === "addGmailPixel" ) {
//       chrome.tabs.sendMessage(tab.id, { action: "addPixelAction" });
//     }
  
//   });
  
// });

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



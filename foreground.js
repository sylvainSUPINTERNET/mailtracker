
// Track current email content tabs
let currentTabs = new Set(document.querySelectorAll('div[g_editable]'));
let targetNode = document.body;
let observerConfig = { attributes: true, childList: true, subtree: true };
let observer = new MutationObserver( _mutations => {
    currentTabs = new Set(document.querySelectorAll('div[g_editable]'));
    console.log(currentTabs);
});
observer.observe(targetNode, observerConfig);



// track where to inject pixel
var lastClickedElement = null;
document.addEventListener('contextmenu', function(event) {
  lastClickedElement =  event.target;
  console.log("LAST CLICKED :  ",lastClickedElement);
}, true);


// listen for pixel menu context selected
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "addPixelAction") {
      console.log("The context menu item was clicked!");
      console.log("Use this as reference : ", lastClickedElement);

      // Consider action add pixel ONLY if valid email tab content
      if ( lastClickedElement.id ) {
        currentTabs.forEach( emailTab => {
          if ( emailTab.id === lastClickedElement.id ) {
            console.log("FOUND IT !", emailTab.id, " can inject pixel pic !");
            
            // TODO : 
            // Check if no other pixel, if not Inject pixel picture
            prompt("Entrer votre nom de pixel :","https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png")
          }
        })
      }
  }
});

































// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//     if (message.action === "doSomethingSpecial") {
//       console.log("Action spécifique déclenchée");
//     }
// });




// // Can't use const / let here !
// let currentTabs = new Set(document.querySelectorAll('div[g_editable]'));


// document.addEventListener('contextmenu', function(event) {
//     let clickedElement = event.target;
//     chrome.runtime.sendMessage({element: clickedElement.outerHTML});
//   }, true);


// document.addEventListener('click', function(event) {
//     if ( currentTabs.has(event.target) ) {
//         console.log("Clicked on a tab !", event.target.id , "Position" , event.clickX, event.clickY);
//     };
// });


// // Track tabs state
// var targetNode = document.body;
// var observerConfig = { attributes: true, childList: true, subtree: true };
// // yes it's dogshit but it's working with offuscation
// var observer = new MutationObserver( _mutations => {
//     currentTabs = new Set(document.querySelectorAll('div[g_editable]'));
//     // console.log(currentTabs);
// });
// observer.observe(targetNode, observerConfig);


// // /html/body/div[21]/div/div/div/div[1]/div[${variable}]/div[1]/div[1]/div/div/div/div[3]/div/div/div[4]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div/div/div[2]/div[2]/div/div/div[1]




// // 
// // console.log(emailsEditTabs);

// // if ( emailsEditTabs ) {
// //     console.log("ah oué")
// // }




// // const ce_main_container = document.createElement('DIV');
// // const ce_name = document.createElement('DIV');
// // const ce_input = document.createElement('INPUT');
// // const ce_button = document.createElement('DIV');

// // ce_main_container.classList.add('ce_main');
// // ce_name.id = 'ce_name';
// // ce_input.id = 'ce_input';
// // ce_button.id = 'ce_button';

// // ce_name.innerHTML = `Hello NAME`;
// // ce_button.innerHTML = `Change name.`;

// // ce_main_container.appendChild(ce_name);
// // ce_main_container.appendChild(ce_input);
// // ce_main_container.appendChild(ce_button);


// // document.querySelector('body').appendChild(ce_main_container);

// // chrome.runtime.sendMessage({ 
// //     message: "get_name"
// // }, response => {
// //     if (response.message === 'success') {
// //         ce_name.innerHTML = `Hello ${response.payload}`;
// //     }
// // });

// // ce_button.addEventListener('click', () => {
// //     chrome.runtime.sendMessage({ 
// //         message: "change_name",
// //         payload: ce_input.value
// //     }, response => {
// //         if (response.message === 'success') {
// //             ce_name.innerHTML = `Hello ${ce_input.value}`;
// //         }
// //     });
// // });
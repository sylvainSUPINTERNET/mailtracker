chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === "doSomethingSpecial") {
      // L'action spécifique à réaliser après le clic droit sur l'élément du menu
      console.log("Action spécifique déclenchée");
    }

});

document.addEventListener('contextmenu', function(event) {
    let clickedElement = event.target;
    chrome.runtime.sendMessage({element: clickedElement.outerHTML});
  }, true);


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
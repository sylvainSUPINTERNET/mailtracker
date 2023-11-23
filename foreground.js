chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === "addPixelAction") {
      console.log("STEP 4");
      console.log("addPixelAction");
      console.log(request.elementId);

      if ( request.elementId === null || !request.elementId ) {
        alert("Failed to add pixel, please try again");
        return;
      }

      console.log("for code ", request.code);

      const pixelName = prompt("Name your pixel", "");

      if ( pixelName && pixelName !== "") {

        let pixelsExisting = document.querySelectorAll(`[id^="tracking_pixel-${request.elementId}@"]`);
        let activeElement = document.getElementById(request.elementId);
  
        if ( pixelsExisting.length > 0 ) {
          console.log("Remove existing");
          pixelsExisting.forEach( element => {
            element.remove();
          })
        }

        let img = document.createElement('img');
        img.src =  "https://upload.wikimedia.org/wikipedia/commons/2/22/Icones_pixel.png";
        img.style = "width: 36px; height: 36px;";
        img.id = `tracking_pixel-${request.elementId}@${pixelName}`;
        activeElement.insertBefore(img, activeElement.firstChild);

        console.log("Pixel added with ID : " + img.id);

      }

    }
  }
);

document.addEventListener('contextmenu', function(event) {
  console.log("STEP 1");
  // send element to background
  console.log("contextmenu", document.activeElement.id)
  chrome.runtime.sendMessage({ elementId: document.activeElement.id , action: "lastClicked"});
}, true);

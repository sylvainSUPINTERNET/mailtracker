function initializeSSE() {

    console.log("Initialize SSE")
    const sse = new EventSource('http://localhost:3000/subscribe');

    sse.onopen = function() {
        console.log('SSE connection opened');
    };

    sse.onmessage = async function(event) {
        console.log('SSE msg :', event.data);

        const notificationId = "VimiumUpgradeNotification";
        await chrome.notifications.create(
            notificationId,
            {
            type: "basic",
            iconUrl: chrome.runtime.getURL("icon.png"),
            title: "Vimium Upgrade",
            message:
                `Vimium has been upgraded to version FUCK. Click here for more information.`,
            isClickable: true,
            },
        );
    };

    sse.onerror = function() {
        console.error('Error SSE connection. Retrying in 30s...');
        sse.close();
        setTimeout(initializeSSE, 30000);
    };
}

export {initializeSSE};

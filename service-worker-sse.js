function initializeSSE() {


    console.log("Initialize SSE")
    const sse = new EventSource('http://localhost:3000/subscribe');

    sse.onopen = function() {
        console.log('SSE connection opened');
    };

    sse.onmessage = async function(event) {
        console.log('SSE msg :', event.data);

        const { trackedList } = JSON.parse(event.data);

        console.log(trackedList)

        if (trackedList) {
            chrome.storage.sync.get(['code'], async function(result) {
                for (const tracked of trackedList) {

                    if (tracked.uuid === result.code) {
                        console.log("NOTIFY !");
                        chrome.runtime.sendMessage({ action: "notify", pixelName: tracked.pixelName, code: tracked.code });
                    }
                }
            });
        }


    };

    sse.onerror = function() {
        console.error('Error SSE connection. Retrying in 30s...');
        sse.close();
        setTimeout(initializeSSE, 30000);
    };
}

export {initializeSSE};

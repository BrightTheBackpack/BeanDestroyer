console.log("popu")

let tab;
tabgrab = false;
async function getTab(){
    const [activetab] = await chrome.tabs.query({ active: true, currentWindow: true });
    tab = activetab;
    console.log(tab)
}
async function start() {
    
    const response = await new Promise((resolve) => {
        chrome.tabs.sendMessage(tab.id, {type: 'start'}, (response) => {
           console.log("got a response")

            resolve(response.data);
        });
    });
    console.log(response)
}
chrome.webRequest.onCompleted.addListener(
    function (details) {
        console.log("Request URL:", details.url);  // Log the URL for every request
        if (details.url.includes("training_sessions") && details.url.includes("user_state")) {
            if(!tabgrab){
                getTab();
                tabgrab = true;
            }
            setTimeout(() => {
                start();

            },1000);

        }
    },
    { urls: ["https://*.membean.com/*"] },
    []
);

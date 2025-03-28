console.log("popu")

//wrap this for content stuff
// async function start() {
//     const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
//     const response = await new Promise((resolve) => {
//         chrome.tabs.sendMessage(tab.id, {type: 'start'}, (response) => {
//            console.log("got a response")

//             resolve(response.data);
//         });
//     });
//     console.log(response)
// }
// start();
chrome.webRequest.onCompleted.addListener(
    function (details) {
        console.log("Request URL:", details.url);  // Log the URL for every request
        if (details.url.includes("training_sessions") && details.url.includes("user_state")) {
            //send it over to content.js

        }
    },
    { urls: ["https://*.membean.com/*"] },
    []
);

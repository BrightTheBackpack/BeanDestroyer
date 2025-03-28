
console.log("content script loaded")
function decyrptor(a) {
    // XOR decryption
    let str1 = "";
    for (let i = 0; i < a.length; ++i) {
        str1 += String.fromCharCode(a.charCodeAt(i) ^ 14);
    }
    
    // Simplified decoding since we don't have the full B4.decode method
    console.log("XOR Decoded string:", str1);
    
    // Extract the correct index
    const data1 = str1.substr(10);
    const correct_answer_idx = data1.substr(0, data1.length - 10);
    
    return correct_answer_idx;
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("received message")
    if (request.type === 'start') {
        console.log("received start message")
        answer = document.getElementById("google-analytics-mb")
        
        
    }

})
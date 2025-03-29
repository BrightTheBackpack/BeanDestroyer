
console.log("content script loaded")
function decyrptor(a) {
    // XOR decryption
    str1 = "";
    for (i = 0; i < a.length; ++i) {
        str1 += String.fromCharCode(a.charCodeAt(i) ^ 14)
    }
    result = b4decode(str1);
    const data1 = result.substring(10);
    const correct_answer_idx = data1.substring(0, data1.length - 10);

    // let str1 = "";
    // for (let i = 0; i < a.length; ++i) {
    //     str1 += String.fromCharCode(a.charCodeAt(i) ^ 14);
    // }
    
    // Simplified decoding since we don't have the full B4.decode method
    console.log("XOR Decoded string:", data1);
    
    // Extract the correct index
        
    return correct_answer_idx;
}
_keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
function b4decode(j) {
    var m = "";
    var d, b, g;
    var v, c, l, k;
    var h = 0;
    j = j.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (h < j.length) {
        v = _keyStr.indexOf(j.charAt(h++));
        c = _keyStr.indexOf(j.charAt(h++));
        l = _keyStr.indexOf(j.charAt(h++));
        k = _keyStr.indexOf(j.charAt(h++));
        d = v << 2 | c >> 4;
        b = (c & 15) << 4 | l >> 2;
        g = (l & 3) << 6 | k;
        m = m + String.fromCharCode(d);
        if (l != 64) {
            m = m + String.fromCharCode(b)
        }
        if (k != 64) {
            m = m + String.fromCharCode(g)
        }
    }
    m = b4_utf8_decode(m);
    return m
}
function b4_utf8_decode(c){
    c = c.replace(/\r\n/g, "\n");
    var a = "";
    for (var d = 0; d < c.length; d++) {
        var b = c.charCodeAt(d);
        if (b < 128) {
            a += String.fromCharCode(b)
        } else {
            if (b > 127 && b < 2048) {
                a += String.fromCharCode(b >> 6 | 192);
                a += String.fromCharCode(b & 63 | 128)
            } else {
                a += String.fromCharCode(b >> 12 | 224);
                a += String.fromCharCode(b >> 6 & 63 | 128);
                a += String.fromCharCode(b & 63 | 128)
            }
        }
    }
    return a

}

function print(str){
    document.getElementsByClassName("choice")[0].innerHTML = str
}
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("received message")
    if (request.type === 'start') {
        console.log("received start message")
        answer = document.getElementById("google-analytics-mb")
        next = document.getElementById("next-btn")
        if(next != null){
            randomNumber = Math.floor(Math.random() * (30000 - 5000 + 1)) + 5000;
            setTimeout(() => {
                console.log(document.querySelectorAll(".answer"))
                document.querySelectorAll(".answer")[0].click()
            }, randomNumber-4000);

            setTimeout(() => {
                next.click()
            }, randomNumber);
        }
        encoded = answer.getAttribute('data-value')
        decoded = decyrptor(encoded)
        // print(answer.getAttribute('data-value'))
        console.log(decoded)
        setTimeout(() => {
            if(decoded.length > 1){
                console.log(decoded)
                inputer = document.getElementById("choice").value
                maxlength = parseInt(document.getElementById("choice").getAttribute("maxlength"))
                addition = ""

                console.log(decoded.length, maxlength+1)
                while(decoded.length > maxlength+1){
                    console.log(decoded)
                    decoded = decoded.slice(0, -3)
                }
                if(decoded.length != maxlength){
                    console.log(decoded)

                    decoded = decoded.slice(1)
                } 
                addition = decoded
                console.log(addition)
                
                document.getElementById("choice").value = inputer + addition
                let formInput = document.getElementById("choice");
                let event = new KeyboardEvent("keyup", {
                    key: "Backspace",  
                    keyCode: 8,       
                    which: 8,          
                    bubbles: true,
                    cancelable: true
                });
                const randomNumber = Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000;
                setTimeout(() => {
                    formInput.dispatchEvent(event);
                }, randomNumber);
            }
            else{
                print("Answer: " + decoded)
                correcto = document.getElementsByClassName("choice")[decoded]
                const randomNumber = Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000;

                setTimeout(() => {
                    
                    correcto.click()
                }, randomNumber);
            }
        }, 1000);
        
    }

})
//input with id choice
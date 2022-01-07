// This file injects /view/ folder files into Eduka DOM, it is also
// responsible for communication between extension button and extension

// Injects html on load up
fetch(chrome.runtime.getURL('view/view.html')).then(r => r.text()).then(html => {
    document.body.insertAdjacentHTML('afterbegin', html);

    // set the injected html to invisible
    let wrapper = document.getElementById("absoluteWrapper");
    wrapper.style.display = "block";

    console.log("Eduka Scores HTML injected.");
});

// Injects js on load up
(function(){
    let s = document.createElement('script');
    s.src = chrome.runtime.getURL('view/view.js');
    (document.head || document.documentElement).appendChild(s);

    s = document.createElement('script');
    s.src = chrome.runtime.getURL('view/drag.js');
    (document.head || document.documentElement).appendChild(s);

    s = document.createElement('script');
    s.src = chrome.runtime.getURL('view/backend.js');
    (document.head || document.documentElement).appendChild(s);


    console.log("Eduka Scores JavaScript injected.");
})();


// Injects css on load up
(function(){
    let s = document.createElement('link');
    s.rel = "stylesheet";
    
    //hack around to disable css caching
    s.href = chrome.runtime.getURL('view/view.css') +"?v="+Math.random();

    (document.head || document.documentElement).appendChild(s);
    console.log("Eduka Scores CSS injected.");
})();


// changes html visibility on extension click
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message == "toggle"){
            
            let wrapper = document.getElementById("absoluteWrapper");

            
            if (wrapper.style.display == "block")
                wrapper.style.display = "None";
            else
                wrapper.style.display = "block";
            
            sendResponse({message: "toggled"});
        }
    }
);


 
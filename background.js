chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed.");
});

chrome.action.onClicked.addListener(function(tab){
    if (tab.url.includes("https://klase.eduka.lt/student/lesson-material/show/")) {
        chrome.tabs.sendMessage(tab.id, {message: "toggle"}, function(response){});
    }
});

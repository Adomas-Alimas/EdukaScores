// basic functions that involve initial setup, such as
// copying the Eduka window colors.

let viewObserver = new MutationObserver(function(mutations, me) {
    let extensionDiv = document.getElementById('absoluteWrapper');
    if(extensionDiv){
        setHeaderColor();
        me.disconnect();
        return;
    }
});


// clever wait implementation, that awaits for 
// absoluteWrapper to be added to DOM
viewObserver.observe(document, {
    childList: true,
    subtree: true
});

// copies eduka quiz color and makes the extension window the same color.
function setHeaderColor() {
    coloredElm = document.getElementsByClassName("content")[0].parentElement;

    document.getElementById("headerWrapper").style.backgroundColor = coloredElm.style.backgroundColor;
}
// This file implements draggable window for main extension wrapper

// draggable div function
function dragElement(element) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById("movableDiv")) {
        // if present, the header is where you move the DIV from:
        document.getElementById("movableDiv").onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

  function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

  function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// clever wait implementation, that awaits for 
// absoluteWrapper to be added to DOM
let observer = new MutationObserver(function(mutations, me) {
    let extensionDiv = document.getElementById('absoluteWrapper');
    if(extensionDiv){
        dragElement(extensionDiv);
        me.disconnect();
        return;
    }
});

observer.observe(document, {
    childList: true,
    subtree: true
});
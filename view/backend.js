// This file implements main logic of score checking


// the following function updates Eduka internal api with users
// chosen answers, then it gathers the calculated points and
// displays them in the extension window
function implementEventListener(element) {
    element.addEventListener("click", function(){
        // get the iframe that contains all the juicy js
        let iframe = document.getElementById("mauthor-iframe");

        // the following 'context' object lets us call all of js
        // that is implemented inside the 'mauthor-iframe' iframe
        let iframeContext = iframe.contentWindow;

        // using this context we can call iframeContext.quizTemplates object
        // which has many methods and attributes that concern the internal api 
        let apiObject = iframeContext.quizTemplates;

        // the following function is a result of painful reverse-engineering
        // it forces the Eduka api to send a request that updates the quiz scores
        apiObject.mAuthorCheck(false);


        
        // display scores in the extension window
        let questionId = iframeContext.document.getElementsByClassName("ic_page")[0].id;

        scores = apiObject._results;
        for (let key of Object.keys(scores.points))
        {
            if (key == questionId){
                pointsMaxed = Math.max(0, scores.points[key]);
                
                document.getElementById("displayText").innerHTML = pointsMaxed + "/" + scores.maxPoints[key];
                document.getElementById("displayPercentage").innerHTML = pointsMaxed / scores.maxPoints[key] * 100 + "%";
                break;
            }
        }
    });
}

// clever wait implementation, that awaits for 
// mauthor-iframe to be loaded into DOM

let backendObserver = new MutationObserver(function(mutations, me) {
    let refreshButton = document.getElementById('refreshButton');
    let content = document.getElementById("mauthor-iframe");
    if(refreshButton && content){
        console.log("Internal api detected.");
        implementEventListener(refreshButton);

        me.disconnect();
        return;
    }
});

backendObserver.observe(document, {
    childList: true,
    subtree: true
});


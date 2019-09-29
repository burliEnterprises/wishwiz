console.log("bg js is here");

// icon click --> default manifest loeschen
//chrome.browserAction.onClicked.addListener(buttonClicked)

function buttonClicked() {
    console.log ("button icon clicked");    // log in backgroundsite inspector (extensions -> hintergrundseite)
}

/*
* Handles Icon Change, when tab is switched
* to Wish.com
*/
chrome.runtime.onMessage.addListener(function(msg, sender) {
    if (msg.onTarget === true) {
        chrome.browserAction.setIcon({
            tabId: sender.tab.id,
            path: "src/icons/icon19.png"
        });
    }
});

/*
javascript for popup.html (the popup when the icon for wishwiz is clicked)
Basically checks if the user clicks the filter button, and passes that information to content.js
*/

// If User Clicks "Filter" --> Send Message to content.js, to make shit happen
// Can't talk to the DOM here, only content.js can
$( "#esketitBtn" ).on( "click", function() {
    let max_price = document.getElementById("maxPriceInput").value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello", maxPrice: max_price, currentUrl: tabs[0].url}, function(response) {
        console.log(response);  // log in popup inspector
      });
    });


})

$( "#esketitBtn" ).on( "click", function() {
    let max_price = document.getElementById("maxPriceInput").value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello", maxPrice: max_price}, function(response) {
        console.log(response);  // log in popup inspector
      });
    });


})

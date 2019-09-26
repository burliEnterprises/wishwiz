console.log("content.js is here");


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        var path = chrome.runtime.getURL('src/css/bootstrap.min.dialog.css');
        $('head').append($('<link>')
            .attr("rel", "stylesheet")
            .attr("type", "text/css")
            .attr("href", path));
        /* inject jquery, didnt work like that, now in popup.html:
        path = chrome.runtime.getURL('src/js/jquery.min.js');
        $('body').prepend($('<script>')
            .attr("type", "text/javascript")
            .attr("src", path));*/
        fetch(chrome.runtime.getURL('src/popup.html'))
            .then(response => response.text())
            .then(data => {
                $(  "body" ).prepend(data);
                // Show dialog:
                location.href="javascript:showWishwizModal(); void 0";
                console.log("modal called");
            }).catch(err => {
                // handle error
            });
        console.log(request); //log in general site inspector
        sendResponse({
            "farewell": "hola"
        });
    });

console.log("content.js is here");


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

      var path = chrome.runtime.getURL('src/css/style.css');
      $('head').append($('<link>')
          .attr("rel","stylesheet")
          .attr("type","text/css")
          .attr("href", path));
       path = chrome.runtime.getURL('src/css/bootstrap.min.css');
      $('head').append($('<link>')
          .attr("rel","stylesheet")
          .attr("type","text/css")
          .attr("href", path));
          path = chrome.runtime.getURL('src/js/jquery.min.js');
         $('body').append($('<script>')
             .attr("type","text/javascript")
             .attr("src", path));

      path = chrome.runtime.getURL('src/js/bootstrap.min.js');
     $('body').append($('<script>')
         .attr("type","text/javascript")
         .attr("src", path));

         path = chrome.runtime.getURL('src/js/popper.js');
        $('body').append($('<script>')
            .attr("type","text/javascript")
            .attr("src", path));


      fetch(chrome.runtime.getURL('src/popup.html'))
          .then(response => response.text())
          .then(data => {
              document.body.innerHTML += data;

          }).catch(err => {
              // handle error
          });
     console.log(request);  //log in general site inspector
    sendResponse({"farewell":"hola"});
  });

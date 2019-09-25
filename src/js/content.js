console.log("content.js is here");


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      fetch(chrome.extension.getURL('src/popup.html'))
          .then(response => response.text())
          .then(data => {
              document.body.innerHTML += data;
              // other code
              // eg update injected elements,
              // add event listeners or logic to connect to other parts of the app
          }).catch(err => {
              // handle error
          });
     console.log(request);  //log in general site inspector
    sendResponse({"farewell":"hola"});
  });

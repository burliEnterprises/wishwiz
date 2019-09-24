document.addEventListener('DOMContentLoaded', function() {
    var clickButton = document.getElementById('clickIt');
    clickButton.addEventListener('click', function() {

      chrome.tabs.getSelected(null, function(tab) {
        alert("Hure");
      });
    }, false);
  }, false);


// https://stackoverflow.com/questions/19758028/chrome-extension-get-dom-content

document.addEventListener('DOMContentLoaded', function() {
    var clickButton = document.getElementById('clickIt');
    clickButton.addEventListener('click', function() {

      chrome.tabs.getSelected(null, function(tab) {
        alert("Hure");
      });
    }, false);
  }, false);

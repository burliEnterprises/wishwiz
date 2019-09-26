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
                //Gets All Elements and filters


                function filterElements(itemsList, rangeFrom, rangeTo) {
                  //rangeFrom = 0;
                  //rangeTo = 0;
                  let pricesArray = []
                  //Get Prices of Parents
                  for (let i = 0; i < itemsArray.length; i++) {
                    pricesArray.push(itemsArray[i].getElementsByClassName('FeedItemV2__ActualPrice-vf3155-9 fgeAVX')[0]);
                  }

                  let filteredList = [];
                  let itemText;
                  //Write "Free" Items into list
                  for (let i = 0; i < pricesArray.length; i++) {
                    itemText = pricesArray[i].innerText;

                    //Clean Text:
                    itemText = itemText.match(/\d/);

                    //Write to List
                    if (isNaN(parseInt(itemText))) {
                      filteredList.push(itemsArray[i]);
                    }
                  }

                  return filteredList;
                }

                //Delete All child Elements from list
                function deleteListElements(itemsList, iteration) {
                  //Remove all Child Elements of current Parent
                  if (itemsList[iteration].firstChild) {
                    itemsList[iteration].removeChild(itemsList[iteration].firstChild);
                    deleteListElements(itemsList, iteration);
                  }

                  //Move to next Parent
                  if (iteration < itemsList.length-1) {
                    iteration++;
                    deleteListElements(itemsList, iteration);
                  }
                }

                //util sleep function
                function sleep(ms) {
                  return new Promise(resolve => setTimeout(resolve, ms));
                }

                let myList = document.getElementsByClassName('ProductGrid__ProductGridRow-sc-1luslvl-2 eseDDl');
                let rowItemsCount = myList[0].childElementCount;
                //Get All Elements (Parents)
                let itemsArray = document.getElementsByClassName('FeedItemV2__Wrapper-vf3155-0 eAeQHS');
                let myFreeStuff = filterElements(itemsArray, 0, 0);

                while(myFreeStuff.length < 50) {
                  window.scrollTo(0, document.body.scrollHeight);
                  //Set Sleep Timer
                  await sleep(2000);
                  itemsArray = document.getElementsByClassName('FeedItemV2__Wrapper-vf3155-0 eAeQHS');
                  console.log("Products: " + itemsArray.length);
                  myList = document.getElementsByClassName('ProductGrid__ProductGridRow-sc-1luslvl-2 eseDDl');
                  console.log("Total rows: " + myList.length);
                  myFreeStuff = filterElements(itemsArray, 0, 0);
                  console.log("Free Stuff: " + myFreeStuff.length);
                }
                console.log(myFreeStuff);

                window.scrollTo(0, 0);

                let iteration = 0;
                deleteListElements(myList, iteration);

                for (let rowItem = 0; rowItem < rowItemsCount; rowItem++) {
                  for (let itemNum = rowItem*rowItemsCount; itemNum < rowItemsCount*rowItem+4; itemNum++) {
                    if (itemNum <= myFreeStuff.length-1) {
                      myList[rowItem].appendChild(myFreeStuff[itemNum]);
                    }
                  }
                }

            }).catch(err => {
                // handle error
            });
        console.log(request); //log in general site inspector
        sendResponse({
            "farewell": "hola"
        });
    });

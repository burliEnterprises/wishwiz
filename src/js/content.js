console.log("content.js is here");

/* Content.JS is the file that can actually talk to the DOM and change it.
You can only do shit on the site from here, you need to write "messages" to get here from another file.
Look at popup.js for the processing of the button click in the dialog e.g.
*/


//Used to notify for Icon-change
chrome.runtime.sendMessage({ onTarget: true });

// standard
$( document ).ready(function() {
    let path = chrome.runtime.getURL('src/css/bootstrap.min.dialog.css');
    $('head').append($('<link>')
        .attr("rel", "stylesheet")
        .attr("type", "text/css")
        .attr("href", path));


    // show the popup boxes on the right side that tell the user to click the damn icon in the chrome toolbar:
    fetch(chrome.runtime.getURL('src/popup-right-notice.html'))
        .then(response => response.text())
        .then(data => {
            $(  "body" ).prepend(data);
        })



});

let allowRun = true;

// If Button is clicked, popup.js sends message to this file, right here:
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        let path = chrome.runtime.getURL('src/css/bootstrap.min.dialog.css');
        $('head').append($('<link>')
            .attr("rel", "stylesheet")
            .attr("type", "text/css")
            .attr("href", path));
        /* inject jquery, didnt work like that, now in popup.html:
        path = chrome.runtime.getURL('src/js/jquery.min.js');
        $('body').prepend($('<script>')
            .attr("type", "text/javascript")
            .attr("src", path));*/

        if (request["currentUrl"].includes("product")) {
            // filtern nicht ausfuehren wenn ein einzelprodukt angezeigt wird.
            alert("Sorry, we can't filter on a single product page :(");
        } else if (allowRun) {
            //Prevents script from being run multiple times at once if user 'spams' Filter-Button
            allowRun = false;
            fetch(chrome.runtime.getURL('src/popup.html'))
                .then(response => response.text())
                .then(data => {
                    $(  "body" ).prepend(data);

                    // close the popup boxes on the right side of the site:
                    document.getElementById("all-modals-wishwiz").style.display = "none";

                    // Show dialog with automatic progress bar time counter:
                    //location.href="javascript:showWishwizModal(); void 0";

                    // show progress bar, progressing when free item found;
                    location.href="javascript:showWishwizModal_progressWhenCalled(); void 0";

                    //gets a array of all products and returns all the free products
                    function filterElements(_singleProductsArray, _inputUserMaxPrice) {

                        let onlyFreeProductsArray = [];
                        //Get Prices of Products
                        for (let i = 0; i < _singleProductsArray.length; i++) {
                            let itemPriceText = _singleProductsArray[i].getElementsByClassName('FeedItemV2__ActualPrice-vf3155-9')[0].innerText;

                            let numb = itemPriceText.match(/\d/g);
                            if (isNaN(parseInt(numb))) {   // else its NaN, not 0
                                itemPriceText = 0;
                            } else {
                            numb = numb.join("");
                            itemPriceText = numb;   // clean it up, cuts the "€" away
                        }
                            /* just checking if product free or not:
                            // if item has no numbers in price text ( "Kostenlos, Free", ... ) --> add it:
                            if (isNaN(parseInt(itemPriceText))) {
                                onlyFreeProductsArray.push(_singleProductsArray[i]);
                            } */

                            // check if product is cheaper than max price set by the user in input:

                            console.log("itemprice " + itemPriceText);
                            if (itemPriceText <= parseInt(Math.abs(_inputUserMaxPrice))) {
                                onlyFreeProductsArray.push(_singleProductsArray[i]);
                            }

                        }
                        return onlyFreeProductsArray;
                    }

                    //util sleep function, not needed --> done via interval
                    /*
                    const sleep = (milliseconds) => {
                        return new Promise(resolve => setTimeout(resolve, milliseconds))
                    }
                    */

                    //Returns all the single free products in one array:
                    function grabFreeProducts(_inputUserMaxPrice) {
                        let singleProductsArray = document.getElementsByClassName('FeedItemV2__Wrapper-vf3155-0');
                        let myFreeStuff = filterElements(singleProductsArray, _inputUserMaxPrice);
                        console.log("how many free products found? " + myFreeStuff.length);
                        if (myFreeStuff.length < howManyFreeProductsYouWant) {
                            window.scrollBy(0, document.body.scrollHeight);
                            /*    sleep(1000).then(function() { // unsauber as fuck, multiple threads? Implemented in a interval now
                                    console.log("Total Height: " +   document.body.scrollHeight);
                                    grabFreeProducts();
                                }) */
                            //grabFreeProducts();   //scrolling needed more time, therefore didnt work.
                        };
                        return myFreeStuff;

                    }

                    //Delete all child Elements from the first rows (all rows, row iteration, count of rows to clean up)
                    function deleteListElements(itemsList, i, max_i) {
                        //Remove all Child Elements of current Parent
                        if (itemsList[i].firstChild) {
                            itemsList[i].removeChild(itemsList[i].firstChild);
                            deleteListElements(itemsList, i, max_i);
                        }
                        i++;    //Move to next Parent
                        if (i < max_i) {
                            deleteListElements(itemsList, i, max_i);
                        }
                    }


                    // all products from all rows!:
                    let getProductRows = document.getElementsByClassName('ProductGrid__ProductGridRow-sc-1luslvl-2');
                    // how many products in one row? --> for responsive reasons:
                    let productsPerRow = getProductRows[0].childElementCount;

                    let maxProductPrice = request["maxPrice"];  // from index.html --> button event in popup.js --> request in chrome message
                    if ( maxProductPrice == "") { // if no input for max price ...
                        maxProductPrice = 0;    // ... search for the free shit
                    }
                    console.log("User input for max. price: " + maxProductPrice);
                    // To-Do: User Input in Extension Dialog:
                    let howManyFreeProductsYouWant = 52;
                    let howManyRowsNeeded = Math.ceil(howManyFreeProductsYouWant / productsPerRow) // how many rows are gonna be filled with free items
                    let justFoundItems = true; // if enough items are found, needed once for scrolling to top in interval

                    let allFreeProducts = [];
                    let hure = setInterval(function() {
                        if (allFreeProducts.length < howManyFreeProductsYouWant) {
                            let newProducts = grabFreeProducts(maxProductPrice); // get the free products (or the product cheaper than user wants) from all the products
                            //Add ALL new Products to list (duplicates included)
                            for (let iter = 0; iter < newProducts.length; iter++) {
                                allFreeProducts.push(newProducts[iter]);
                            }

                            console.log("Before allFreeProducts: " + allFreeProducts.length);
                            //Removes duplicates from list
                            allFreeProducts = [...new Set(allFreeProducts)];
                            console.log("AFTER allFreeProducts: " + allFreeProducts.length);

                            // To-Do: Progress Progress Bar
                            location.href="javascript:progressTheBar(" + allFreeProducts.length + "," + howManyFreeProductsYouWant + ")";
                        } else {
                            console.log(allFreeProducts);
                            if (justFoundItems == true) {   // implemented, so that scrolling to the top top is guarenteed in terms of time issues
                                window.scrollTo(0, 0);
                                justFoundItems = false;
                            } else {
                                deleteListElements(getProductRows, 0, howManyRowsNeeded);   // delete all the items in the rows needed
                                //debugger;
                                for (let i = 0; i < howManyRowsNeeded; i++) {   // for each row ...
                                    for (let j = i * productsPerRow; j < i * productsPerRow + productsPerRow; j++) {    // ... append free products
                                        if ( j < allFreeProducts.length) {   // if last row wouldnt be fully filled (e.g. 18 items, 4 rows -> 2 spots empty)
                                            getProductRows[i].appendChild(allFreeProducts[j]);
                                        }
                                    }
                                    // place the "show more products" button at the end
                                    if ( (i + 1) == howManyRowsNeeded) {
                                        let divLoadMore = document.getElementById('load-more-div');
                                        let x = getProductRows[i].parentNode;
                                        x.appendChild(divLoadMore);

                                    }
                                };

                                //Allow filter-algorithm to be run again
                                allowRun = true;

                                console.log("Congrats, the free products are shown on top. Probs to the developers :)") // it is what it is
                                location.href="javascript:dismissTheBar(); void 0";     // swerve, progress bar
                            clearInterval(hure);
                        }
                        }
                    }, 2000);   // wait 2 seconds after scrolling, to make sure everything reloaded



                }).catch(err => {
                    // handle error
                });

                // show the popup boxes on the right side that tell the user to click the damn icon in the chrome toolbar:
                // show progress bar, progressing when free item found;
                location.href="javascript:closeAllDialogs(); void 0";
                fetch(chrome.runtime.getURL('src/popup-right-notice-new-tab.html'))
                    .then(response => response.text())
                    .then(data => {
                        $(  "body" ).prepend(data);
                    })
                    // show the "show more" button, place it in loop above
                fetch(chrome.runtime.getURL('src/load-more-products.html'))
                    .then(response => response.text())
                    .then(data => {
                        $(  "body" ).prepend(data);
                    })

        } else { console.log('bitch you thought') }
        console.log(request); //log in general site inspector
        sendResponse({
            "farewell": "hola"
        });
    });

/* Random code for testing and trial and error by Momo/Burli */



function tellProgressBarToMoveOn() {

}

//gets a array of all products and returns all the free products
function filterElements(_singleProductsArray) {

    let onlyFreeProductsArray = [];
    //Get Prices of Products
    for (let i = 0; i < _singleProductsArray.length; i++) {
        let = itemPriceText = _singleProductsArray[i].getElementsByClassName('FeedItemV2__ActualPrice-vf3155-9')[0].innerText;
        itemPriceText = itemPriceText.match(/\d/); // clean it up
        // if item has no numbers in price text ( "Kostenlos, Free", ... ) --> add it:
        if (isNaN(parseInt(itemPriceText))) {
            onlyFreeProductsArray.push(_singleProductsArray[i]);
        }
    }
    return onlyFreeProductsArray;
}

//util sleep function, not needed --> done via interval
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}



//Returns all the single free products in one array:
function grabFreeProducts() {
    let singleProductsArray = document.getElementsByClassName('FeedItemV2__Wrapper-vf3155-0');
    let myFreeStuff = filterElements(singleProductsArray);
    console.log("how many free products found? " + myFreeStuff.length);
    if (myFreeStuff.length < howManyFreeProductsYouWant) {
        window.scrollBy(0, document.body.scrollHeight);
        /*    sleep(1000).then(function() { // unsauber as fuck, multiple threads? prolly, implemented in a interval now
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

// To-Do: User Input in Extension Dialog:
let howManyFreeProductsYouWant = 20;
let howManyRowsNeeded = Math.ceil(howManyFreeProductsYouWant / productsPerRow) // how many rows are gonna be filled with free items
let justFoundItems = true; // if enough items are found, needed once for scrolling to top in interval

let allFreeProducts = [];
let hure = setInterval(function() {
    if (allFreeProducts.length < howManyFreeProductsYouWant) {
        allFreeProducts = grabFreeProducts(); // get the free products from all the products
        // To-Do: Progress Progress Bar
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
            };
            console.log("Congrats, the free products are shown on top. Probs to the developers :)")
        clearInterval(hure);
    }
    }
}, 2000);   // wait 2 seconds after scrolling, to make sure everything reloaded

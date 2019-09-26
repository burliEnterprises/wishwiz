
//Gets All Elements and filters
function filterElements(_singleProductsArray) {

    let pricesArray = []
    let onlyFreeProductsArray = [];
    let itemPriceText;

    //Get Prices of Products
    for (let i = 0; i < _singleProductsArray.length; i++) {
        itemPriceText = _singleProductsArray[i].getElementsByClassName('FeedItemV2__ActualPrice-vf3155-9')[0].innerText;
        itemPriceText = itemPriceText.match(/\d/);    // clean it up
        // if item has no numbers in price text ( "Kostenlos, Free", ... ) --> add it:
        if (isNaN(parseInt(itemPriceText))) {
            onlyFreeProductsArray.push(_singleProductsArray[i]);
        }
    }
    return onlyFreeProductsArray;
    }

//util sleep function
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}



function grabFreeProducts() {
    //Get All Single Products in one array:
    let singleProductsArray = document.getElementsByClassName('FeedItemV2__Wrapper-vf3155-0');
    let myFreeStuff = filterElements(singleProductsArray);
    console.log("how many free products found? " + myFreeStuff.length);
    if (myFreeStuff.length < howManyFreeProductsYouWant) {
        window.scrollBy(0,document.body.scrollHeight);
        sleep(200).then(function() { // unsauber as fuck, multiple threads? prolly
            console.log("Total Height: " +   document.body.scrollHeight);
            grabFreeProducts();
        })
    };
    return myFreeStuff;

}


let howManyFreeProductsYouWant = 10;
// how many products in one row? --> responsiv shit
let getProductRows = document.getElementsByClassName('ProductGrid__ProductGridRow-sc-1luslvl-2');
console.log(getProductRows[0]);
let productsPerRow = getProductRows[0].childElementCount;
let allFreeProducts = grabFreeProducts();     // get the free products from all the products
console.log(allFreeProducts);
window.scrollTo(0, 0);
for (let i = 0; i < howManyFreeProductsYouWant / 4; i++) {  // modulo +1, bishernur ganze reihen berücksichtigt
    getProductRows[i].innerHTML = "";
    for (let j = 0; j < productsPerRow; j++) {
        getProductRows[i].appendChild(allFreeProducts[i+j]);
    }
}

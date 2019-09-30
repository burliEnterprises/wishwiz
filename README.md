# The WishWiz

![;)](https://www.azquotes.com/picture-quotes/quote-the-best-things-in-life-are-free-luther-vandross-64-40-14.jpg)

Cheap products are awesome. But what's even better than cheap products? Free products.
That's why we decided to make _The WishWiz_, a Chrome extension that finds all the free products from your feed or search on the marketplace Wish.

------------------------------------------------------------

## ToDo:

- How many Items are shown? Reloading when user scrolls? Button "show more"?

-------------------------------------------------------------

## Resolved:

- Don't override all elements when new ones are found in getFreeStuff(), add them to the List
--> otherwise DOM gets too big and elements on top are left out when new ones join the List

- only enable extension on the site wish.com

- Site needs to reload for extension to more --> changed Manifest, working now

- price filter --> user decides the max. price

------------------------------------------------------------

##Limits:

- It is not possible to automatically open the extension dialog when "Wish" is loaded.
--> Google doesn't allow this:
https://stackoverflow.com/questions/14272707/google-chrome-extension-how-to-generate-a-browser-action-without-clicking

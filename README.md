# The WishWiz
Cheap products are awesome. But what's even better than cheap products? Free products.
That's why we decided to make _The WishWiz_, a Chrome extension that finds all the free products from your feed or search on the marketplace Wish.

------------------------------------------------------------

## ToDo:
- item range, user decides how many products are shown(?)

-------------------------------------------------------------

## Resolved:

- Don't override all elements when new ones are found in getFreeStuff(), add them to the List
--> otherwise DOM gets too big and elements on top are left out when new ones join the List

- only enable extension on the site wish.com

-
- price filter, only free products searched for by now

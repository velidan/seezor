# Seezor (see & visor = seezor)
The app to fetch films data from omdb service

I've done it in the demo purpose. You can see that the javascript core has been developed by mixing of the "old-way" es5 standard and the es6 one. It has been done because I'd like to show that I've enough skills to handle both cases.

# How to use
Just type some film name into the search input and press the Search button or hit Enter

# This app based on:
+ Grid layout
+ CSS variables
+ Web components
+ Event driven architecture
+ Modular strategy

#Browser support
Latest
+ Chrome
+ Mozille
+ Opera

IE doesn't support WebComponent so the app won't work in it, hovever I show in some places that it's possible to support even IE with some fallback if it's necessary (in case of events, htpp etc.) 

# Additional features
I didn't do them because I spent a lot of time so I didn't have more.

Here are the algorytms to solve these tasks:
1) Partial loading when the user scrolls down (loading more items dynamically).

   How:
   - add scrol lsitener to the document
   - calculate the shift betheen client and scroll height and if positive
   - do a request to the server to fetch next portion of data and show some loader
   - hide loader, concat prev and new data then re-render content

    Btw it's important to use debounce to avoid multiple handler execution during scroll

2) Manual pagination to allow users to browse through more movies (select page 2,
page 3, etc)
   How:
   - implement UI (some buttons etc.)
   - implement some service where current page, itemsLimit etc. should be stored
   - fetch total items count, divide it to itemsLimit and get the amount of pages
   - on Next/Prevclick - add/substract  - 1 of the current page. Do a request, show loader.
   - update data (without concat) and re-render content

3) Clicking on a movie displays additional information of the movie.
   How:
   - implement UI (some popup)
   - implement some class/function which will parse the Film data and fill the popup by it
   - add some Show class with funcy animation
   - add close button or implement click listener out of the popup to auto close it

4) Play a sample movie when clicking on an item in the list. You can use the following
sample movie:
   How:
   - use HTML5 video tag

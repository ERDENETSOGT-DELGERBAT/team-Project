# What's Cooking? — Recipe Discovery Website

## Project overview

What's Cooking? is a free, browser-based recipe discovery website for people who want practical ideas for everyday meals. Visitors can browse a collection of recipes, search by recipe name or ingredient, explore meal categories, and open each recipe for its ingredients and cooking instructions. They can also save favourites and return to them later.

## Project objective

The objective is to make finding and following everyday recipes straightforward. The project demonstrates front-end web development through data-driven page rendering, interactive search and filters, recipe detail views, browser storage, responsive layouts, and accessible navigation.

## Main features

- **Recipe catalogue:** 33 recipes across breakfast, lunch, dinner, and dessert.
- **Search and browsing:** Search recipe names, descriptions, tags, and ingredients; browse by meal category.
- **Filters and sorting:** Narrow results by cooking time, difficulty, and food preference, or sort by preparation time and name.
- **Recipe details:** View ingredients, serving information, step-by-step instructions, and a cooking tip.
- **Adjustable servings:** Change the serving count and automatically scale ingredient quantities.
- **Ingredient checklist:** Tick off ingredients while preparing a dish.
- **Favourites:** Save and remove recipes and view the saved collection on a dedicated page.
- **Recently viewed:** Return to recipes opened earlier in the same browser.
- **Share and print:** Share a recipe link, copy its URL, or print the recipe.
- **Responsive and accessible design:** Use the site on desktop and mobile, with semantic page structure, keyboard-accessible controls, visible focus styles, and a skip link.

## How it works

Visitors start on the Discover page and use the catalogue, search, categories, filters, or sorting controls to find a recipe. Selecting a recipe opens its details, where visitors can adjust servings, check off ingredients, read the method, save it to Favourites, share it, or print it. The Favourites page displays saved recipes.

## Technology and data

The website uses **HTML5, CSS3, and vanilla JavaScript**. Recipe information is stored in the local `recipes.js` data file, so the catalogue does not depend on a third-party recipe API. Favourites and recently viewed recipes are saved with the browser's `localStorage`; this information stays in the same browser and is not synchronized between devices. The site does not require accounts, a database, a backend server, or AI services.

Food photographs and web fonts are loaded from external providers, so an internet connection is needed for those visual assets. The chocolate mug cake photograph is credited to [Dicas e Dicas](https://www.dicasedicas.com.br/receita/bolo-de-caneca-micro-ondas).

## Project files

- **`index.html`** — Homepage, Discover navigation, recipe catalogue, search and filter controls, and recipe detail dialog.
- **`favorites.html`** — Dedicated page showing the visitor's saved recipes.
- **`styles.css`** — Visual design, responsive layouts, interactive states, accessibility focus styles, and print styling.
- **`recipes.js`** — Local recipe data, including descriptions, categories, ingredients, instructions, tips, dietary tags, and image references.
- **`app.js`** — Catalogue rendering, search, filtering, sorting, recipe details, serving adjustment, ingredient checklists, favourites, recently viewed items, sharing, and printing.

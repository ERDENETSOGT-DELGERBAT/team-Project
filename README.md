# What's Cooking? — Interactive Recipe Book

## Project overview

What's Cooking? is a free, browser-based recipe discovery website designed to help visitors find everyday meals and follow clear cooking instructions. It presents a catalogue of recipes in a simple, food-focused interface. Visitors can browse by meal category, search for recipes or ingredients, open a recipe for its full details, and save dishes they want to make later.

The project is intended for anyone looking for practical meal inspiration, from people who are new to cooking to home cooks looking for another everyday idea. The site does not use AI-generated recommendations, user accounts, or a paid subscription.

## Main features

- **Recipe catalogue:** 33 recipes covering breakfast, lunch, dinner, and dessert.
- **Search:** Find recipes by title, category, description, tags, or ingredient.
- **Category browsing:** Narrow the catalogue by breakfast, lunch, dinner, or dessert.
- **Additional filters:** Filter by cooking time, difficulty, and food preference.
- **Sorting:** View recipes in the recommended order, by cooking time, or alphabetically.
- **Recipe details:** Open a recipe to see its description, ingredients, servings, step-by-step instructions, and a cooking tip.
- **Adjustable servings:** Increase or decrease the number of servings and scale ingredient quantities accordingly.
- **Ingredient checklist:** Tick off ingredients while preparing a recipe.
- **Favourites:** Save and remove recipes, then view the saved collection on a dedicated Favourites page.
- **Recently viewed:** Revisit recipes opened during an earlier visit in the same browser.
- **Share and print:** Use the browser's sharing options where available, copy a recipe link, or print a recipe.
- **Responsive and accessible interface:** The layout adapts to smaller screens and includes semantic page structure, keyboard-accessible controls, visible focus styles, and a skip link.

## How the website works

Visitors begin on the Discover page, where they can browse the full recipe collection or use search, filters, and sorting to find something specific. Selecting a recipe opens its detail view. From there, visitors can adjust servings, check off ingredients, read the method and cooking tip, save the recipe, share it, or print it.

The My Favourites navigation link opens a separate page in the same browser tab. That page displays recipes saved from the main catalogue.

## Technology

The website is built with **HTML5, CSS3, and vanilla JavaScript**. It is a static front-end project and does not require a server, database, account system, or AI service. Browser `localStorage` is used to retain favourites and recently viewed recipes on the same browser and website origin. Saved data is local to that browser and is not synchronized between devices.

Recipe information is stored in a local JavaScript data file, so the catalogue can be maintained without a third-party recipe API. Food photography and web fonts are loaded from external image and font providers. An internet connection is therefore needed for those visual assets. The chocolate mug cake photograph is sourced from the first image result for a chocolate mug cake search on Dicas e Dicas (https://www.dicasedicas.com.br/receita/bolo-de-caneca-micro-ondas).

## Project files

- **`index.html`** — Homepage, Discover navigation, recipe catalogue, search and filter controls, and recipe detail dialog.
- **`favorites.html`** — Dedicated page for the visitor's saved recipes.
- **`styles.css`** — Visual design, responsive layouts, interactive states, accessibility focus styles, and print styling.
- **`recipes.js`** — Local data for the recipe catalogue, including recipe descriptions, categories, ingredients, instructions, tips, dietary tags, and image references.
- **`app.js`** — Catalogue rendering, search, filtering, sorting, recipe details, serving adjustment, ingredient checkboxes, favourites, recently viewed items, sharing, and printing.

## Project objective

The objective is to provide a straightforward and welcoming place to discover recipes and keep track of meals worth making again. The project demonstrates front-end web development through data-driven content rendering, DOM interaction, browser storage, responsive styling, and accessible navigation.

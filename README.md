# What's Cooking?

A responsive recipe-discovery website built with HTML, CSS and JavaScript. It is designed to run as a static site on GitHub Pages or similar hosting; no server, account system or API key is required.

## Files

- `index.html` — page structure and content sections
- `styles.css` — responsive visual design and recipe detail styling
- `recipes.js` — recipe catalogue data (33 recipes)
- `app.js` — search, filters, recipe dialogs, favourites, recently viewed, sharing and printing

Keep all four files in the same folder. The asset references use relative paths (`./...`) so the site works from a GitHub Pages repository URL as well as a custom domain. The `?v=4` suffix on the CSS and JavaScript URLs helps browsers fetch the updated versions after deployment.

## Features

- Browse 33 recipes across breakfast, lunch, dinner and dessert
- Search by recipe title, description, category, tags or ingredients
- Filter by category, cooking time, difficulty and food preference
- Sort by recommended order, quickest, longest or name
- Open recipe details with ingredients and cooking instructions
- Adjust serving size and tick ingredients while cooking
- Save and remove favourites; open the dedicated Favourites view
- Recently viewed recipes
- Share a direct recipe link and print a recipe
- Keyboard-friendly navigation, focus styles and responsive layouts

Favourites and recently viewed recipes are stored in the visitor's browser using `localStorage`. They do not sync across devices or browsers.

## Deploy on GitHub Pages

1. Extract the ZIP.
2. Upload the **contents** of the extracted folder (not the enclosing folder) to the repository's publishing root.
3. Make sure `index.html`, `styles.css`, `recipes.js` and `app.js` sit beside each other.
4. Commit the changes. Keep the existing GitHub Pages branch/folder setting.
5. Open the site and hard-refresh once (`Ctrl + Shift + R`) after the deployment completes.

If the page appears unstyled, check that `styles.css` is beside `index.html`. If recipe cards do not appear, check that `recipes.js` and `app.js` are beside `index.html` and that their spelling/capitalization matches exactly.

# What's Cooking?

A responsive recipe catalogue made with HTML, CSS and vanilla JavaScript. It is designed to run as a static site on GitHub Pages or another static host.

## Files

- `index.html` — page structure and dialog container
- `styles.css` — layout, colors, responsive styles and print styles
- `recipes.js` — the recipe collection (33 recipes)
- `app.js` — search, filters, favorites, recently viewed, recipe details, servings, sharing and printing

## Features

- Browse 33 recipes by category
- Search recipe names, descriptions, tags and ingredients
- Filter by category, cooking time, difficulty and diet
- Sort by recommended order, time or name
- View ingredients and step-by-step instructions
- Adjust ingredient amounts by changing servings
- Tick ingredients off while cooking
- Read a recipe-specific cooking tip
- Save favorites and view them in a separate tab
- Keep a recently viewed list in the same browser
- Share a recipe using a URL that opens that recipe directly
- Print an individual recipe
- Keyboard-accessible navigation and responsive mobile layout

## Run locally

Open `index.html` in a browser. No package installation or build step is required.

## Publish with GitHub Pages

Upload all four files (`index.html`, `styles.css`, `recipes.js`, `app.js`) to the repository root. Commit the files, then open **Settings → Pages** and select **Deploy from a branch**, branch `main`, folder `/(root)`.

Favorites and recently viewed recipes are stored in the visitor's browser using `localStorage`; they do not synchronize between devices. Recipe photography and the selected web fonts load from external hosts, so those assets require an internet connection. The site itself does not use AI, user accounts, a database or a server.

# What's Cooking? — Recipe discovery website

A responsive, browser-based recipe catalogue built with plain HTML, CSS and JavaScript. No build tools, API keys, server or database are required.

## Features

- Browse a curated collection of 13 recipes
- Search by recipe name, description, category or ingredient
- Filter by breakfast, lunch, dinner and sweet recipes
- Open a recipe to view its ingredients and step-by-step instructions
- Adjust ingredient quantities by changing the serving count
- Save and remove favourites
- View a separate favourites collection
- Favourites are stored in the visitor's browser with `localStorage`
- Responsive layout, keyboard-friendly controls, skip link and reduced-motion support

## Run locally

Open `index.html` in a modern browser. For local development, you can also use VS Code Live Server.

## Publish with GitHub Pages

1. Upload `index.html`, `styles.css`, `app.js` and `README.md` to the root of your repository.
2. In GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Choose the `main` branch and `/ (root)`, then save.
5. Wait for GitHub Pages to publish the site. The public URL will appear in the Pages settings.

The site is static and works on GitHub Pages or any other static hosting provider. Recipe images and web fonts are loaded from external providers, so visitors need an internet connection to see those assets. Favourites are saved locally in each visitor's own browser and are not shared between devices.

## Project structure

```text
whats-cooking/
├── index.html
├── styles.css
├── app.js
└── README.md
```

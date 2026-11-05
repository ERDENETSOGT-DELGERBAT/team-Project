const recipes = Array.isArray(window.RECIPES) ? window.RECIPES : [];

const FAVOURITES_KEY = "whats-cooking-favourites-v2";
const RECENT_KEY = "whats-cooking-recent-v1";

const recipeList = document.getElementById("recipe-list");
const recentList = document.getElementById("recent-list");
const recentSection = document.getElementById("recent-section");
const emptyState = document.getElementById("empty-state");
const searchInput = document.getElementById("recipe-search");
const clearSearch = document.getElementById("clear-search");
const resultsLabel = document.getElementById("results-label");
const catalogHeading = document.getElementById("catalog-heading");
const catalogIntro = document.getElementById("catalog-intro");
const dialog = document.getElementById("recipe-dialog");
const detailContainer = document.getElementById("recipe-detail");
const actionStatus = document.getElementById("action-status");

let selectedCategory = "All";
let currentView = location.hash === "#saved" ? "saved" : "discover";
let activeRecipeId = null;
let currentServings = 2;
let checkedIngredients = new Set();
let favourites = readStorage(FAVOURITES_KEY, readStorage("whats-cooking-favourites-v1", [])).filter(id => recipes.some(recipe => recipe.id === id));
let recentlyViewed = readStorage(RECENT_KEY, []).filter(id => recipes.some(recipe => recipe.id === id));
// Migrate saved recipes from the first version so existing favourites are kept.
writeStorage(FAVOURITES_KEY, favourites);

function readStorage(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "null");
    return Array.isArray(value) ? value : fallback;
  } catch (error) {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // The site remains usable for the current visit if storage is unavailable.
  }
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function updateFavouriteCount() {
  document.getElementById("favourite-count").textContent = String(favourites.length);
}

function setView(view, updateHash = true, shouldScroll = true) {
  currentView = view === "saved" ? "saved" : "discover";
  if (updateHash) {
    const nextHash = currentView === "saved" ? "#saved" : "#discover";
    if (location.hash !== nextHash) history.replaceState(null, "", nextHash);
  }

  document.querySelectorAll("[data-view-link]").forEach(link => {
    const active = link.dataset.viewLink === currentView;
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });

  const saved = currentView === "saved";
  catalogHeading.textContent = saved ? "Your favourites" : "All recipes";
  catalogIntro.textContent = saved ? "Recipes you've saved." : "Search by recipe, ingredient or category.";
  recentSection.hidden = saved || recentlyViewed.length === 0;
  renderRecent();
  renderRecipes();

  if (shouldScroll) document.getElementById("recipe-grid").scrollIntoView({ behavior: "smooth", block: "start" });
}

function getVisibleRecipes() {
  let visible = currentView === "saved"
    ? recipes.filter(recipe => favourites.includes(recipe.id))
    : [...recipes];

  const query = searchInput.value.trim().toLowerCase();
  const time = document.getElementById("time-filter").value;
  const difficulty = document.getElementById("difficulty-filter").value;
  const diet = document.getElementById("diet-filter").value;
  const sort = document.getElementById("sort-filter").value;

  if (selectedCategory !== "All") visible = visible.filter(recipe => recipe.category === selectedCategory);
  if (query) {
    visible = visible.filter(recipe => {
      const searchable = [
        recipe.title, recipe.category, recipe.description,
        ...(recipe.tags || []),
        ...recipe.ingredients.map(ingredient => ingredient.item)
      ].join(" ").toLowerCase();
      return searchable.includes(query);
    });
  }
  if (time === "under20") visible = visible.filter(recipe => recipe.time < 20);
  if (time === "20to40") visible = visible.filter(recipe => recipe.time >= 20 && recipe.time <= 40);
  if (time === "over40") visible = visible.filter(recipe => recipe.time > 40);
  if (difficulty !== "any") visible = visible.filter(recipe => recipe.difficulty === difficulty);
  if (diet !== "any") visible = visible.filter(recipe => (recipe.dietary || []).includes(diet));

  if (sort === "quickest") visible.sort((a, b) => a.time - b.time);
  if (sort === "longest") visible.sort((a, b) => b.time - a.time);
  if (sort === "az") visible.sort((a, b) => a.title.localeCompare(b.title));
  return visible;
}

function createRecipeCard(recipe, compact = false) {
  const saved = favourites.includes(recipe.id);
  return `
    <article class="recipe-card${compact ? " compact-card" : ""}">
      <div class="card-image-wrap">
        <button class="card-image-button" type="button" data-open-recipe="${escapeHTML(recipe.id)}" aria-label="View ${escapeHTML(recipe.title)} recipe">
          <img src="${escapeHTML(recipe.image)}" alt="${escapeHTML(recipe.alt)}" loading="lazy">
        </button>
        <span class="card-tag">${escapeHTML(recipe.category)}</span>
        <button class="favourite-button ${saved ? "is-saved" : ""}" type="button" data-favourite="${escapeHTML(recipe.id)}" aria-label="${saved ? "Remove" : "Save"} ${escapeHTML(recipe.title)} ${saved ? "from" : "to"} favourites" aria-pressed="${saved}"><span aria-hidden="true">${saved ? "♥" : "♡"}</span></button>
      </div>
      <div class="card-meta"><span>${recipe.time} min</span><span class="meta-dot" aria-hidden="true"></span><span>${escapeHTML(recipe.difficulty)}</span></div>
      <button class="card-title-button" type="button" data-open-recipe="${escapeHTML(recipe.id)}">${escapeHTML(recipe.title)}</button>
      ${compact ? "" : `<p class="card-description">${escapeHTML(recipe.description)}</p>`}
    </article>
  `;
}

function renderRecipes() {
  const visible = getVisibleRecipes();
  recipeList.innerHTML = visible.map(recipe => createRecipeCard(recipe)).join("");

  const countText = `${visible.length} ${visible.length === 1 ? "recipe" : "recipes"}`;
  resultsLabel.textContent = countText;
  document.getElementById("recipe-total").textContent = currentView === "saved"
    ? `${favourites.length} saved`
    : `${recipes.length} recipes`;

  const isEmpty = visible.length === 0;
  emptyState.hidden = !isEmpty;
  recipeList.hidden = isEmpty;
  if (isEmpty && currentView === "saved") {
    document.getElementById("empty-title").textContent = "No favourites saved yet";
    document.getElementById("empty-description").textContent = "Use the heart on a recipe card to save it here.";
  } else {
    document.getElementById("empty-title").textContent = "No recipes found";
    document.getElementById("empty-description").textContent = "Try changing your search or filters.";
  }
  updateFavouriteCount();
}

function renderRecent() {
  const recent = recentlyViewed
    .filter(id => recipes.some(recipe => recipe.id === id))
    .slice(0, 4)
    .map(id => recipes.find(recipe => recipe.id === id));
  recentSection.hidden = currentView === "saved" || recent.length === 0;
  recentList.innerHTML = recent.map(recipe => createRecipeCard(recipe, true)).join("");
}

function toggleFavourite(id) {
  if (favourites.includes(id)) favourites = favourites.filter(item => item !== id);
  else favourites = [id, ...favourites];
  writeStorage(FAVOURITES_KEY, favourites);
  renderRecipes();
  renderRecent();
  if (activeRecipeId === id && dialog.open) updateDialogFavouriteButton();
}

function addToRecentlyViewed(id) {
  recentlyViewed = [id, ...recentlyViewed.filter(item => item !== id)].slice(0, 8);
  writeStorage(RECENT_KEY, recentlyViewed);
  renderRecent();
}

function formatAmount(amount) {
  if (amount === null || amount === undefined || amount === "") return "";
  if (typeof amount !== "number") return String(amount);
  const whole = Math.floor(amount);
  const fraction = amount - whole;
  const common = [[0.125, "⅛"], [0.25, "¼"], [0.333, "⅓"], [0.375, "⅜"], [0.5, "½"], [0.625, "⅝"], [0.667, "⅔"], [0.75, "¾"], [0.875, "⅞"]];
  const match = common.find(([value]) => Math.abs(value - fraction) < 0.035);
  if (!match) return Number(amount.toFixed(1)).toString();
  return whole ? `${whole}${match[1]}` : match[1];
}

function ingredientText(ingredient, multiplier) {
  const amount = typeof ingredient.amount === "number"
    ? formatAmount(ingredient.amount * multiplier)
    : ingredient.amount;
  const prefix = amount ? `${amount}${ingredient.unit ? ` ${ingredient.unit}` : ""} ` : "";
  return `${prefix}${ingredient.item}`;
}

function openRecipe(id) {
  const recipe = recipes.find(item => item.id === id);
  if (!recipe) return;
  activeRecipeId = id;
  currentServings = recipe.servings;
  checkedIngredients = new Set();
  addToRecentlyViewed(id);
  renderRecipeDetail(recipe);
  if (!dialog.open) dialog.showModal();
  document.body.classList.add("dialog-open");
  actionStatus.textContent = "";
}

function renderRecipeDetail(recipe) {
  const multiplier = currentServings / recipe.servings;
  detailContainer.innerHTML = `
    <div class="detail-hero">
      <img class="detail-hero-image" src="${escapeHTML(recipe.image)}" alt="${escapeHTML(recipe.alt)}">
      <div class="detail-intro">
        <p class="detail-category">${escapeHTML(recipe.category)} · ${recipe.time} minutes · ${escapeHTML(recipe.difficulty)}</p>
        <h2 id="dialog-title">${escapeHTML(recipe.title)}</h2>
        <p class="detail-description">${escapeHTML(recipe.description)}</p>
        <div class="detail-meta"><span>${recipe.ingredients.length} ingredients</span><span>${currentServings} servings</span></div>
        <div class="detail-actions">
          <button type="button" class="detail-action primary ${favourites.includes(recipe.id) ? "is-saved" : ""}" data-action="favourite" aria-pressed="${favourites.includes(recipe.id)}">${favourites.includes(recipe.id) ? "♥ Saved" : "♡ Save recipe"}</button>
          <button type="button" class="detail-action" data-action="share">Share recipe</button>
          <button type="button" class="detail-action" data-action="print">Print</button>
        </div>
      </div>
    </div>
    <div class="detail-body">
      <section aria-labelledby="ingredients-heading">
        <h3 id="ingredients-heading">Ingredients</h3>
        <div class="servings-control">
          <span>Servings</span>
          <div class="servings-buttons">
            <button type="button" data-servings="-1" aria-label="Decrease servings" ${currentServings <= 1 ? "disabled" : ""}>−</button>
            <strong aria-live="polite">${currentServings}</strong>
            <button type="button" data-servings="1" aria-label="Increase servings" ${currentServings >= 8 ? "disabled" : ""}>+</button>
          </div>
        </div>
        <ul class="ingredient-list">${recipe.ingredients.map((ingredient, index) => `
          <li><label class="ingredient-label"><input class="ingredient-check" type="checkbox" data-ingredient="${index}" ${checkedIngredients.has(index) ? "checked" : ""}><span>${escapeHTML(ingredientText(ingredient, multiplier))}</span></label></li>
        `).join("")}</ul>
      </section>
      <section aria-labelledby="method-heading">
        <h3 id="method-heading">Instructions</h3>
        <ol class="instructions-list">${recipe.instructions.map(step => `<li>${escapeHTML(step)}</li>`).join("")}</ol>
      </section>
    </div>
    <aside class="cooking-tip" aria-labelledby="tip-heading">
      <h3 id="tip-heading">Cooking tip</h3>
      <p>${escapeHTML(recipe.tip || "Taste and adjust the seasoning before serving.")}</p>
    </aside>
  `;
}

function updateDialogFavouriteButton() {
  const button = detailContainer.querySelector('[data-action="favourite"]');
  if (!button || !activeRecipeId) return;
  const saved = favourites.includes(activeRecipeId);
  button.classList.toggle("is-saved", saved);
  button.setAttribute("aria-pressed", String(saved));
  button.textContent = saved ? "♥ Saved" : "♡ Save recipe";
}

async function shareRecipe(recipe) {
  const shareUrl = new URL(window.location.href);
  shareUrl.hash = "discover";
  shareUrl.searchParams.set("recipe", recipe.id);
  const shareData = { title: `${recipe.title} | What's Cooking?`, text: recipe.description, url: shareUrl.toString() };
  try {
    if (navigator.share) {
      await navigator.share(shareData);
      actionStatus.textContent = "Share menu opened.";
      return;
    }
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(shareUrl.toString());
    } else {
      const temporary = document.createElement("textarea");
      temporary.value = shareUrl.toString();
      temporary.setAttribute("readonly", "");
      temporary.style.position = "absolute";
      temporary.style.left = "-9999px";
      document.body.appendChild(temporary);
      temporary.select();
      document.execCommand("copy");
      temporary.remove();
    }
    actionStatus.textContent = "Recipe link copied.";
  } catch (error) {
    if (error.name !== "AbortError") actionStatus.textContent = "Could not share this recipe from this browser.";
  }
}

function resetFilters() {
  selectedCategory = "All";
  searchInput.value = "";
  clearSearch.hidden = true;
  document.getElementById("time-filter").value = "any";
  document.getElementById("difficulty-filter").value = "any";
  document.getElementById("diet-filter").value = "any";
  document.getElementById("sort-filter").value = "featured";
  document.querySelectorAll("[data-category]").forEach(button => {
    const active = button.dataset.category === "All";
    button.classList.toggle("is-selected", active);
    button.setAttribute("aria-pressed", String(active));
  });
  renderRecipes();
}

function closeRecipeDialog() {
  if (dialog.open) dialog.close();
  document.body.classList.remove("dialog-open");
  activeRecipeId = null;
  actionStatus.textContent = "";
}

// Main navigation
for (const link of document.querySelectorAll("[data-view-link]")) {
  link.addEventListener("click", event => {
    event.preventDefault();
    setView(link.dataset.viewLink);
  });
}

window.addEventListener("hashchange", () => {
  const requested = location.hash === "#saved" ? "saved" : "discover";
  if (requested !== currentView) setView(requested, false, false);
});

// Category, search and advanced filters
for (const button of document.querySelectorAll("[data-category]")) {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.category;
    document.querySelectorAll("[data-category]").forEach(chip => {
      const active = chip === button;
      chip.classList.toggle("is-selected", active);
      chip.setAttribute("aria-pressed", String(active));
    });
    renderRecipes();
  });
}

searchInput.addEventListener("input", () => {
  clearSearch.hidden = searchInput.value.length === 0;
  renderRecipes();
});
document.getElementById("search-form").addEventListener("submit", event => event.preventDefault());
clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  clearSearch.hidden = true;
  renderRecipes();
  searchInput.focus();
});
for (const id of ["time-filter", "difficulty-filter", "diet-filter", "sort-filter"]) {
  document.getElementById(id).addEventListener("change", renderRecipes);
}
document.getElementById("reset-filters").addEventListener("click", resetFilters);
document.getElementById("reset-empty").addEventListener("click", resetFilters);

// Recipe cards in the main catalogue and recently-viewed row
function handleCardClick(event) {
  const favouriteButton = event.target.closest("[data-favourite]");
  if (favouriteButton) {
    toggleFavourite(favouriteButton.dataset.favourite);
    return;
  }
  const openButton = event.target.closest("[data-open-recipe]");
  if (openButton) openRecipe(openButton.dataset.openRecipe);
}
recipeList.addEventListener("click", handleCardClick);
recentList.addEventListener("click", handleCardClick);

// Recipe detail actions
 detailContainer.addEventListener("click", event => {
  const actionButton = event.target.closest("[data-action]");
  if (actionButton && activeRecipeId) {
    const recipe = recipes.find(item => item.id === activeRecipeId);
    if (actionButton.dataset.action === "favourite") toggleFavourite(activeRecipeId);
    if (actionButton.dataset.action === "share") shareRecipe(recipe);
    if (actionButton.dataset.action === "print") window.print();
    return;
  }

  const servingsButton = event.target.closest("[data-servings]");
  if (servingsButton && activeRecipeId) {
    const recipe = recipes.find(item => item.id === activeRecipeId);
    currentServings = Math.min(8, Math.max(1, currentServings + Number(servingsButton.dataset.servings)));
    renderRecipeDetail(recipe);
  }
});

detailContainer.addEventListener("change", event => {
  const ingredientInput = event.target.closest("[data-ingredient]");
  if (!ingredientInput) return;
  const index = Number(ingredientInput.dataset.ingredient);
  if (ingredientInput.checked) checkedIngredients.add(index);
  else checkedIngredients.delete(index);
});

document.getElementById("close-dialog").addEventListener("click", closeRecipeDialog);
dialog.addEventListener("click", event => {
  if (event.target === dialog) closeRecipeDialog();
});
dialog.addEventListener("close", () => {
  document.body.classList.remove("dialog-open");
  activeRecipeId = null;
});

// Open a recipe directly when a shared URL contains ?recipe=<id>.
document.getElementById("current-year").textContent = String(new Date().getFullYear());
setView(currentView, false, false);
const sharedRecipeId = new URLSearchParams(window.location.search).get("recipe");
if (sharedRecipeId && recipes.some(recipe => recipe.id === sharedRecipeId)) {
  openRecipe(sharedRecipeId);
}

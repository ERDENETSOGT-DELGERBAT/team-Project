(() => {
  "use strict";

  const recipes = Array.isArray(window.RECIPES) ? window.RECIPES : [];
  const FAVOURITES_KEY = "whats-cooking-favourites-v2";
  const OLD_FAVOURITES_KEY = "whats-cooking-favourites-v1";
  const RECENT_KEY = "whats-cooking-recent-v1";

  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const recipeList = $("#recipe-list");
  const recentList = $("#recent-list");
  const recentSection = $("#recent-section");
  const emptyState = $("#empty-state");
  const loadError = $("#load-error");
  const searchInput = $("#recipe-search");
  const clearSearch = $("#clear-search");
  const resultsLabel = $("#results-label");
  const catalogHeading = $("#catalog-heading");
  const catalogIntro = $("#catalog-intro");
  const dialog = $("#recipe-dialog");
  const detailContainer = $("#recipe-detail");
  const actionStatus = $("#action-status");

  function readStorage(key) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || "[]");
      return Array.isArray(value) ? value : [];
    } catch (error) {
      return [];
    }
  }

  function writeStorage(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch (error) { /* The site still works for this visit if storage is disabled. */ }
  }

  const knownIds = new Set(recipes.map(recipe => recipe.id));
  const favourites = new Set([
    ...readStorage(FAVOURITES_KEY),
    ...readStorage(OLD_FAVOURITES_KEY)
  ].filter(id => knownIds.has(id)));
  const recentlyViewed = readStorage(RECENT_KEY).filter(id => knownIds.has(id));
  writeStorage(FAVOURITES_KEY, [...favourites]);

  let selectedCategory = "All";
  let currentView = location.hash === "#saved" ? "saved" : "discover";
  let activeRecipeId = null;
  let currentServings = 2;
  let checkedIngredients = new Set();

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
  }

  function updateFavouriteCount() {
    $("#favourite-count").textContent = String(favourites.size);
  }

  function setCategory(category) {
    selectedCategory = category;
    $$("[data-category]").forEach(button => {
      const active = button.dataset.category === category;
      button.classList.toggle("is-selected", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  function resetFilters(shouldRender = true) {
    setCategory("All");
    searchInput.value = "";
    clearSearch.hidden = true;
    $("#time-filter").value = "any";
    $("#difficulty-filter").value = "any";
    $("#diet-filter").value = "any";
    $("#sort-filter").value = "featured";
    if (shouldRender) renderRecipes();
  }

  function setView(view, updateHistory = true, shouldScroll = true) {
    currentView = view === "saved" ? "saved" : "discover";
    if (currentView === "saved") resetFilters(false);

    const nextHash = currentView === "saved" ? "#saved" : "#discover";
    if (updateHistory && location.hash !== nextHash) {
      history.pushState({ view: currentView }, "", nextHash);
    }

    $$('[data-view-link]').forEach(link => {
      const active = link.dataset.viewLink === currentView;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });

    const saved = currentView === "saved";
    catalogHeading.textContent = saved ? "Your favourites" : "All recipes";
    catalogIntro.textContent = saved ? "Recipes you've saved." : "Find something to make today.";
    renderRecent();
    renderRecipes();

    if (shouldScroll) $("#recipe-grid").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function matchesDiet(recipe, diet) {
    const dietary = recipe.dietary || [];
    const foodType = recipe.foodType || "plant";
    if (diet === "vegetarian") return dietary.includes("vegetarian");
    if (diet === "vegan") return dietary.includes("vegan");
    if (diet === "pescatarian") return dietary.includes("vegetarian") || foodType === "seafood";
    if (diet === "seafood") return foodType === "seafood";
    if (diet === "meat") return foodType === "meat";
    return true;
  }

  function getVisibleRecipes() {
    let visible = currentView === "saved"
      ? recipes.filter(recipe => favourites.has(recipe.id))
      : [...recipes];

    const query = searchInput.value.trim().toLowerCase();
    const time = $("#time-filter").value;
    const difficulty = $("#difficulty-filter").value;
    const diet = $("#diet-filter").value;
    const sort = $("#sort-filter").value;

    if (selectedCategory !== "All") visible = visible.filter(recipe => recipe.category === selectedCategory);
    if (query) {
      visible = visible.filter(recipe => {
        const ingredients = (recipe.ingredients || []).map(item => item.item || "");
        const searchable = [recipe.title, recipe.category, recipe.description, ...(recipe.tags || []), ...ingredients]
          .join(" ").toLowerCase();
        return searchable.includes(query);
      });
    }
    if (time === "under20") visible = visible.filter(recipe => recipe.time < 20);
    if (time === "20to40") visible = visible.filter(recipe => recipe.time >= 20 && recipe.time <= 40);
    if (time === "over40") visible = visible.filter(recipe => recipe.time > 40);
    if (difficulty !== "any") visible = visible.filter(recipe => recipe.difficulty === difficulty);
    if (diet !== "any") visible = visible.filter(recipe => matchesDiet(recipe, diet));

    if (sort === "quickest") visible.sort((a, b) => a.time - b.time);
    if (sort === "longest") visible.sort((a, b) => b.time - a.time);
    if (sort === "az") visible.sort((a, b) => a.title.localeCompare(b.title));
    return visible;
  }

  function createRecipeCard(recipe, compact = false) {
    const saved = favourites.has(recipe.id);
    return `
      <article class="recipe-card">
        <div class="card-image-wrap">
          <button class="card-image-button" type="button" data-open-recipe="${escapeHTML(recipe.id)}" aria-label="View ${escapeHTML(recipe.title)} recipe">
            <img src="${escapeHTML(recipe.image)}" alt="${escapeHTML(recipe.alt)}" loading="lazy" decoding="async">
          </button>
          <span class="card-tag">${escapeHTML(recipe.category)}</span>
          <button class="favourite-button ${saved ? "is-saved" : ""}" type="button" data-favourite="${escapeHTML(recipe.id)}" aria-label="${saved ? "Remove" : "Save"} ${escapeHTML(recipe.title)} ${saved ? "from" : "to"} favourites" aria-pressed="${saved}"><span aria-hidden="true">${saved ? "♥" : "♡"}</span></button>
        </div>
        <div class="card-meta"><span>${recipe.time} min</span><span class="meta-dot" aria-hidden="true"></span><span>${escapeHTML(recipe.difficulty)}</span></div>
        <button class="card-title-button" type="button" data-open-recipe="${escapeHTML(recipe.id)}">${escapeHTML(recipe.title)}</button>
        ${compact ? "" : `<p class="card-description">${escapeHTML(recipe.description)}</p>`}
      </article>`;
  }

  function renderRecipes() {
    if (!recipes.length) {
      recipeList.innerHTML = "";
      recipeList.hidden = true;
      emptyState.hidden = true;
      loadError.hidden = false;
      resultsLabel.textContent = "0 recipes";
      updateFavouriteCount();
      return;
    }
    loadError.hidden = true;
    const visible = getVisibleRecipes();
    recipeList.innerHTML = visible.map(recipe => createRecipeCard(recipe)).join("");
    const countText = `${visible.length} ${visible.length === 1 ? "recipe" : "recipes"}`;
    resultsLabel.textContent = currentView === "saved" ? `${countText} saved` : countText;
    $("#recipe-total").textContent = currentView === "saved" ? `${favourites.size} saved` : `${recipes.length} recipes`;

    const isEmpty = visible.length === 0;
    emptyState.hidden = !isEmpty;
    recipeList.hidden = isEmpty;
    if (isEmpty && currentView === "saved") {
      $("#empty-title").textContent = "No favourites saved yet";
      $("#empty-description").textContent = "Select the heart on a recipe to save it here.";
    } else {
      $("#empty-title").textContent = "No recipes found";
      $("#empty-description").textContent = "Try changing your search or filters.";
    }
    updateFavouriteCount();
  }

  function renderRecent() {
    const recent = recentlyViewed.slice(0, 4).map(id => recipes.find(recipe => recipe.id === id)).filter(Boolean);
    recentSection.hidden = currentView === "saved" || recent.length === 0;
    recentList.innerHTML = recent.map(recipe => createRecipeCard(recipe, true)).join("");
  }

  function toggleFavourite(id) {
    if (!knownIds.has(id)) return;
    if (favourites.has(id)) favourites.delete(id);
    else favourites.add(id);
    writeStorage(FAVOURITES_KEY, [...favourites]);
    renderRecipes();
    renderRecent();
    if (activeRecipeId === id && dialog.open) updateDialogFavouriteButton();
  }

  function addToRecentlyViewed(id) {
    const next = [id, ...recentlyViewed.filter(item => item !== id)].slice(0, 8);
    recentlyViewed.splice(0, recentlyViewed.length, ...next);
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
    const amount = typeof ingredient.amount === "number" ? formatAmount(ingredient.amount * multiplier) : ingredient.amount;
    const prefix = amount ? `${amount}${ingredient.unit ? ` ${ingredient.unit}` : ""} ` : "";
    return `${prefix}${ingredient.item}`;
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
          <div class="detail-meta"><span>${(recipe.ingredients || []).length} ingredients</span><span>${currentServings} servings</span></div>
          <div class="detail-actions">
            <button type="button" class="detail-action primary ${favourites.has(recipe.id) ? "is-saved" : ""}" data-action="favourite" aria-pressed="${favourites.has(recipe.id)}">${favourites.has(recipe.id) ? "♥ Saved" : "♡ Save recipe"}</button>
            <button type="button" class="detail-action" data-action="share">Share recipe</button>
            <button type="button" class="detail-action" data-action="print">Print</button>
          </div>
        </div>
      </div>
      <div class="detail-body">
        <section aria-labelledby="ingredients-heading">
          <h3 id="ingredients-heading">Ingredients</h3>
          <div class="servings-control"><span>Servings</span><div class="servings-buttons">
            <button type="button" data-servings="-1" aria-label="Decrease servings" ${currentServings <= 1 ? "disabled" : ""}>−</button>
            <strong aria-live="polite">${currentServings}</strong>
            <button type="button" data-servings="1" aria-label="Increase servings" ${currentServings >= 8 ? "disabled" : ""}>+</button>
          </div></div>
          <ul class="ingredient-list">${(recipe.ingredients || []).map((ingredient, index) => `
            <li><label class="ingredient-label"><input class="ingredient-check" type="checkbox" data-ingredient="${index}" ${checkedIngredients.has(index) ? "checked" : ""}><span>${escapeHTML(ingredientText(ingredient, multiplier))}</span></label></li>
          `).join("")}</ul>
        </section>
        <section aria-labelledby="method-heading"><h3 id="method-heading">Instructions</h3>
          <ol class="instructions-list">${(recipe.instructions || []).map(step => `<li>${escapeHTML(step)}</li>`).join("")}</ol>
        </section>
      </div>
      <aside class="cooking-tip" aria-labelledby="tip-heading"><h3 id="tip-heading">Cooking tip</h3><p>${escapeHTML(recipe.tip || "Taste and adjust the seasoning before serving.")}</p></aside>`;
  }

  function openRecipe(id) {
    const recipe = recipes.find(item => item.id === id);
    if (!recipe) return;
    activeRecipeId = id;
    currentServings = recipe.servings || 2;
    checkedIngredients = new Set();
    addToRecentlyViewed(id);
    renderRecipeDetail(recipe);
    if (!dialog.open) dialog.showModal();
    document.body.classList.add("dialog-open");
    actionStatus.textContent = "";
  }

  function updateDialogFavouriteButton() {
    const button = $('[data-action="favourite"]', detailContainer);
    if (!button || !activeRecipeId) return;
    const saved = favourites.has(activeRecipeId);
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
      } else if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl.toString());
        actionStatus.textContent = "Recipe link copied.";
      } else {
        const temporary = document.createElement("textarea");
        temporary.value = shareUrl.toString();
        temporary.setAttribute("readonly", "");
        temporary.style.position = "absolute";
        temporary.style.left = "-9999px";
        document.body.appendChild(temporary);
        temporary.select();
        const copied = document.execCommand("copy");
        temporary.remove();
        actionStatus.textContent = copied ? "Recipe link copied." : "Copy this recipe link from your browser address bar.";
      }
    } catch (error) {
      if (error.name !== "AbortError") actionStatus.textContent = "Could not share this recipe from this browser.";
    }
  }

  function closeRecipeDialog() {
    if (dialog.open) dialog.close();
    document.body.classList.remove("dialog-open");
    activeRecipeId = null;
    actionStatus.textContent = "";
  }

  function handleCardClick(event) {
    const favouriteButton = event.target.closest("[data-favourite]");
    if (favouriteButton) {
      toggleFavourite(favouriteButton.dataset.favourite);
      return;
    }
    const openButton = event.target.closest("[data-open-recipe]");
    if (openButton) openRecipe(openButton.dataset.openRecipe);
  }

  // Navigation works through both clicks and browser back/forward.
  $$('[data-view-link]').forEach(link => link.addEventListener("click", event => {
    event.preventDefault();
    setView(link.dataset.viewLink);
  }));
  function syncViewFromHash() {
    const requested = location.hash === "#saved" ? "saved" : "discover";
    if (requested !== currentView) setView(requested, false, true);
  }
  window.addEventListener("popstate", syncViewFromHash);
  window.addEventListener("hashchange", syncViewFromHash);

  $$("[data-category]").forEach(button => button.addEventListener("click", () => {
    setCategory(button.dataset.category);
    renderRecipes();
  }));
  searchInput.addEventListener("input", () => {
    clearSearch.hidden = searchInput.value.length === 0;
    renderRecipes();
  });
  $("#search-form").addEventListener("submit", event => event.preventDefault());
  clearSearch.addEventListener("click", () => {
    searchInput.value = "";
    clearSearch.hidden = true;
    renderRecipes();
    searchInput.focus();
  });
  ["time-filter", "difficulty-filter", "diet-filter", "sort-filter"].forEach(id => $("#" + id).addEventListener("change", renderRecipes));
  $("#reset-filters").addEventListener("click", () => resetFilters());
  $("#reset-empty").addEventListener("click", () => resetFilters());

  recipeList.addEventListener("click", handleCardClick);
  recentList.addEventListener("click", handleCardClick);
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

  $("#close-dialog").addEventListener("click", closeRecipeDialog);
  dialog.addEventListener("click", event => { if (event.target === dialog) closeRecipeDialog(); });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("dialog-open");
    activeRecipeId = null;
  });

  $("#current-year").textContent = String(new Date().getFullYear());
  if (!recipes.length) {
    loadError.hidden = false;
    recipeList.hidden = true;
  } else {
    setView(currentView, false, false);
    const sharedRecipeId = new URLSearchParams(window.location.search).get("recipe");
    if (sharedRecipeId && knownIds.has(sharedRecipeId)) openRecipe(sharedRecipeId);
  }
})();

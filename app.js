const recipes = [
  {
    id: "lemon-chicken-orzo", title: "Lemon chicken & orzo", category: "Dinner", time: 30, difficulty: "Easy", servings: 2,
    description: "Golden chicken, silky orzo and a bright squeeze of lemon. One pan, very little washing up.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=82", alt: "A colourful bowl of chicken and vegetables",
    ingredients: [
      { amount: 2, unit: "", item: "small chicken breasts or boneless thighs" },
      { amount: 1, unit: "tbsp", item: "olive oil" },
      { amount: 1, unit: "", item: "small shallot, finely chopped" },
      { amount: 150, unit: "g", item: "orzo" },
      { amount: 450, unit: "ml", item: "chicken stock" },
      { amount: 1, unit: "", item: "lemon (zest and juice)" },
      { amount: 2, unit: "handfuls", item: "baby spinach" },
      { amount: 2, unit: "tbsp", item: "grated Parmesan" }
    ],
    instructions: ["Season the chicken generously with salt and black pepper. Warm the olive oil in a deep frying pan over medium heat and brown the chicken for 3–4 minutes per side. It does not need to be cooked through yet. Transfer to a plate.", "Add the shallot to the same pan and cook for 2 minutes until softened. Stir in the orzo, then pour in the stock and scrape up any browned bits from the bottom.", "Nestle the chicken back into the pan. Simmer gently for 10–12 minutes, stirring the orzo often, until the pasta is tender and the chicken is cooked through. Add a splash of water if the pan gets too dry.", "Stir in the lemon zest, lemon juice, spinach and Parmesan. Let the spinach wilt, taste and adjust the seasoning. Rest for 2 minutes before serving."]
  },
  {
    id: "gochujang-noodles", title: "Gochujang butter noodles", category: "Dinner", time: 15, difficulty: "Easy", servings: 2,
    description: "Chewy noodles tossed in a glossy, gently spicy butter sauce. Faster than ordering in.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1000&q=82", alt: "A bowl of noodles topped with herbs and sesame",
    ingredients: [{ amount: 200, unit: "g", item: "wheat noodles or udon" }, { amount: 1, unit: "tbsp", item: "unsalted butter" }, { amount: 1, unit: "tbsp", item: "gochujang" }, { amount: 1, unit: "tbsp", item: "soy sauce" }, { amount: 1, unit: "tbsp", item: "honey or brown sugar" }, { amount: 1, unit: "tsp", item: "rice vinegar" }, { amount: 1, unit: "clove", item: "garlic, grated" }, { amount: 1, unit: "", item: "spring onion, thinly sliced" }, { amount: 1, unit: "tsp", item: "toasted sesame seeds" }],
    instructions: ["Cook the noodles according to the packet instructions. Before draining, save a small mug of the starchy cooking water.", "While the noodles cook, melt the butter in a pan over low heat. Stir in the gochujang, soy sauce, honey, rice vinegar and garlic until smooth and fragrant.", "Add the drained noodles and a splash of noodle water. Toss until every strand is coated in the glossy sauce. Add a little more water if needed.", "Finish with spring onion and sesame seeds. Taste before adding extra soy sauce; the gochujang already brings plenty of seasoning."]
  },
  {
    id: "crispy-chickpea-bowl", title: "Crispy chickpea bowls", category: "Lunch", time: 25, difficulty: "Easy", servings: 2,
    description: "Crunchy spiced chickpeas, cool cucumber and a lemony yoghurt dressing. A lunch that holds up.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=82", alt: "A fresh grain bowl filled with vegetables and greens",
    ingredients: [{ amount: 1, unit: "can", item: "chickpeas, drained and dried" }, { amount: 1, unit: "tbsp", item: "olive oil" }, { amount: 1, unit: "tsp", item: "smoked paprika" }, { amount: 0.5, unit: "tsp", item: "ground cumin" }, { amount: 120, unit: "g", item: "cooked couscous or rice" }, { amount: 0.5, unit: "", item: "cucumber, diced" }, { amount: 150, unit: "g", item: "cherry tomatoes, halved" }, { amount: 100, unit: "g", item: "plain Greek yoghurt" }, { amount: 0.5, unit: "", item: "lemon, juiced" }],
    instructions: ["Pat the chickpeas very dry with a clean tea towel. Toss with olive oil, smoked paprika, cumin and a good pinch of salt.", "Spread on a baking tray and roast at 220°C (200°C fan) for 20–25 minutes, shaking once, until crisp at the edges. An air fryer works too.", "Mix the yoghurt with lemon juice, a pinch of salt and a teaspoon of water to make a spoonable dressing.", "Divide the couscous or rice between bowls. Add the cucumber, tomatoes and warm chickpeas, then finish with the yoghurt dressing."]
  },
  {
    id: "tomato-ricotta-toast", title: "Tomato & whipped ricotta toast", category: "Breakfast", time: 10, difficulty: "Easy", servings: 2,
    description: "Juicy tomatoes, creamy ricotta and good toast. Proof that breakfast can be simple and lovely.",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1000&q=82", alt: "Toasted bread topped with fresh ingredients",
    ingredients: [{ amount: 2, unit: "thick slices", item: "sourdough bread" }, { amount: 120, unit: "g", item: "ricotta" }, { amount: 1, unit: "tbsp", item: "olive oil, plus extra to finish" }, { amount: 200, unit: "g", item: "ripe cherry tomatoes" }, { amount: 0.5, unit: "", item: "lemon, zested" }, { amount: 1, unit: "handful", item: "fresh basil leaves" }, { amount: 1, unit: "pinch", item: "flaky salt and black pepper" }],
    instructions: ["Toast the sourdough until deeply golden. Meanwhile, stir the ricotta with a little olive oil, lemon zest, salt and black pepper until creamy.", "Halve the tomatoes and season them with a pinch of salt. Let them sit for a couple of minutes so their juices collect.", "Spread the whipped ricotta over the warm toast. Spoon over the tomatoes and their juices.", "Finish with basil, a drizzle of olive oil and another twist of black pepper. Eat straight away while the toast is crisp."]
  },
  {
    id: "miso-mushroom-rice", title: "Miso mushroom rice bowl", category: "Lunch", time: 20, difficulty: "Easy", servings: 2,
    description: "Deeply savoury mushrooms over warm rice, with a quick miso dressing and a jammy egg.",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1000&q=82", alt: "A rice bowl topped with mushrooms and vegetables",
    ingredients: [{ amount: 250, unit: "g", item: "mixed mushrooms, torn or sliced" }, { amount: 1, unit: "tbsp", item: "neutral oil" }, { amount: 1, unit: "tbsp", item: "white miso" }, { amount: 1, unit: "tbsp", item: "soy sauce" }, { amount: 1, unit: "tsp", item: "honey" }, { amount: 300, unit: "g", item: "cooked rice" }, { amount: 2, unit: "", item: "eggs" }, { amount: 1, unit: "", item: "spring onion, sliced" }],
    instructions: ["Bring a small saucepan of water to a boil. Lower in the eggs and cook for 7 minutes for jammy yolks, then cool under cold running water and peel.", "Heat the oil in a wide frying pan. Add the mushrooms in one layer and leave them undisturbed for 2 minutes so they take on some colour. Toss and cook until tender.", "Mix the miso, soy sauce, honey and 1 tablespoon of warm water. Pour into the mushroom pan and toss until glossy.", "Spoon warm rice into bowls. Add the mushrooms and halved eggs, then finish with spring onion."]
  },
  {
    id: "sausage-peppers", title: "Sausage, peppers & butter beans", category: "Dinner", time: 35, difficulty: "Easy", servings: 2,
    description: "A one-pan supper with sweet peppers, soft butter beans and plenty of crusty-bread-friendly sauce.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=82", alt: "A hearty cooked meal served in a pan",
    ingredients: [{ amount: 4, unit: "", item: "good pork or chicken sausages" }, { amount: 1, unit: "tbsp", item: "olive oil" }, { amount: 1, unit: "", item: "red onion, sliced" }, { amount: 2, unit: "", item: "bell peppers, sliced" }, { amount: 2, unit: "cloves", item: "garlic, chopped" }, { amount: 1, unit: "tsp", item: "smoked paprika" }, { amount: 1, unit: "can", item: "chopped tomatoes" }, { amount: 1, unit: "can", item: "butter beans, drained" }],
    instructions: ["Heat the olive oil in a deep pan. Brown the sausages on all sides for 6–8 minutes, then lift them onto a plate.", "Add the onion and peppers to the pan. Cook for 5 minutes until beginning to soften, then stir in the garlic and smoked paprika.", "Pour in the chopped tomatoes and butter beans. Return the sausages to the pan, cover and simmer gently for 15 minutes, or until the sausages are cooked through.", "Taste the sauce and season with salt and pepper. Serve in warm bowls with crusty bread to mop up the tomato sauce."]
  },
  {
    id: "lemon-spinach-pasta", title: "Creamy lemon & spinach pasta", category: "Dinner", time: 20, difficulty: "Easy", servings: 2,
    description: "A silky, lemony sauce made in the time it takes the pasta to cook. No jar required.",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1000&q=82", alt: "A plate of pasta with herbs and a light sauce",
    ingredients: [{ amount: 180, unit: "g", item: "short pasta" }, { amount: 1, unit: "tbsp", item: "butter" }, { amount: 1, unit: "clove", item: "garlic, finely grated" }, { amount: 80, unit: "ml", item: "single cream" }, { amount: 1, unit: "", item: "lemon, zested and juiced" }, { amount: 2, unit: "handfuls", item: "baby spinach" }, { amount: 35, unit: "g", item: "Parmesan, finely grated" }],
    instructions: ["Cook the pasta in well-salted boiling water until just al dente. Save a mug of pasta water before draining.", "Melt the butter in the pasta pan over low heat. Add the garlic and cook for 30 seconds, then stir in the cream, lemon zest and a squeeze of lemon juice.", "Add the drained pasta and spinach. Toss over low heat until the spinach wilts, loosening the sauce with pasta water until it clings to the pasta.", "Take the pan off the heat and stir through the Parmesan. Taste, add more lemon if you like, and serve immediately."]
  },
  {
    id: "honey-soy-salmon", title: "Sticky honey-soy salmon", category: "Dinner", time: 25, difficulty: "Easy", servings: 2,
    description: "A quick sweet-salty glaze, flaky salmon and rice. Keep this one for busy evenings.",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1000&q=82", alt: "A cooked salmon fillet served with vegetables",
    ingredients: [{ amount: 2, unit: "", item: "salmon fillets" }, { amount: 1, unit: "tbsp", item: "soy sauce" }, { amount: 1, unit: "tbsp", item: "honey" }, { amount: 1, unit: "tsp", item: "rice vinegar" }, { amount: 1, unit: "clove", item: "garlic, grated" }, { amount: 1, unit: "tsp", item: "neutral oil" }, { amount: 300, unit: "g", item: "cooked rice, to serve" }, { amount: 1, unit: "", item: "spring onion, sliced" }],
    instructions: ["Pat the salmon dry. Stir together the soy sauce, honey, rice vinegar and garlic in a small bowl.", "Heat the oil in a non-stick pan over medium heat. Add the salmon skin-side down and cook for 4–5 minutes, until the skin is crisp and most of the flesh has turned opaque.", "Turn the salmon and pour the glaze into the pan. Let it bubble for 1–2 minutes, spooning it over the fish, until the salmon is cooked through and coated.", "Serve over warm rice with the pan sauce spooned on top. Finish with spring onion and sesame seeds if you have them."]
  },
  {
    id: "shakshuka", title: "Sunday-morning shakshuka", category: "Breakfast", time: 30, difficulty: "Easy", servings: 2,
    description: "Eggs gently cooked in a spiced tomato and pepper sauce. Best eaten straight from the pan.",
    image: "https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=1000&q=82", alt: "Eggs cooked in a rich tomato sauce in a skillet",
    ingredients: [{ amount: 1, unit: "tbsp", item: "olive oil" }, { amount: 1, unit: "", item: "small onion, diced" }, { amount: 1, unit: "", item: "red pepper, diced" }, { amount: 2, unit: "cloves", item: "garlic, minced" }, { amount: 1, unit: "tsp", item: "ground cumin" }, { amount: 1, unit: "tsp", item: "smoked paprika" }, { amount: 1, unit: "can", item: "chopped tomatoes" }, { amount: 4, unit: "", item: "eggs" }, { amount: 30, unit: "g", item: "feta, crumbled" }],
    instructions: ["Warm the olive oil in a lidded frying pan. Add the onion and pepper and cook for 6–8 minutes until soft. Stir in the garlic, cumin and paprika for 30 seconds.", "Pour in the chopped tomatoes, season with salt and pepper, and simmer for 8–10 minutes until thickened. Add a splash of water if it becomes too thick.", "Make four little wells in the sauce and crack an egg into each. Cover the pan and cook gently for 5–8 minutes, until the whites are set and the yolks are how you like them.", "Scatter over the feta and serve with warm bread for scooping up the sauce."]
  },
  {
    id: "banana-oat-pancakes", title: "Banana oat pancakes", category: "Sweet", time: 15, difficulty: "Easy", servings: 2,
    description: "Soft-centred pancakes with crisp edges, made from a handful of everyday ingredients.",
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=1000&q=82", alt: "A stack of pancakes topped with fruit",
    ingredients: [{ amount: 1, unit: "", item: "ripe banana" }, { amount: 2, unit: "", item: "eggs" }, { amount: 70, unit: "g", item: "rolled oats" }, { amount: 0.5, unit: "tsp", item: "baking powder" }, { amount: 0.5, unit: "tsp", item: "ground cinnamon" }, { amount: 1, unit: "tsp", item: "butter or oil, for the pan" }, { amount: 1, unit: "handful", item: "berries, to serve" }],
    instructions: ["Mash the banana in a bowl until mostly smooth. Whisk in the eggs, then stir through the oats, baking powder and cinnamon.", "Leave the mixture to sit for 3 minutes so the oats begin to soften. If it feels very thick, add a tablespoon of milk or water.", "Warm a little butter or oil in a non-stick pan over medium-low heat. Spoon in small rounds of batter and cook for 2–3 minutes, until the edges look set and bubbles appear.", "Flip carefully and cook for another 1–2 minutes. Serve warm with berries and a little yoghurt or honey."]
  },
  {
    id: "roasted-tomato-soup", title: "Roasted tomato soup", category: "Lunch", time: 40, difficulty: "Easy", servings: 3,
    description: "Tomatoes roasted until sweet, then blended into a smooth soup. Excellent with a cheese toastie.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=82", alt: "A bowl of warm soup with fresh herbs",
    ingredients: [{ amount: 700, unit: "g", item: "ripe tomatoes, halved" }, { amount: 1, unit: "", item: "red onion, cut into wedges" }, { amount: 4, unit: "cloves", item: "garlic, unpeeled" }, { amount: 2, unit: "tbsp", item: "olive oil" }, { amount: 500, unit: "ml", item: "vegetable stock" }, { amount: 1, unit: "tsp", item: "sugar (optional)" }, { amount: 2, unit: "tbsp", item: "cream or yoghurt, to finish" }],
    instructions: ["Heat the oven to 210°C (190°C fan). Put the tomatoes, onion and garlic on a tray, drizzle with olive oil and season well.", "Roast for 25–30 minutes until the tomatoes have collapsed and the onion is soft with browned edges.", "Squeeze the garlic from its skins into a saucepan. Add the roasted vegetables and stock, then bring to a gentle simmer for 5 minutes.", "Blend until smooth, adding a little more stock if needed. Taste and adjust the seasoning; add the sugar only if the tomatoes are particularly sharp. Finish with cream or yoghurt."]
  },
  {
    id: "chicken-rice-bowl", title: "Ginger chicken rice bowls", category: "Lunch", time: 25, difficulty: "Easy", servings: 2,
    description: "Ginger, garlic and a savoury pan sauce turn simple chicken and rice into a proper lunch.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=82", alt: "A rice bowl with chicken and fresh vegetables",
    ingredients: [{ amount: 250, unit: "g", item: "boneless chicken thigh, sliced" }, { amount: 1, unit: "tbsp", item: "neutral oil" }, { amount: 1, unit: "tbsp", item: "soy sauce" }, { amount: 1, unit: "tsp", item: "honey" }, { amount: 1, unit: "tsp", item: "fresh ginger, grated" }, { amount: 1, unit: "clove", item: "garlic, grated" }, { amount: 300, unit: "g", item: "cooked rice" }, { amount: 1, unit: "", item: "cucumber, sliced" }],
    instructions: ["Stir the soy sauce, honey, ginger and garlic together in a small bowl.", "Heat the oil in a frying pan over medium-high heat. Add the chicken in a single layer and cook for 5–7 minutes, turning, until golden and cooked through.", "Pour the ginger-soy mixture into the pan and toss for 1 minute until it bubbles and coats the chicken. Add a splash of water if the sauce gets too sticky.", "Serve the chicken over rice with cucumber on the side. Spoon any sauce left in the pan over the bowls."]
  },
  {
    id: "apple-crumble", title: "Little apple oat crumble", category: "Sweet", time: 40, difficulty: "Easy", servings: 4,
    description: "Soft cinnamon apples under a buttery oat topping. A simple pudding made for sharing.",
    image: "https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&w=1000&q=82", alt: "A warm fruit dessert with a golden crumble topping",
    ingredients: [{ amount: 4, unit: "", item: "apples, peeled and cut into chunks" }, { amount: 1, unit: "tbsp", item: "lemon juice" }, { amount: 2, unit: "tbsp", item: "brown sugar" }, { amount: 0.5, unit: "tsp", item: "ground cinnamon" }, { amount: 80, unit: "g", item: "plain flour" }, { amount: 50, unit: "g", item: "rolled oats" }, { amount: 65, unit: "g", item: "cold butter, cubed" }, { amount: 45, unit: "g", item: "brown sugar, for topping" }],
    instructions: ["Heat the oven to 190°C (170°C fan). Toss the apple chunks with lemon juice, 2 tablespoons of brown sugar and the cinnamon. Tip into a small baking dish.", "Put the flour, oats and topping sugar in a bowl. Rub in the cold butter with your fingertips until the mixture has rough, buttery crumbs.", "Scatter the crumble mixture evenly over the apples. Don't press it down; the loose bits will turn crisp in the oven.", "Bake for 30–35 minutes until the topping is golden and the fruit is bubbling at the edges. Let it stand for 5 minutes before serving with yoghurt, cream or ice cream."]
  }
];

const STORAGE_KEY = "whats-cooking-favourites-v1";
const recipeList = document.getElementById("recipe-list");
const emptyState = document.getElementById("empty-state");
const searchInput = document.getElementById("recipe-search");
const clearSearch = document.getElementById("clear-search");
const resultsLabel = document.getElementById("results-label");
const heading = document.getElementById("catalog-heading");
const kicker = document.getElementById("catalog-kicker");
const intro = document.getElementById("catalog-intro");
const dialog = document.getElementById("recipe-dialog");
const detailContainer = document.getElementById("recipe-detail");
let selectedCategory = "All";
let currentView = location.hash === "#saved" ? "saved" : "discover";
let activeRecipeId = null;
let currentServings = 2;
let favourites = readFavourites();

function readFavourites() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(stored) ? stored.filter(id => recipes.some(recipe => recipe.id === id)) : [];
  } catch (error) {
    return [];
  }
}

function writeFavourites() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
  } catch (error) {
    // The site still works for this visit if browser storage is unavailable.
  }
}

function updateFavouriteCount() {
  document.getElementById("favourite-count").textContent = String(favourites.length);
}

function setView(view, updateHash = true, shouldScroll = true) {
  currentView = view;
  if (updateHash && location.hash !== `#${view}`) history.replaceState(null, "", `#${view}`);
  document.querySelectorAll("[data-view-link]").forEach(link => {
    const active = link.dataset.viewLink === view;
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  const saved = view === "saved";
  heading.innerHTML = saved ? "Your <em>favourites.</em>" : "Find your <em>kind</em> of delicious.";
  kicker.innerHTML = saved ? '<span class="eyebrow-line"></span> YOUR PERSONAL RECIPE BOX' : '<span class="eyebrow-line"></span> THE RECIPE COLLECTION';
  intro.textContent = saved ? "All the good things you've saved, gathered in one place. Your next meal is already here." : "From quick weekday dinners to slow Sunday mornings. Pick a mood, find a recipe, make it yours.";
  document.getElementById("search-form").hidden = saved;
  document.querySelector(".category-filters").hidden = saved;
  document.getElementById("surprise-button").hidden = saved;
  resultsLabel.innerHTML = saved ? `Your saved collection <span>·</span> <strong>${favourites.length} ${favourites.length === 1 ? "recipe" : "recipes"}</strong>` : "A few good things to cook <span>·</span> <strong>13 recipes</strong>";
  renderRecipes();
  if (shouldScroll) document.getElementById("recipe-grid").scrollIntoView({ behavior: "smooth", block: "start" });
}

function getVisibleRecipes() {
  let visible = currentView === "saved" ? recipes.filter(recipe => favourites.includes(recipe.id)) : recipes;
  if (currentView === "discover") {
    const query = searchInput.value.trim().toLowerCase();
    if (selectedCategory !== "All") visible = visible.filter(recipe => recipe.category === selectedCategory);
    if (query) visible = visible.filter(recipe => {
      const searchable = [recipe.title, recipe.category, recipe.description, ...recipe.ingredients.map(ingredient => ingredient.item)].join(" ").toLowerCase();
      return searchable.includes(query);
    });
  }
  return visible;
}

function renderRecipes() {
  const visible = getVisibleRecipes();
  recipeList.innerHTML = visible.map(recipe => `
    <article class="recipe-card">
      <div class="card-image-wrap">
        <button class="card-image-button" type="button" data-open-recipe="${recipe.id}" aria-label="View ${escapeHTML(recipe.title)} recipe">
          <img src="${recipe.image}" alt="${escapeHTML(recipe.alt)}" loading="lazy">
        </button>
        <span class="card-tag">${escapeHTML(recipe.category)}</span>
        <button class="favourite-button ${favourites.includes(recipe.id) ? "is-saved" : ""}" type="button" data-favourite="${recipe.id}" aria-label="${favourites.includes(recipe.id) ? "Remove" : "Save"} ${escapeHTML(recipe.title)} ${favourites.includes(recipe.id) ? "from" : "to"} favourites" aria-pressed="${favourites.includes(recipe.id)}"><span aria-hidden="true">${favourites.includes(recipe.id) ? "♥" : "♡"}</span></button>
      </div>
      <div class="card-meta"><span>${escapeHTML(recipe.category)}</span><span class="meta-dot"></span><span>${recipe.time} min</span><span class="meta-dot"></span><span>${escapeHTML(recipe.difficulty)}</span></div>
      <button class="card-title-button" type="button" data-open-recipe="${recipe.id}">${escapeHTML(recipe.title)}</button>
      <p class="card-description">${escapeHTML(recipe.description)}</p>
    </article>
  `).join("");

  resultsLabel.innerHTML = currentView === "saved"
    ? `Your saved collection <span>·</span> <strong>${visible.length} ${visible.length === 1 ? "recipe" : "recipes"}</strong>`
    : `${searchInput.value.trim() || selectedCategory !== "All" ? "Recipes to try" : "A few good things to cook"} <span>·</span> <strong>${visible.length} ${visible.length === 1 ? "recipe" : "recipes"}</strong>`;

  const isEmpty = visible.length === 0;
  emptyState.hidden = !isEmpty;
  recipeList.hidden = isEmpty;
  if (isEmpty && currentView === "saved") {
    document.getElementById("empty-title").textContent = "Your recipe box is waiting.";
    document.getElementById("empty-description").textContent = "Tap the little heart on any recipe to keep it here for another day.";
  } else if (isEmpty) {
    document.getElementById("empty-title").textContent = "Nothing on the menu just yet.";
    document.getElementById("empty-description").textContent = "Try another search or choose a different category.";
  }
  updateFavouriteCount();
}

function toggleFavourite(id) {
  if (favourites.includes(id)) favourites = favourites.filter(item => item !== id);
  else favourites = [...favourites, id];
  writeFavourites();
  renderRecipes();
  if (activeRecipeId === id && dialog.open) updateDialogSaveButton();
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

function openRecipe(id) {
  const recipe = recipes.find(item => item.id === id);
  if (!recipe) return;
  activeRecipeId = id;
  currentServings = recipe.servings;
  renderRecipeDetail(recipe);
  if (!dialog.open) dialog.showModal();
  document.body.classList.add("dialog-open");
}

function renderRecipeDetail(recipe) {
  const multiplier = currentServings / recipe.servings;
  detailContainer.innerHTML = `
    <div class="detail-hero">
      <img class="detail-hero-image" src="${recipe.image}" alt="${escapeHTML(recipe.alt)}">
      <div class="detail-intro">
        <p class="eyebrow"><span class="eyebrow-line"></span> ${escapeHTML(recipe.category)} / THE RECIPE</p>
        <h2 id="dialog-title">${escapeHTML(recipe.title)}</h2>
        <p class="detail-description">${escapeHTML(recipe.description)}</p>
        <div class="detail-meta"><span>${recipe.time} minutes</span><span>${escapeHTML(recipe.difficulty)}</span><span>${recipe.servings} servings</span></div>
      </div>
    </div>
    <div class="detail-body">
      <section aria-labelledby="ingredients-heading">
        <h3 id="ingredients-heading">What you'll need.</h3>
        <div class="servings-control"><span>Adjust servings</span><div class="servings-buttons"><button type="button" data-servings="-1" aria-label="Fewer servings" ${currentServings <= 1 ? "disabled" : ""}>−</button><strong>${currentServings}</strong><button type="button" data-servings="1" aria-label="More servings" ${currentServings >= 8 ? "disabled" : ""}>+</button></div></div>
        <ul class="ingredient-list">${recipe.ingredients.map(ingredient => `<li>${escapeHTML(ingredientText(ingredient, multiplier))}</li>`).join("")}</ul>
      </section>
      <section aria-labelledby="method-heading">
        <h3 id="method-heading">Let's make it.</h3>
        <ol class="instructions-list">${recipe.instructions.map(step => `<li>${escapeHTML(step)}</li>`).join("")}</ol>
      </section>
    </div>
    <div class="detail-bottom"><p>A good one to come back to.</p><button type="button" class="detail-save ${favourites.includes(recipe.id) ? "is-saved" : ""}" id="detail-save" aria-pressed="${favourites.includes(recipe.id)}">${favourites.includes(recipe.id) ? "♥ Saved to favourites" : "♡ Save to favourites"}</button></div>
  `;
}

function updateDialogSaveButton() {
  const button = document.getElementById("detail-save");
  if (!button || !activeRecipeId) return;
  const saved = favourites.includes(activeRecipeId);
  button.classList.toggle("is-saved", saved);
  button.setAttribute("aria-pressed", String(saved));
  button.textContent = saved ? "♥ Saved to favourites" : "♡ Save to favourites";
}

function closeRecipeDialog() {
  if (dialog.open) dialog.close();
  document.body.classList.remove("dialog-open");
  activeRecipeId = null;
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

document.querySelectorAll("[data-view-link]").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    setView(link.dataset.viewLink);
  });
});

window.addEventListener("hashchange", () => {
  const requested = location.hash === "#saved" ? "saved" : "discover";
  if (requested !== currentView) setView(requested, false);
});

document.querySelectorAll("[data-category]").forEach(button => {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.category;
    document.querySelectorAll("[data-category]").forEach(chip => {
      const active = chip === button;
      chip.classList.toggle("is-selected", active);
      chip.setAttribute("aria-pressed", String(active));
    });
    renderRecipes();
  });
});

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

document.getElementById("surprise-button").addEventListener("click", () => {
  const options = getVisibleRecipes();
  if (options.length) openRecipe(options[Math.floor(Math.random() * options.length)].id);
});

document.getElementById("reset-filters").addEventListener("click", () => {
  selectedCategory = "All";
  searchInput.value = "";
  clearSearch.hidden = true;
  document.querySelectorAll("[data-category]").forEach(chip => {
    const active = chip.dataset.category === "All";
    chip.classList.toggle("is-selected", active);
    chip.setAttribute("aria-pressed", String(active));
  });
  if (currentView === "saved") setView("discover");
  else renderRecipes();
});

recipeList.addEventListener("click", event => {
  const favouriteButton = event.target.closest("[data-favourite]");
  if (favouriteButton) {
    toggleFavourite(favouriteButton.dataset.favourite);
    return;
  }
  const openButton = event.target.closest("[data-open-recipe]");
  if (openButton) openRecipe(openButton.dataset.openRecipe);
});

detailContainer.addEventListener("click", event => {
  const saveButton = event.target.closest("#detail-save");
  if (saveButton && activeRecipeId) {
    toggleFavourite(activeRecipeId);
    return;
  }
  const servingsButton = event.target.closest("[data-servings]");
  if (servingsButton && activeRecipeId) {
    const recipe = recipes.find(item => item.id === activeRecipeId);
    currentServings = Math.min(8, Math.max(1, currentServings + Number(servingsButton.dataset.servings)));
    renderRecipeDetail(recipe);
  }
});

document.getElementById("close-dialog").addEventListener("click", closeRecipeDialog);
dialog.addEventListener("click", event => {
  if (event.target === dialog) closeRecipeDialog();
});
dialog.addEventListener("close", () => {
  document.body.classList.remove("dialog-open");
  activeRecipeId = null;
});

// Start on the discover view; favourites persist in this browser between visits.
setView(currentView, false, false);

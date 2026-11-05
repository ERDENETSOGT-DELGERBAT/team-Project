const storageKey = "missingCaseProgress";

const defaultProgress = {
    officeCodeSolved: false,
    officeKey: false,
    archiveNote: false,
    archiveCodeSolved: false,
    finalKey: false,
    completed: false
};

function getProgress() {
    try {
        const saved = JSON.parse(localStorage.getItem(storageKey));
        return { ...defaultProgress, ...(saved || {}) };
    } catch {
        return { ...defaultProgress };
    }
}

function saveProgress(changes) {
    const progress = { ...getProgress(), ...changes };

    try {
        localStorage.setItem(storageKey, JSON.stringify(progress));
    } catch {
        return progress;
    }

    return progress;
}

function resetProgress() {
    try {
        localStorage.removeItem(storageKey);
    } catch {
        return;
    }
}

function showModal(title, content) {
    const modal = document.getElementById("gameModal");

    if (!modal) return;

    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalBody").innerHTML = content;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
    const modal = document.getElementById("gameModal");

    if (!modal) return;

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
}

function updateInventory() {
    const inventory = document.getElementById("inventory");

    if (!inventory) return;

    const progress = getProgress();
    const items = [];

    if (progress.officeKey) {
        items.push("🔑 Office key");
    }

    if (progress.archiveNote) {
        items.push("📜 Detective's note");
    }

    if (progress.finalKey) {
        items.push("🗝️ Final key");
    }

    inventory.innerHTML = "";

    if (items.length === 0) {
        const item = document.createElement("li");
        item.textContent = "Nothing collected yet";
        inventory.appendChild(item);
        return;
    }

    items.forEach((name) => {
        const item = document.createElement("li");
        item.textContent = name;
        inventory.appendChild(item);
    });
}

window.EscapeGame = {
    getProgress,
    saveProgress,
    resetProgress,
    showModal,
    closeModal,
    updateInventory
};

const modal = document.getElementById("gameModal");
const modalClose = document.getElementById("modalClose");

if (modalClose) {
    modalClose.addEventListener("click", closeModal);
}

if (modal) {
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeModal();
    }
});

updateInventory();

const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");

if (startButton) {
    const progress = getProgress();

    if (progress.completed) {
        startButton.textContent = "START A NEW CASE";

        startButton.addEventListener("click", (event) => {
            event.preventDefault();
            resetProgress();
            window.location.href = "room1.html";
        });
    } else if (progress.archiveCodeSolved) {
        startButton.textContent = "CONTINUE INVESTIGATION";
        startButton.href = "room2.html";
    } else if (progress.officeCodeSolved && progress.archiveNote) {
        startButton.textContent = "CONTINUE INVESTIGATION";
        startButton.href = "room1.html";
    }
}

if (resetButton) {
    resetButton.addEventListener("click", () => {
        resetProgress();
        window.location.reload();
    });
}

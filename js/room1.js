const game = window.EscapeGame;

function investigateOffice(object) {
    const progress = game.getProgress();

    if (object === "calendar") {
        game.showModal(
            "The Calendar",
            `
                <p>Three dates have been circled in red.</p>
                <div class="clue-line">MARCH 4 · APRIL 2 · MAY 7</div>
                <p>There must be a reason these dates were marked.</p>
                <p>Maybe the day numbers are important.</p>
            `
        );
    }

    if (object === "portrait") {
        game.showModal(
            "The Portrait",
            `
                <p>An old photograph of the detective hangs on the wall.</p>
                <p>On the back, someone has written:</p>
                <div class="clue-line">"The smallest details reveal the truth."</div>
                <p>Perhaps the calendar is more important than it looks.</p>
            `
        );
    }

    if (object === "bookshelf") {
        if (progress.archiveNote) {
            game.showModal(
                "The Bookshelf",
                `
                    <p>You already found a note hidden between the books.</p>
                    <div class="clue-line">MOON → KEY → EYE</div>
                    <p>Keep this order in mind. It may be useful in the archive.</p>
                `
            );
        } else {
            game.showModal(
                "The Bookshelf",
                `
                    <p>You notice a folded piece of paper between two old books.</p>
                    <p>It looks like a message from the detective.</p>
                    <div class="clue-line">MOON → KEY → EYE</div>
                    <button class="button button-primary modal-action" id="collectNote">COLLECT NOTE</button>
                `
            );

            document.getElementById("collectNote").addEventListener("click", () => {
                game.saveProgress({ archiveNote: true });
                game.updateInventory();

                game.showModal(
                    "Note Collected",
                    `
                        <p class="success-text">You found the detective's note.</p>
                        <p>Remember the order: Moon, Key, Eye.</p>
                    `
                );
            });
        }
    }

    if (object === "desk") {
        if (progress.officeCodeSolved) {
            game.showModal(
                "The Desk",
                `
                    <p>The drawer is open.</p>
                    <p>You already collected the small office key.</p>
                    <div class="clue-line">OFFICE KEY COLLECTED</div>
                `
            );
        } else {
            game.showModal(
                "The Locked Desk",
                `
                    <p>The desk drawer has a three-digit combination lock.</p>
                    <p>The calendar might contain the answer.</p>
                    <form class="puzzle-form" id="officeCodeForm">
                        <label for="officeCode">ENTER THE THREE-DIGIT CODE</label>
                        <input type="text" id="officeCode" maxlength="3" inputmode="numeric" autocomplete="off" required>
                        <button class="button button-primary" type="submit">UNLOCK DRAWER</button>
                        <p class="modal-message" id="officeMessage"></p>
                    </form>
                `
            );

            document.getElementById("officeCodeForm").addEventListener("submit", (event) => {
                event.preventDefault();

                const answer = document.getElementById("officeCode").value.trim();
                const message = document.getElementById("officeMessage");

                if (answer === "427") {
                    game.saveProgress({
                        officeCodeSolved: true,
                        officeKey: true
                    });

                    game.updateInventory();

                    game.showModal(
                        "Drawer Unlocked",
                        `
                            <p class="success-text">You solved the puzzle!</p>
                            <p>The drawer opens. Inside, you discover a small key.</p>
                            <div class="clue-line">OFFICE KEY COLLECTED</div>
                            <p>The key might open the door to the next room.</p>
                        `
                    );
                } else {
                    message.textContent = "That code is incorrect. Check the calendar again.";
                }
            });
        }
    }

    if (object === "door") {
        if (progress.officeKey && progress.archiveNote) {
            game.showModal(
                "The Locked Door",
                `
                    <p>The small key fits perfectly into the lock.</p>
                    <p>You also have the detective's note. It may be important in the next room.</p>
                    <p class="success-text">The door is unlocked.</p>
                    <a href="room2.html" class="button button-primary modal-action">ENTER THE ARCHIVE</a>
                `
            );
        } else if (!progress.officeKey) {
            game.showModal(
                "The Locked Door",
                `
                    <p>The door is locked. You need a key.</p>
                    <p>Maybe the desk contains something useful.</p>
                `
            );
        } else {
            game.showModal(
                "The Locked Door",
                `
                    <p>You have the key, but something tells you there is another important clue in this room.</p>
                    <p>Search the bookshelf before leaving.</p>
                `
            );
        }
    }
}

document.querySelectorAll("[data-object]").forEach((object) => {
    object.addEventListener("click", () => {
        investigateOffice(object.dataset.object);
    });
});

const hintButton = document.getElementById("hintButton");

hintButton.addEventListener("click", () => {
    const progress = game.getProgress();

    if (!progress.officeCodeSolved) {
        game.showModal(
            "A Hint",
            `
                <p>Look closely at the three dates on the calendar.</p>
                <p>Use only the day numbers, in the order they appear.</p>
            `
        );
    } else if (!progress.archiveNote) {
        game.showModal(
            "A Hint",
            `
                <p>Look between the books on the bookshelf.</p>
                <p>The detective left something important there.</p>
            `
        );
    } else {
        game.showModal(
            "A Hint",
            `
                <p>You have the key and the note.</p>
                <p>Try the locked door to continue your investigation.</p>
            `
        );
    }
});

game.updateInventory();

const game = window.EscapeGame;
const progress = game.getProgress();

if (!progress.officeKey || !progress.archiveNote) {
    window.location.replace("room1.html");
} else {
    function investigateArchive(object) {
        const currentProgress = game.getProgress();

        if (object === "evidence") {
            game.showModal(
                "The Evidence Board",
                `
                    <p>The detective has pinned three strange symbols to the board.</p>
                    <p>Each symbol has a number written underneath it.</p>
                    <div class="clue-line">🌙 MOON = 3</div>
                    <div class="clue-line">🔑 KEY = 1</div>
                    <div class="clue-line">👁️ EYE = 5</div>
                    <p>You remember the order from the detective's note.</p>
                `
            );
        }

        if (object === "cabinet") {
            if (currentProgress.archiveCodeSolved) {
                game.showModal(
                    "The Filing Cabinet",
                    `
                        <p>The cabinet is already unlocked.</p>
                        <p>You found the final key inside.</p>
                        <div class="clue-line">FINAL KEY COLLECTED</div>
                    `
                );
            } else {
                game.showModal(
                    "The Locked Cabinet",
                    `
                        <p>A combination lock protects the cabinet.</p>
                        <p>Use the order from the detective's note and match each symbol to its number.</p>
                        <form class="puzzle-form" id="archiveCodeForm">
                            <label for="archiveCode">ENTER THE THREE-DIGIT CODE</label>
                            <input type="text" id="archiveCode" maxlength="3" inputmode="numeric" autocomplete="off" required>
                            <button class="button button-primary" type="submit">UNLOCK CABINET</button>
                            <p class="modal-message" id="archiveMessage"></p>
                        </form>
                    `
                );

                document.getElementById("archiveCodeForm").addEventListener("submit", (event) => {
                    event.preventDefault();

                    const answer = document.getElementById("archiveCode").value.trim();
                    const message = document.getElementById("archiveMessage");

                    if (answer === "315") {
                        game.saveProgress({
                            archiveCodeSolved: true,
                            finalKey: true
                        });

                        game.updateInventory();

                        game.showModal(
                            "Cabinet Unlocked",
                            `
                                <p class="success-text">You solved the final puzzle!</p>
                                <p>The cabinet opens. Inside, you find a small golden key.</p>
                                <div class="clue-line">FINAL KEY COLLECTED</div>
                                <p>Only one thing remains. Find the exit.</p>
                            `
                        );
                    } else {
                        message.textContent = "Incorrect code. Check the evidence board and your note.";
                    }
                });
            }
        }

        if (object === "typewriter") {
            game.showModal(
                "The Typewriter",
                `
                    <p>A sheet of paper is still inside the machine.</p>
                    <p>It contains the detective's final message:</p>
                    <div class="clue-line">"The truth is never far from those who look carefully."</div>
                    <p>It seems the detective planned this investigation for someone to discover.</p>
                `
            );
        }

        if (object === "exit") {
            if (currentProgress.archiveCodeSolved && currentProgress.finalKey) {
                game.saveProgress({ completed: true });

                game.showModal(
                    "Case Solved",
                    `
                        <p class="success-text">You escaped!</p>
                        <p>The final key turns in the lock. The door opens, and you step outside.</p>
                        <p>You have solved the detective's mystery and completed the investigation.</p>
                        <div class="clue-line">THE MISSING CASE — CLOSED</div>
                        <a href="index.html" class="button button-primary modal-action">RETURN TO MAIN MENU</a>
                    `
                );
            } else {
                game.showModal(
                    "The Exit Door",
                    `
                        <p>The exit is locked.</p>
                        <p>You need to unlock the filing cabinet and find the final key first.</p>
                    `
                );
            }
        }
    }

    document.querySelectorAll("[data-object]").forEach((object) => {
        object.addEventListener("click", () => {
            investigateArchive(object.dataset.object);
        });
    });

    const hintButton = document.getElementById("hintButton");

    hintButton.addEventListener("click", () => {
        const currentProgress = game.getProgress();

        if (!currentProgress.archiveCodeSolved) {
            game.showModal(
                "A Hint",
                `
                    <p>The detective left you a note in the first room.</p>
                    <p>It says Moon, Key, Eye. Find their numbers on the evidence board and put them in that order.</p>
                `
            );
        } else {
            game.showModal(
                "A Hint",
                `
                    <p>You already have the final key.</p>
                    <p>Try the exit door to finish the investigation.</p>
                `
            );
        }
    });

    game.updateInventory();
}

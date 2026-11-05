(function () {
    const game = window.CaseGame;

    if (!game) return;

    function inspectEvidence() {
        game.saveState({ boardSeen: true });

        game.addClue(
            'evidence-board',
            'The evidence board',
            'The symbols have values: Moon = 3, Key = 1, Eye = 5.'
        );

        game.openDialog('The Evidence Board', `
            <p class="dialog-lede">Photographs, maps, and scraps of paper cover the board. Three symbols have been circled and numbered.</p>

            <div class="symbol-grid">
                <div class="code-symbol">
                    <strong>☾</strong>
                    <span>MOON</span>
                    <b>3</b>
                </div>

                <div class="code-symbol">
                    <strong>♜</strong>
                    <span>KEY</span>
                    <b>1</b>
                </div>

                <div class="code-symbol">
                    <strong>◉</strong>
                    <span>EYE</span>
                    <b>5</b>
                </div>
            </div>

            <p class="dialog-copy">The detective's note from the office gives the order: Moon, Key, Eye. Match the symbols to their numbers.</p>
        `, 'EVIDENCE');
    }

    function inspectTypewriter() {
        game.saveState({ typewriterSeen: true });

        game.addClue(
            'typewriter',
            'The final message',
            'The detective says the disappearance was staged to protect someone.'
        );

        game.openDialog('The Typewriter', `
            <p class="dialog-lede">A sheet of paper is still rolled into the typewriter. The ink is fresh enough to read.</p>

            <div class="paper-note">
                <small>UNSENT LETTER</small>
                <strong>“If you have found this, you followed the clues.”</strong>
                <p>“I was never taken. I left because someone inside the department was selling information. The archive holds the proof.”</p>
            </div>

            <p class="dialog-copy">The detective staged his disappearance to investigate someone he could not trust. The case is not what it first appeared to be.</p>
        `, 'FINAL MESSAGE');
    }

    function inspectCabinet() {
        const state = game.getState();

        if (state.cabinetSolved) {
            game.openDialog('The File Cabinet', `
                <p class="dialog-lede">The cabinet is open. The final key has already been collected.</p>

                <div class="found-item">
                    <span>🗝</span>
                    <div>
                        <strong>Archive exit key</strong>
                        <small>Added to your case inventory</small>
                    </div>
                </div>
            `, 'SOLVED PUZZLE');

            return;
        }

        if (!state.boardSeen) {
            game.openDialog('The Locked Cabinet', `
                <p class="dialog-lede">A combination lock protects the cabinet. Three symbols have been scratched into its brass plate.</p>

                <p class="dialog-copy">The evidence board may explain what the symbols mean.</p>
            `, 'LOCKED OBJECT');

            return;
        }

        if (!state.noteFound) {
            game.openDialog('The Locked Cabinet', `
                <p class="dialog-lede">You have the symbol values, but not their intended order.</p>

                <p class="dialog-copy">The detective left a note in the office. It lists three symbols in a sequence.</p>
            `, 'LOCKED OBJECT');

            return;
        }

        game.openDialog('The Locked Cabinet', `
            <p class="dialog-lede">The brass lock has three digits. Use the symbol order from the note and the values on the evidence board.</p>

            <div class="code-symbols">
                <div class="code-symbol">
                    <strong>☾</strong>
                    <span>MOON</span>
                </div>

                <div class="code-symbol">
                    <strong>♜</strong>
                    <span>KEY</span>
                </div>

                <div class="code-symbol">
                    <strong>◉</strong>
                    <span>EYE</span>
                </div>
            </div>

            <form class="puzzle-form" id="archivePuzzleForm">
                <label for="archiveCode">ENTER THE THREE-DIGIT CODE</label>

                <input class="puzzle-input" id="archiveCode" name="code" type="text" inputmode="numeric" maxlength="3" autocomplete="off" placeholder="— — —" required>

                <button class="btn btn-primary" type="submit">UNLOCK THE CABINET</button>

                <p class="form-message" id="archivePuzzleMessage" aria-live="polite"></p>
            </form>
        `, 'COMBINATION LOCK');

        const form = document.getElementById('archivePuzzleForm');

        if (!form) return;

        form.addEventListener('submit', event => {
            event.preventDefault();

            const answer = document.getElementById('archiveCode').value.replace(/\s/g, '');
            const message = document.getElementById('archivePuzzleMessage');

            if (answer === '315') {
                game.saveState({
                    cabinetSolved: true,
                    finalKey: true
                });

                game.addItem('archive-key', 'Archive exit key', '🗝');

                game.addClue(
                    'final-key',
                    'The final key',
                    'The archive cabinet contained the key to the exit.'
                );

                game.playTone(760, 0.18, 'triangle');

                game.openDialog('Cabinet unlocked', `
                    <p class="dialog-lede">The lock releases with a heavy click. Inside is a brass key and a sealed envelope.</p>

                    <div class="found-item">
                        <span>🗝</span>
                        <div>
                            <strong>Archive exit key</strong>
                            <small>Added to your case inventory</small>
                        </div>
                    </div>

                    <div class="paper-note">
                        <small>ON THE ENVELOPE</small>
                        <strong>“For the one who found the truth.”</strong>
                    </div>

                    <p class="dialog-copy">The key is marked with a tiny number 027. It must belong to the final exit.</p>

                    <div class="dialog-actions">
                        <button class="btn btn-primary" type="button" data-close>Continue</button>
                    </div>
                `, 'PUZZLE SOLVED');
            } else {
                message.textContent = 'The lock does not move. Check the note for the correct order.';
                game.playTone(170, 0.13, 'square');
            }
        });
    }

    function inspectExit() {
        const state = game.getState();

        if (!state.finalKey) {
            game.openDialog('The Final Exit', `
                <p class="dialog-lede">The last door is secured with a heavy brass lock.</p>

                <p class="dialog-copy">The filing cabinet may contain the key. There is still more to uncover in this archive.</p>
            `, 'LOCKED EXIT');

            return;
        }

        if (!state.typewriterSeen) {
            game.openDialog('The Final Exit', `
                <p class="dialog-lede">The key fits, but before leaving, you should read the page left in the typewriter.</p>

                <p class="dialog-copy">The detective's final message may explain why this case was created.</p>
            `, 'LOCKED EXIT');

            return;
        }

        game.saveState({ completed: true });

        game.openDialog('Case solved', `
            <div class="ending-art">
                <img src="assets/images/ending.webp" alt="A warmly lit doorway at the end of the investigation">
            </div>

            <p class="ending-title">THE CASE IS CLOSED</p>

            <p class="dialog-lede">The final key turns. The door opens, and the night air fills the archive.</p>

            <p class="dialog-copy">The detective was never kidnapped. He disappeared to expose a leak inside his own department. You found the proof he left behind, and the truth is finally safe.</p>

            <div class="case-closed-stamp">
                CASE NO. 027
                <strong>SOLVED</strong>
            </div>

            <div class="dialog-actions">
                <a class="btn btn-primary" href="index.html">Return to main menu</a>
            </div>
        `, 'INVESTIGATION COMPLETE');

        game.playTone(523, 0.12, 'sine');

        setTimeout(() => {
            game.playTone(659, 0.16, 'sine');
        }, 150);

        setTimeout(() => {
            game.playTone(784, 0.23, 'sine');
        }, 330);
    }

    document.querySelectorAll('[data-object]').forEach(button => {
        button.addEventListener('click', () => {
            const object = button.dataset.object;

            game.playTone(320, 0.045, 'triangle');

            if (object === 'evidence') inspectEvidence();
            if (object === 'typewriter') inspectTypewriter();
            if (object === 'cabinet') inspectCabinet();
            if (object === 'exit') inspectExit();
        });
    });

    const hintButton = document.getElementById('hintButton');

    if (hintButton) {
        hintButton.addEventListener('click', () => {
            const state = game.getState();
            const level = state.hintRoom2 || 0;

            let content;

            if (!state.boardSeen) {
                content = `
                    <div class="hint-level">
                        <span>HINT 1</span>
                        <p>The evidence board has three symbols and three numbers. Start there.</p>
                    </div>
                `;
            } else if (!state.typewriterSeen) {
                content = `
                    <div class="hint-level">
                        <span>HINT 2</span>
                        <p>The typewriter contains the detective's final message. Read it before leaving.</p>
                    </div>
                `;
            } else if (!state.cabinetSolved && level === 0) {
                content = `
                    <div class="hint-level">
                        <span>HINT 1</span>
                        <p>The note from the first room gives the symbol order. The evidence board gives each symbol a number.</p>
                    </div>
                `;
            } else if (!state.cabinetSolved && level === 1) {
                content = `
                    <div class="hint-level">
                        <span>HINT 2</span>
                        <p>The note says Moon, Key, Eye. Look at the number beneath each symbol on the board.</p>
                    </div>
                `;
            } else if (!state.cabinetSolved) {
                content = `
                    <div class="hint-level">
                        <span>HINT 3</span>
                        <p>Moon is 3, Key is 1, and Eye is 5. Put them together in that order.</p>
                    </div>
                `;
            } else {
                content = `
                    <div class="hint-level">
                        <span>HINT</span>
                        <p>You have the key and have read the final message. Go to the final exit.</p>
                    </div>
                `;
            }

            game.saveState({
                hintRoom2: Math.min(3, level + 1)
            });

            game.openDialog(
                'A small nudge',
                '<p class="dialog-lede">A good detective knows when to look for another angle.</p>' + content,
                'FIELD GUIDE'
            );
        });
    }

    if (!game.getState().officeKey || !game.getState().noteFound) {
        document.querySelectorAll('[data-object], #hintButton').forEach(button => {
            button.disabled = true;
        });

        game.openDialog('Archive locked', `
            <p class="dialog-lede">You have arrived too early. The archive door needs the brass office key, and the detective's note contains an important clue.</p>

            <div class="dialog-actions">
                <a class="btn btn-primary" href="room1.html">Return to the office</a>
            </div>
        `, 'ACCESS DENIED');
    } else {
        game.saveState({ room: 2 });
    }

    game.renderGameUI();
})();

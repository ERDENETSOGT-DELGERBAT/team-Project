(function () {
    const game = window.CaseGame;

    if (!game) return;

    function inspectCalendar() {
        game.saveState({ calendarSeen: true });

        game.addClue(
            'calendar',
            'The calendar',
            'Three marked dates: March 4, April 2, and May 7. The day numbers may form a code.'
        );

        game.openDialog('The Calendar', `
            <p class="dialog-lede">A small wall calendar hangs beside the desk. Three dates have been circled in faded red ink.</p>

            <div class="calendar-clue">
                <div><small>MARCH</small><strong>04</strong></div>
                <div><small>APRIL</small><strong>02</strong></div>
                <div><small>MAY</small><strong>07</strong></div>
            </div>

            <p class="dialog-copy">A handwritten line sits underneath the dates: “The order matters more than the month.”</p>

            <div class="clue-strip">4 &nbsp; — &nbsp; 2 &nbsp; — &nbsp; 7</div>
        `, 'OBJECT CLUE');
    }

    function inspectPortrait() {
        game.saveState({ portraitSeen: true });

        game.openDialog('The Photograph', `
            <p class="dialog-lede">A photograph of the missing detective stands on the shelf. Someone has written on the back in hurried handwriting.</p>

            <div class="paper-note">
                <small>BACK OF PHOTOGRAPH</small>
                <strong>“Trust what is written, not what is shown.”</strong>
                <p>— A. W.</p>
            </div>

            <p class="dialog-copy">The initials match the detective's name on the case file. It looks like a reminder to pay attention to written clues.</p>
        `, 'OBJECT CLUE');
    }

    function inspectBookshelf() {
        const state = game.getState();

        if (state.noteFound) {
            game.openDialog('The Bookshelf', `
                <p class="dialog-lede">The gap between the old books is empty now. You already collected the folded note.</p>

                <div class="paper-note">
                    <small>THE DETECTIVE'S NOTE</small>
                    <strong>MOON → KEY → EYE</strong>
                    <p>Keep this order. You will need it later.</p>
                </div>
            `, 'COLLECTED CLUE');

            return;
        }

        game.saveState({ bookshelfSeen: true });

        game.openDialog('The Bookshelf', `
            <p class="dialog-lede">One book sits slightly forward. Behind it is a folded piece of paper.</p>

            <div class="paper-note">
                <small>FOLDED NOTE</small>
                <strong>MOON → KEY → EYE</strong>
                <p>Three symbols. One correct order.</p>
            </div>

            <p class="dialog-copy">This looks important. Add it to your inventory before you leave.</p>

            <div class="dialog-actions">
                <button class="btn btn-primary" id="collectNoteButton" type="button">Collect note</button>
            </div>
        `, 'HIDDEN OBJECT');

        const collectButton = document.getElementById('collectNoteButton');

        if (collectButton) {
            collectButton.addEventListener('click', () => {
                game.saveState({ noteFound: true });
                game.addItem('detective-note', 'Detective’s note', '✉');

                game.addClue(
                    'note',
                    'The detective’s note',
                    'The symbols must be read in this order: Moon, Key, Eye.'
                );

                game.closeDialog();
            });
        }
    }

    function inspectDesk() {
        const state = game.getState();

        if (state.officeSolved) {
            game.openDialog('The Desk Drawer', `
                <p class="dialog-lede">The combination lock is open. The small brass key is no longer inside.</p>

                <div class="clue-strip">OFFICE KEY COLLECTED</div>

                <p class="dialog-copy">The key should fit the door leading to the private archive.</p>
            `, 'SOLVED PUZZLE');

            return;
        }

        if (!state.calendarSeen) {
            game.openDialog('The Locked Drawer', `
                <p class="dialog-lede">A three-digit combination lock keeps the drawer shut. There is a small label beside it.</p>

                <div class="paper-note">
                    <small>LOCKER LABEL</small>
                    <strong>“Check the dates.”</strong>
                    <p>Nothing else is written here.</p>
                </div>

                <p class="dialog-copy">You should inspect the calendar before guessing the code.</p>
            `, 'LOCKED OBJECT');

            return;
        }

        game.openDialog('The Locked Drawer', `
            <p class="dialog-lede">The drawer has a three-digit combination lock. The calendar shows March 4, April 2, and May 7.</p>

            <div class="clue-strip">THE DAY NUMBERS, IN ORDER</div>

            <form class="puzzle-form" id="officePuzzleForm">
                <label for="officeCode">ENTER THE THREE-DIGIT CODE</label>
                <input class="puzzle-input" id="officeCode" name="code" type="text" inputmode="numeric" maxlength="3" autocomplete="off" placeholder="— — —" required>

                <button class="btn btn-primary" type="submit">UNLOCK THE DRAWER</button>

                <p class="form-message" id="officePuzzleMessage" aria-live="polite"></p>
            </form>
        `, 'COMBINATION LOCK');

        const form = document.getElementById('officePuzzleForm');

        if (!form) return;

        form.addEventListener('submit', event => {
            event.preventDefault();

            const answer = document.getElementById('officeCode').value.replace(/\s/g, '');
            const message = document.getElementById('officePuzzleMessage');

            if (answer === '427') {
                game.saveState({
                    officeSolved: true,
                    officeKey: true
                });

                game.addItem('office-key', 'Brass office key', '🗝');

                game.addClue(
                    'office-key',
                    'The brass key',
                    'The desk drawer contained the key to the private archive.'
                );

                game.playTone(720, 0.16, 'triangle');

                game.openDialog('Drawer unlocked', `
                    <p class="dialog-lede">The lock clicks and the drawer slides open. Inside, wrapped in a piece of cloth, is a small brass key.</p>

                    <div class="found-item">
                        <span>🗝</span>
                        <div>
                            <strong>Brass office key</strong>
                            <small>Added to your case inventory</small>
                        </div>
                    </div>

                    <p class="dialog-copy">The key is old, but the teeth are clean. It has been used recently.</p>

                    <div class="dialog-actions">
                        <button class="btn btn-primary" type="button" data-close>Continue</button>
                    </div>
                `, 'PUZZLE SOLVED');
            } else {
                message.textContent = 'That combination does not work. Recheck the three dates.';
                game.playTone(170, 0.13, 'square');
            }
        });
    }

    function inspectDoor() {
        const state = game.getState();

        if (!state.officeKey) {
            game.openDialog('The Archive Door', `
                <p class="dialog-lede">A heavy wooden door is locked. The keyhole is small and brass-edged.</p>

                <p class="dialog-copy">You need to find the key. The desk drawer may contain something useful.</p>
            `, 'LOCKED EXIT');

            return;
        }

        if (!state.noteFound) {
            game.openDialog('The Archive Door', `
                <p class="dialog-lede">The brass key fits, but the detective's note may be important to the investigation ahead.</p>

                <p class="dialog-copy">Search the bookshelf before entering the archive.</p>
            `, 'LOCKED EXIT');

            return;
        }

        game.openDialog('The Archive Door', `
            <p class="dialog-lede">The key turns. Beyond the door is a narrow staircase leading down to a hidden archive.</p>

            <div class="dialog-divider"></div>

            <p class="dialog-copy">You have collected the key and the detective's note. The next part of the case is waiting.</p>

            <div class="dialog-actions">
                <a class="btn btn-primary" id="enterArchiveButton" href="room2.html">Enter the archive <span>→</span></a>
            </div>
        `, 'LOCATION UNLOCKED');

        const enterButton = document.getElementById('enterArchiveButton');

        if (enterButton) {
            enterButton.addEventListener('click', () => {
                game.saveState({ room: 2 });
            });
        }
    }

    document.querySelectorAll('[data-object]').forEach(button => {
        button.addEventListener('click', () => {
            const object = button.dataset.object;

            game.playTone(320, 0.045, 'triangle');

            if (object === 'calendar') inspectCalendar();
            if (object === 'portrait') inspectPortrait();
            if (object === 'bookshelf') inspectBookshelf();
            if (object === 'desk') inspectDesk();
            if (object === 'door') inspectDoor();
        });
    });

    const hintButton = document.getElementById('hintButton');

    if (hintButton) {
        hintButton.addEventListener('click', () => {
            const state = game.getState();
            const level = state.hintRoom1 || 0;

            let content;

            if (!state.calendarSeen) {
                content = `
                    <div class="hint-level">
                        <span>HINT 1</span>
                        <p>Look for something on the wall near the desk. Three dates have been marked.</p>
                    </div>
                `;
            } else if (!state.officeSolved && level === 0) {
                content = `
                    <div class="hint-level">
                        <span>HINT 1</span>
                        <p>The calendar shows three dates. The lock has three spaces.</p>
                    </div>
                `;
            } else if (!state.officeSolved && level === 1) {
                content = `
                    <div class="hint-level">
                        <span>HINT 2</span>
                        <p>Ignore the month names. Read only the day numbers from left to right.</p>
                    </div>
                `;
            } else if (!state.officeSolved) {
                content = `
                    <div class="hint-level">
                        <span>HINT 3</span>
                        <p>The dates are 4, 2, and 7. Put them together in that order.</p>
                    </div>
                `;
            } else if (!state.noteFound) {
                content = `
                    <div class="hint-level">
                        <span>HINT</span>
                        <p>One book on the bookshelf is sticking out. Check behind it.</p>
                    </div>
                `;
            } else {
                content = `
                    <div class="hint-level">
                        <span>HINT</span>
                        <p>You have the key and the note. Use the brass key on the exit door.</p>
                    </div>
                `;
            }

            game.saveState({
                hintRoom1: Math.min(3, level + 1)
            });

            game.openDialog(
                'A small nudge',
                '<p class="dialog-lede">The detective left help for anyone observant enough to ask.</p>' + content,
                'FIELD GUIDE'
            );
        });
    }

    game.renderGameUI();
})();

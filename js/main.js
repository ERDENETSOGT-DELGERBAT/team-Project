(function () {
    const storageKey = 'missingCaseSaveV2';
    const soundKey = 'missingCaseSound';

    const defaults = {
        version: 2,
        room: 1,
        officeSolved: false,
        officeKey: false,
        noteFound: false,
        calendarSeen: false,
        portraitSeen: false,
        bookshelfSeen: false,
        boardSeen: false,
        typewriterSeen: false,
        cabinetSolved: false,
        finalKey: false,
        completed: false,
        hintRoom1: 0,
        hintRoom2: 0,
        clues: [],
        journal: [],
        inventory: []
    };

    function getState() {
        try {
            const stored = JSON.parse(localStorage.getItem(storageKey));

            if (!stored || stored.version !== 2) {
                return { ...defaults };
            }

            return { ...defaults, ...stored };
        } catch (error) {
            return { ...defaults };
        }
    }

    function saveState(changes) {
        const next = { ...getState(), ...changes };

        try {
            localStorage.setItem(storageKey, JSON.stringify(next));
        } catch (error) {
            showToast('Progress could not be saved in this browser.');
        }

        renderGameUI();
        return next;
    }

    function addClue(id, title, note) {
        const state = getState();

        const clues = state.clues.includes(id)
            ? state.clues
            : [...state.clues, id];

        const journal = state.journal.some(entry => entry.id === id)
            ? state.journal
            : [{ id, title, note }, ...state.journal].slice(0, 6);

        saveState({ clues, journal });
    }

    function addItem(id, name, glyph) {
        const state = getState();

        const inventory = state.inventory.some(item => item.id === id)
            ? state.inventory
            : [...state.inventory, { id, name, glyph }];

        saveState({ inventory });
        playTone(620, 0.09, 'sine');
        showToast(name + ' added to your inventory.');
    }

    function hasItem(id) {
        return getState().inventory.some(item => item.id === id);
    }

    function openDialog(title, body, category) {
        const overlay = document.getElementById('gameOverlay') || document.getElementById('infoOverlay');

        if (!overlay) return;

        const titleTarget = overlay.querySelector('#dialogTitle');
        const contentTarget = overlay.querySelector('#dialogContent');
        const categoryTarget = overlay.querySelector('#dialogCategory');

        if (titleTarget) titleTarget.textContent = title;
        if (contentTarget) contentTarget.innerHTML = body;
        if (categoryTarget) categoryTarget.textContent = category || 'OBJECT INVESTIGATION';

        overlay.classList.add('is-open');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');

        const firstInput = overlay.querySelector('input');

        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }

        playTone(430, 0.045, 'sine');
    }

    function closeDialog() {
        document.querySelectorAll('.overlay.is-open').forEach(overlay => {
            overlay.classList.remove('is-open');
            overlay.setAttribute('aria-hidden', 'true');
        });

        document.body.classList.remove('modal-open');
    }

    let toastTimer;

    function showToast(message) {
        const toast = document.getElementById('toast');

        if (!toast) return;

        toast.textContent = message;
        toast.classList.add('show');

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {
            toast.classList.remove('show');
        }, 2600);
    }

    let audioContext;

    function soundEnabled() {
        return localStorage.getItem(soundKey) !== 'off';
    }

    function playTone(frequency, duration, type) {
        if (!soundEnabled()) return;

        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;

            if (!AudioContext) return;

            audioContext = audioContext || new AudioContext();

            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }

            const oscillator = audioContext.createOscillator();
            const gain = audioContext.createGain();

            oscillator.type = type || 'sine';
            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

            gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.055, audioContext.currentTime + 0.012);
            gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);

            oscillator.connect(gain);
            gain.connect(audioContext.destination);

            oscillator.start();
            oscillator.stop(audioContext.currentTime + duration + 0.02);
        } catch (error) {
            return;
        }
    }

    function syncSoundButtons() {
        document.querySelectorAll('[data-sound-toggle]').forEach(button => {
            const label = button.querySelector('.sound-state');

            if (label) {
                label.textContent = soundEnabled() ? 'ON' : 'OFF';
            }

            button.setAttribute('aria-pressed', soundEnabled() ? 'true' : 'false');
        });
    }

    function renderGameUI() {
        const state = getState();

        const inventoryGrid = document.getElementById('inventoryGrid');
        const itemCount = document.getElementById('itemCount');
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        const journalEntry = document.getElementById('journalEntry');

        const room = document.body.dataset.room;

        if (inventoryGrid) {
            inventoryGrid.innerHTML = '';

            if (!state.inventory.length) {
                inventoryGrid.innerHTML = `
                    <div class="inventory-empty">
                        <span>＋</span>
                        <small>Your collected items will appear here.</small>
                    </div>
                `;
            } else {
                state.inventory.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'inventory-item';

                    const glyph = document.createElement('span');
                    glyph.className = 'item-glyph';
                    glyph.textContent = item.glyph;

                    const name = document.createElement('small');
                    name.textContent = item.name;

                    card.append(glyph, name);
                    inventoryGrid.appendChild(card);
                });
            }
        }

        if (itemCount) {
            itemCount.textContent = state.inventory.length +
                (state.inventory.length === 1 ? ' ITEM' : ' ITEMS');
        }

        if (progressFill) {
            progressFill.style.width = Math.min(100, (state.clues.length / 6) * 100) + '%';
        }

        if (progressText) {
            progressText.textContent = state.clues.length + ' / 6 clues';
        }

        if (journalEntry) {
            journalEntry.innerHTML = '';

            if (!state.journal.length) {
                journalEntry.innerHTML = `
                    <span class="journal-mark">—</span>
                    <p>No clues recorded yet. Investigate an object to begin.</p>
                `;
            } else {
                const entry = state.journal[0];

                const mark = document.createElement('span');
                mark.className = 'journal-mark';
                mark.textContent = '“';

                const copy = document.createElement('p');
                copy.textContent = entry.title + ': ' + entry.note;

                journalEntry.append(mark, copy);
            }
        }

        const steps = room === '1'
            ? [
                ['stepCode', state.officeSolved],
                ['stepNote', state.noteFound],
                ['stepDoor', state.officeKey && state.noteFound]
            ]
            : [
                ['stepEvidence', state.boardSeen],
                ['stepCabinet', state.cabinetSolved],
                ['stepExit', state.finalKey]
            ];

        steps.forEach(([id, done]) => {
            const step = document.getElementById(id);

            if (step) {
                step.classList.toggle('done', Boolean(done));
            }
        });

        const sceneMessage = document.getElementById('sceneMessage');

        if (sceneMessage) {
            if (room === '1' && state.officeSolved && state.noteFound) {
                sceneMessage.textContent = 'You have what you need. The archive door is waiting.';
            }

            if (room === '2' && state.cabinetSolved) {
                sceneMessage.textContent = 'The final key is yours. Find the exit.';
            }
        }

        syncSoundButtons();
    }

    function resetGame() {
        try {
            localStorage.removeItem(storageKey);
        } catch (error) {
            return;
        }

        showToast('The case file has been reset.');

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 450);
    }

    document.addEventListener('click', event => {
        const closeButton = event.target.closest('[data-close]');

        if (closeButton) {
            closeDialog();
        }

        const soundButton = event.target.closest('[data-sound-toggle]');

        if (soundButton) {
            localStorage.setItem(soundKey, soundEnabled() ? 'off' : 'on');
            syncSoundButtons();

            if (soundEnabled()) {
                playTone(560, 0.08, 'sine');
            }
        }

        const overlay = event.target.classList && event.target.classList.contains('overlay')
            ? event.target
            : null;

        if (overlay) {
            closeDialog();
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            closeDialog();
        }
    });

    const howButton = document.getElementById('howButton');

    if (howButton) {
        howButton.addEventListener('click', () => {
            const overlay = document.getElementById('infoOverlay');

            overlay.classList.add('is-open');
            overlay.setAttribute('aria-hidden', 'false');
            document.body.classList.add('modal-open');
        });
    }

    const continueButton = document.getElementById('continueButton');

    if (continueButton) {
        continueButton.addEventListener('click', () => {
            const state = getState();

            if (state.completed) {
                openDialog(
                    'Case already closed',
                    `
                        <p class="dialog-copy">You have completed this investigation. Start a new case to play again.</p>
                        <div class="dialog-actions">
                            <button class="btn btn-primary" id="newCaseButton" type="button">Start new case</button>
                            <button class="btn btn-outline" data-close type="button">Stay here</button>
                        </div>
                    `,
                    'CASE STATUS'
                );

                const newCaseButton = document.getElementById('newCaseButton');

                if (newCaseButton) {
                    newCaseButton.addEventListener('click', resetGame);
                }
            } else {
                window.location.href = state.room === 2 ? 'room2.html' : 'room1.html';
            }
        });
    }

    const startButton = document.getElementById('startButton');

    if (startButton) {
        startButton.addEventListener('click', event => {
            const state = getState();

            if (state.completed) {
                event.preventDefault();
                resetGame();
            } else {
                saveState({ room: 1 });
            }
        });
    }

    const resetButton = document.getElementById('resetButton');

    if (resetButton) {
        resetButton.addEventListener('click', () => {
            openDialog(
                'Reset this case?',
                `
                    <p class="dialog-copy">Your clues, inventory, and room progress will be erased. This cannot be undone.</p>
                    <div class="dialog-actions">
                        <button class="btn btn-primary" id="confirmReset" type="button">Reset case</button>
                        <button class="btn btn-outline" data-close type="button">Cancel</button>
                    </div>
                `,
                'CONFIRM ACTION'
            );

            const confirm = document.getElementById('confirmReset');

            if (confirm) {
                confirm.addEventListener('click', resetGame);
            }
        });
    }

    document.querySelectorAll('[data-object]').forEach(button => {
        button.addEventListener('click', () => {
            playTone(320, 0.035, 'triangle');
        });
    });

    window.CaseGame = {
        getState,
        saveState,
        addClue,
        addItem,
        hasItem,
        openDialog,
        closeDialog,
        showToast,
        playTone,
        resetGame,
        renderGameUI
    };

    syncSoundButtons();
    renderGameUI();
})();

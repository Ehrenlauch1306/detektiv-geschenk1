
// ==========================================
// EINSTELLUNGEN – HIER SPÄTER ANPASSEN
// ==========================================

// Das richtige Lösungswort
const CORRECT_ANSWER = "BUCH";

// Dein echter Thalia-Gutscheincode
const VOUCHER_CODE = "DEIN-GUTSCHEINCODE";

// Startdatum der Ermittlung (Jahr-Monat-Tag)
const START_DATE = "2026-11-17";

// ==========================================
// TÄGLICHE HINWEISE
// ==========================================

function getRevealedLetters() {
    const start = new Date(START_DATE + "T00:00:00");
    const today = new Date();

    const todayDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    );

    const difference = Math.floor(
        (todayDate - start) / (1000 * 60 * 60 * 24)
    );

    return Math.max(
        0,
        Math.min(difference, CORRECT_ANSWER.length)
    );
}

// ==========================================
// BUCHSTABEN ANZEIGEN
// ==========================================

function displayLetters() {
    const container = document.getElementById("letterContainer");
    const status = document.getElementById("hintStatus");

    const revealed = getRevealedLetters();

    container.innerHTML = "";

    for (let i = 0; i < CORRECT_ANSWER.length; i++) {

        const box = document.createElement("div");

        if (i < revealed) {
            box.className = "letter";
            box.textContent = CORRECT_ANSWER[i];
        } else {
            box.className = "letter hidden-letter";
            box.textContent = "?";
        }

        container.appendChild(box);
    }

    if (revealed === 0) {
        status.textContent =
            "Noch keine Hinweise freigegeben.";
    } else if (revealed === CORRECT_ANSWER.length) {
        status.textContent =
            "Alle Buchstaben wurden freigegeben.";
    } else {
        status.textContent =
            revealed + " von " + CORRECT_ANSWER.length +
            " Buchstaben freigegeben.";
    }
}

// ==========================================
// LÖSUNG ÜBERPRÜFEN
// ==========================================

function checkAnswer() {

    const input = document.getElementById("answer");
    const feedback = document.getElementById("feedback");

    const userAnswer = input.value
        .trim()
        .toLocaleUpperCase("de-DE");

    const correctAnswer = CORRECT_ANSWER
        .trim()
        .toLocaleUpperCase("de-DE");

    if (userAnswer === correctAnswer) {

        feedback.textContent = "Ermittlung erfolgreich!";
        feedback.style.color = "#8eaf72";

        document.getElementById("voucherCode").textContent =
            VOUCHER_CODE;

        document.getElementById("success").classList.remove("hidden");

        document.getElementById("success").scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        input.disabled = true;

    } else {

        feedback.textContent =
            "Falsche Spur! Das gesuchte Wort stimmt noch nicht.";

        feedback.style.color = "#c75a50";

    }
}

// ==========================================
// ENTER-TASTE FUNKTION
// ==========================================

document.getElementById("answer").addEventListener(
    "keydown",
    function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    }
);

// ==========================================
// SEITE STARTEN
// ==========================================

displayLetters();


// ==========================================
// EINMALIGES TUTORIAL
// ==========================================

const TUTORIAL_KEY = "ermittlungsakte_tutorial_seen";

function showTutorial() {

    const alreadySeen = localStorage.getItem(TUTORIAL_KEY);

    if (!alreadySeen) {
        document.getElementById("tutorialOverlay")
            .classList.remove("hidden");
    }
}

function closeTutorial() {

    document.getElementById("tutorialOverlay")
        .classList.add("hidden");

    localStorage.setItem(TUTORIAL_KEY, "true");
}

// Tutorial beim Seitenaufruf überprüfen
showTutorial();

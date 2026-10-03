// ================================
// TYPE // SHIFT — GAME ENGINE
// LEVEL 01
// ================================

const playerCar = document.getElementById("playerCar");
const typingInput = document.getElementById("typingInput");

const scoreDisplay = document.getElementById("score");
const speedDisplay = document.getElementById("speed");
const wordDisplay = document.getElementById("wordDisplay");
const progressBar = document.getElementById("progressBar");

const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOverScreen");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
const shiftBtn = document.getElementById("shiftBtn");


// ================================
// GAME DATA
// ================================

const words = [
    "SHIFT",
    "DRIVE",
    "SPEED",
    "RACE",
    "NITRO",
    "TURBO",
    "CITY",
    "NIGHT",
    "ROAD",
    "BOOST"
];

let currentWord = "";
let score = 0;
let speed = 1;
let wordIndex = 0;

let gameRunning = false;
let playerLane = 1;

const lanes = [16.66, 50, 83.33];


// ================================
// WORD SYSTEM
// ================================

function nextWord() {

    currentWord = words[wordIndex % words.length];

    wordIndex++;

    wordDisplay.textContent = currentWord;

    typingInput.value = "";

    progressBar.style.width = "0%";
}


function checkTyping() {

    if (!gameRunning) return;

    const typed = typingInput.value.toUpperCase();

    const progress =
        Math.min(
            (typed.length / currentWord.length) * 100,
            100
        );

    progressBar.style.width = progress + "%";


    if (typed === currentWord) {

        score += 100 * speed;

        scoreDisplay.textContent =
            String(score).padStart(6, "0");

        speed = Math.min(speed + 1, 10);

        speedDisplay.textContent =
            String(speed).padStart(2, "0");

        nextWord();
    }
}


// ================================
// CAR MOVEMENT
// ================================

function moveLeft() {

    if (!gameRunning) return;

    if (playerLane > 0) {

        playerLane--;

        updateCarPosition();
    }
}


function moveRight() {

    if (!gameRunning) return;

    if (playerLane < 2) {

        playerLane++;

        updateCarPosition();
    }
}


function updateCarPosition() {

    playerCar.style.left =
        `calc(${lanes[playerLane]}% - 34px)`;
}


// ================================
// SHIFT BUTTON
// ================================

function shiftAction() {

    if (!gameRunning) return;

    score += 50;

    scoreDisplay.textContent =
        String(score).padStart(6, "0");

    speed = Math.min(speed + 1, 10);

    speedDisplay.textContent =
        String(speed).padStart(2, "0");

    nextWord();
}


// ================================
// START GAME
// ================================

function startGame() {

    score = 0;
    speed = 1;
    wordIndex = 0;
    playerLane = 1;

    scoreDisplay.textContent = "000000";
    speedDisplay.textContent = "01";

    updateCarPosition();

    gameRunning = true;

    startScreen.classList.add("hidden");
    gameOverScreen.classList.add("hidden");

    nextWord();

    typingInput.focus();
}


// ================================
// GAME OVER
// ================================

function gameOver() {

    gameRunning = false;

    document.getElementById("finalScore").textContent =
        String(score).padStart(6, "0");

    gameOverScreen.classList.remove("hidden");
}


// ================================
// BUTTON EVENTS
// ================================

startBtn.addEventListener("click", startGame);

restartBtn.addEventListener("click", startGame);

leftBtn.addEventListener("click", moveLeft);

rightBtn.addEventListener("click", moveRight);

shiftBtn.addEventListener("click", shiftAction);

typingInput.addEventListener("input", checkTyping);


// ================================
// KEYBOARD SUPPORT
// ================================

document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowLeft") {
        moveLeft();
    }

    if (event.key === "ArrowRight") {
        moveRight();
    }

    if (event.key === "Shift") {
        shiftAction();
    }

});


// ================================
// INITIAL STATE
// ================================

updateCarPosition();
nextWord();

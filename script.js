/* =========================================================
TYPE // SHIFT
Professional Multi-Level Typing Racing Game
========================================================= */

/* ================= GAME DATA ================= */

const levels = [
{
name: "NEON CITY",
words: [
"SHIFT", "DRIVE", "RACE", "SPEED",
"TURBO", "NITRO", "ROAD", "LIGHT"
],
speed: 2.0,
target: 5,
theme: "level-night"
},

{
    name: "NIGHT HIGHWAY",
    words: [
        "HIGHWAY", "ENGINE", "MOTION", "RACING",
        "BOOST", "POWER", "FAST", "TURN"
    ],
    speed: 2.5,
    target: 6,
    theme: "level-night"
},

{
    name: "SUNSET ROAD",
    words: [
        "SUNSET", "JOURNEY", "HORIZON", "TRAVEL",
        "SUN", "TRACK", "CRUISE", "DRIFT"
    ],
    speed: 3.0,
    target: 7,
    theme: "level-sunset"
},

{
    name: "RAIN DRIVE",
    words: [
        "RAIN", "STORM", "WATER", "WIPER",
        "THUNDER", "CLOUD", "DROP", "WET"
    ],
    speed: 3.5,
    target: 7,
    theme: "level-rain"
},

{
    name: "DESERT RUN",
    words: [
        "DESERT", "SAND", "HEAT", "DUST",
        "MIRAGE", "TRACK", "SUN", "ROAD"
    ],
    speed: 4.0,
    target: 8,
    theme: "level-desert"
},

{
    name: "CYBER CITY",
    words: [
        "CYBER", "DIGITAL", "SYSTEM", "MATRIX",
        "NEON", "CODE", "BYTE", "NETWORK"
    ],
    speed: 4.5,
    target: 8,
    theme: "level-night"
},

{
    name: "DARK TUNNEL",
    words: [
        "TUNNEL", "DARK", "SHADOW", "SIGNAL",
        "LASER", "NIGHT", "ECHO", "VOID"
    ],
    speed: 5.0,
    target: 9,
    theme: "level-night"
},

{
    name: "FUTURE HIGHWAY",
    words: [
        "FUTURE", "ROBOT", "QUANTUM", "TECH",
        "VISION", "AI", "CORE", "DATA"
    ],
    speed: 5.5,
    target: 9,
    theme: "level-night"
},

{
    name: "INFINITE ROAD",
    words: [
        "INFINITE", "GALAXY", "COSMIC", "SPACE",
        "STAR", "ORBIT", "LIGHT", "ENERGY"
    ],
    speed: 6.0,
    target: 10,
    theme: "level-night"
},

{
    name: "FINAL SHIFT",
    words: [
        "ULTIMATE", "CHAMPION", "MASTER",
        "VICTORY", "LEGEND", "RACER",
        "DESTINY", "FINISH"
    ],
    speed: 6.5,
    target: 10,
    theme: "level-night"
}

];

/* ================= DOM ================= */

const game = document.getElementById("game");

const playerCar = document.getElementById("playerCar");

const enemyContainer =
document.getElementById("enemyContainer");

const levelElement =
document.getElementById("level");

const scoreElement =
document.getElementById("score");

const speedElement =
document.getElementById("speed");

const livesElement =
document.getElementById("lives");

const wordDisplay =
document.getElementById("wordDisplay");

const typingInput =
document.getElementById("typingInput");

const progressBar =
document.getElementById("progressBar");

const comboElement =
document.getElementById("combo");

const environmentName =
document.getElementById("environmentName");

const startScreen =
document.getElementById("startScreen");

const gameOverScreen =
document.getElementById("gameOverScreen");

const levelCompleteScreen =
document.getElementById("levelCompleteScreen");

const pauseScreen =
document.getElementById("pauseScreen");

const startBtn =
document.getElementById("startBtn");

const restartBtn =
document.getElementById("restartBtn");

const nextLevelBtn =
document.getElementById("nextLevelBtn");

const pauseBtn =
document.getElementById("pauseBtn");

const resumeBtn =
document.getElementById("resumeBtn");

const finalScore =
document.getElementById("finalScore");

const finalLevel =
document.getElementById("finalLevel");

const completedLevel =
document.getElementById("completedLevel");

const levelScore =
document.getElementById("levelScore");

const nextEnvironment =
document.getElementById("nextEnvironment");

/* ================= GAME STATE ================= */

let currentLevel = 0;

let score = 0;

let lives = 3;

let combo = 0;

let wordIndex = 0;

let currentWord = "";

let completedWords = 0;

let playerLane = 1;

let gameRunning = false;

let paused = false;

let enemyCars = [];

let enemyTimer = null;

let animationFrame = null;

/* ================= LANES ================= */

function getLanePosition(lane) {

const road = document.querySelector(".road");

const roadWidth = road.clientWidth;

const laneWidth = roadWidth / 3;

return (
    laneWidth * lane +
    laneWidth / 2 -
    34
);

}

/* ================= PLAYER MOVEMENT ================= */

function updatePlayerPosition() {

playerCar.style.left =
    getLanePosition(playerLane) + "px";

}

function moveLeft() {

if (!gameRunning || paused) return;

if (playerLane > 0) {

    playerLane--;

    updatePlayerPosition();
}

}

function moveRight() {

if (!gameRunning || paused) return;

if (playerLane < 2) {

    playerLane++;

    updatePlayerPosition();
}

}

/* ================= BUTTON CONTROLS ================= */

document
.getElementById("leftBtn")
.addEventListener("click", moveLeft);

document
.getElementById("rightBtn")
.addEventListener("click", moveRight);

/* ================= KEYBOARD ================= */

document.addEventListener("keydown", function (event) {

if (event.key === "ArrowLeft") {

    event.preventDefault();

    moveLeft();
}

if (event.key === "ArrowRight") {

    event.preventDefault();

    moveRight();
}

if (event.key === " ") {

    event.preventDefault();

    if (gameRunning) {

        paused
            ? resumeGame()
            : pauseGame();
    }
}

});

/* ================= WORD SYSTEM ================= */

function getRandomWord() {

const words =
    levels[currentLevel].words;

return words[
    Math.floor(
        Math.random() * words.length
    )
];

}

function showNextWord() {

currentWord = getRandomWord();

wordDisplay.textContent =
    currentWord;

typingInput.value = "";

progressBar.style.width = "0%";

}

/* ================= TYPING ================= */

typingInput.addEventListener(
"input",
function () {

    if (!gameRunning || paused) return;

    const typed =
        typingInput.value
            .toUpperCase()
            .trim();

    const target =
        currentWord;

    let correct = 0;

    for (
        let i = 0;
        i < typed.length &&
        i < target.length;
        i++
    ) {

        if (typed[i] === target[i]) {

            correct++;
        }
    }

    const progress =
        target.length === 0
            ? 0
            : (correct / target.length) * 100;

    progressBar.style.width =
        Math.min(progress, 100) + "%";


    /* WORD COMPLETED */

    if (typed === target) {

        completeWord();
    }


    /* WRONG INPUT */

    else if (
        typed.length > 0 &&
        !target.startsWith(typed)
    ) {

        typingInput.value = "";

        progressBar.style.width = "0%";

        combo = 0;

        updateCombo();
    }

}

);

/* ================= COMPLETE WORD ================= */

function completeWord() {

completedWords++;

combo++;

const comboBonus =
    Math.min(combo, 10) * 10;

const baseScore =
    100 + comboBonus;

score += baseScore;

updateScore();

updateCombo();

showNextWord();


/* LEVEL COMPLETE */

if (
    completedWords >=
    levels[currentLevel].target
) {

    completeLevel();
}

}

/* ================= SCORE ================= */

function updateScore() {

scoreElement.textContent =
    String(score).padStart(6, "0");

}

/* ================= COMBO ================= */

function updateCombo() {

comboElement.textContent =
    "x" + combo;

}

/* ================= LIVES ================= */

function updateLives() {

let hearts = "";

for (let i = 0; i < lives; i++) {

    hearts += "♥ ";
}

livesElement.textContent =
    hearts.trim();

}

/* ================= LEVEL ================= */

function updateLevelDisplay() {

const number =
    String(currentLevel + 1)
        .padStart(2, "0");

levelElement.textContent =
    number;

environmentName.textContent =
    levels[currentLevel].name;

speedElement.textContent =
    Math.round(
        levels[currentLevel].speed * 10
    );

game.classList.remove(
    "level-night",
    "level-sunset",
    "level-rain",
    "level-desert"
);

game.classList.add(
    levels[currentLevel].theme
);

}

/* ================= START GAME ================= */

startBtn.addEventListener(
"click",
function () {

    startGame();

}

);

function startGame() {

currentLevel = 0;

score = 0;

lives = 3;

combo = 0;

completedWords = 0;

playerLane = 1;

gameRunning = true;

paused = false;

updateScore();

updateLives();

updateCombo();

updateLevelDisplay();

updatePlayerPosition();

startScreen.classList.add("hidden");

gameOverScreen.classList.add("hidden");

levelCompleteScreen.classList.add("hidden");

pauseScreen.classList.add("hidden");

showNextWord();

clearEnemies();

startEnemySystem();

typingInput.focus();

}

/* ================= LEVEL COMPLETE ================= */

function completeLevel() {

gameRunning = false;

stopEnemySystem();

clearEnemies();

completedLevel.textContent =
    String(currentLevel + 1)
        .padStart(2, "0");

levelScore.textContent =
    String(score)
        .padStart(6, "0");


if (
    currentLevel <
    levels.length - 1
) {

    nextEnvironment.textContent =
        levels[currentLevel + 1].name;

    nextLevelBtn.textContent =
        "NEXT LEVEL";

} else {

    nextEnvironment.textContent =
        "ALL LEVELS COMPLETE";

    nextLevelBtn.textContent =
        "PLAY AGAIN";
}


levelCompleteScreen.classList.remove(
    "hidden"
);

}

/* ================= NEXT LEVEL ================= */

nextLevelBtn.addEventListener(
"click",
function () {

    if (
        currentLevel >=
        levels.length - 1
    ) {

        startGame();

        return;
    }


    currentLevel++;

    completedWords = 0;

    combo = 0;

    playerLane = 1;

    gameRunning = true;

    paused = false;

    updateLevelDisplay();

    updateCombo();

    updatePlayerPosition();

    levelCompleteScreen.classList.add(
        "hidden"
    );

    showNextWord();

    startEnemySystem();

    typingInput.focus();

}

);

/* ================= ENEMY SYSTEM ================= */

function startEnemySystem() {

stopEnemySystem();

enemyTimer = setInterval(
    createEnemy,
    Math.max(
        650,
        1500 -
        currentLevel * 70
    )
);

animationFrame =
    requestAnimationFrame(
        updateEnemies
    );

}

function stopEnemySystem() {

if (enemyTimer) {

    clearInterval(enemyTimer);

    enemyTimer = null;
}

if (animationFrame) {

    cancelAnimationFrame(
        animationFrame
    );

    animationFrame = null;
}

}

/* ================= CREATE ENEMY ================= */

function createEnemy() {

if (!gameRunning || paused) return;

const enemy =
    document.createElement("div");

enemy.className =
    "enemy-car";

const lane =
    Math.floor(
        Math.random() * 3
    );

enemy.dataset.lane =
    lane;

enemy.dataset.y =
    "-120";

enemy.style.left =
    getEnemyLanePosition(lane) + "px";

enemy.style.top =
    "-120px";

enemyContainer.appendChild(enemy);

enemyCars.push(enemy);

}

/* ================= ENEMY POSITION ================= */

function getEnemyLanePosition(lane) {

const road =
    document.querySelector(".road");

const roadWidth =
    road.clientWidth;

const laneWidth =
    roadWidth / 3;

return (
    laneWidth * lane +
    laneWidth / 2 -
    29
);

}

/* ================= ENEMY ANIMATION ================= */

function updateEnemies() {

if (!gameRunning) return;

if (!paused) {

    const gameSpeed =
        levels[currentLevel].speed;

    enemyCars.forEach(
        (enemy, index) => {

            let y =
                parseFloat(
                    enemy.dataset.y
                );

            y += gameSpeed;

            enemy.dataset.y = y;

            enemy.style.top =
                y + "px";


            /* COLLISION */

            if (
                checkCollision(enemy)
            ) {

                hitPlayer(enemy);

            }


            /* REMOVE */

            if (y > window.innerHeight) {

                enemy.remove();

                enemyCars.splice(
                    index,
                    1
                );
            }

        }
    );
}

animationFrame =
    requestAnimationFrame(
        updateEnemies
    );

}

/* ================= COLLISION ================= */

function checkCollision(enemy) {

const enemyLane =
    Number(
        enemy.dataset.lane
    );

if (
    enemyLane !== playerLane
) {

    return false;
}

const enemyRect =
    enemy.getBoundingClientRect();

const playerRect =
    playerCar.getBoundingClientRect();


return !(
    enemyRect.right <
    playerRect.left ||

    enemyRect.left >
    playerRect.right ||

    enemyRect.bottom <
    playerRect.top ||

    enemyRect.top >
    playerRect.bottom
);

}

/* ================= PLAYER HIT ================= */

function hitPlayer(enemy) {

enemy.remove();

const index =
    enemyCars.indexOf(enemy);

if (index !== -1) {

    enemyCars.splice(
        index,
        1
    );
}


lives--;

combo = 0;

updateLives();

updateCombo();


playerCar.style.transform =
    "translateX(8px)";

setTimeout(
    function () {

        playerCar.style.transform =
            "translateX(-8px)";

    },
    70
);


setTimeout(
    function () {

        playerCar.style.transform =
            "translateX(0)";

    },
    140
);


if (lives <= 0) {

    endGame();
}

}

/* ================= CLEAR ENEMIES ================= */

function clearEnemies() {

enemyCars.forEach(
    enemy => enemy.remove()
);

enemyCars = [];

}

/* ================= GAME OVER ================= */

function endGame() {

gameRunning = false;

stopEnemySystem();

clearEnemies();

finalScore.textContent =
    String(score)
        .padStart(6, "0");

finalLevel.textContent =
    String(currentLevel + 1)
        .padStart(2, "0");

gameOverScreen.classList.remove(
    "hidden"
);

}

/* ================= RESTART ================= */

restartBtn.addEventListener(
"click",
function () {

    startGame();

}

);

/* ================= PAUSE ================= */

pauseBtn.addEventListener(
"click",
function () {

    if (!gameRunning) return;

    paused
        ? resumeGame()
        : pauseGame();

}

);

function pauseGame() {

paused = true;

pauseScreen.classList.remove(
    "hidden"
);

typingInput.blur();

}

function resumeGame() {

paused = false;

pauseScreen.classList.add(
    "hidden"
);

typingInput.focus();

}

resumeBtn.addEventListener(
"click",
resumeGame
);

/* ================= SHIFT BUTTON ================= */

document
.getElementById("shiftBtn")
.addEventListener(
"click",
function () {

        typingInput.focus();

    }
);

/* ================= MOBILE SWIPE ================= */

let touchStartX = 0;

let touchEndX = 0;

game.addEventListener(
"touchstart",
function (event) {

    touchStartX =
        event.changedTouches[0].screenX;

},
{ passive: true }

);

game.addEventListener(
"touchend",
function (event) {

    touchEndX =
        event.changedTouches[0].screenX;

    const distance =
        touchEndX - touchStartX;

    if (
        Math.abs(distance) < 40
    ) {

        return;
    }

    if (distance > 0) {

        moveRight();

    } else {

        moveLeft();
    }

},
{ passive: true }

);

/* ================= RESIZE ================= */

window.addEventListener(
"resize",
function () {

    updatePlayerPosition();

}

);

/* ================= INITIAL SETUP ================= */

updateLevelDisplay();

updateScore();

updateLives();

updateCombo();

updatePlayerPosition();

showNextWord();
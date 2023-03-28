// Display/UI

import {
    TILE_STATUSES,
    createBoard,
    markTile,
    revealTile,
    checkWin,
    checkLose,
} from "./minesweeper.js"

const BOARD_SIZE = 100
const NUMBER_OF_MINES = 5

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES)
const boardElement = document.querySelector(".board")
const minesLeftText = document.querySelector("[data-mine-count]")
const messageText = document.querySelector(".subtext")

board.forEach(row => {
    row.forEach(tile => {
        boardElement.append(tile.element)
        tile.element.addEventListener("click", () => {
            revealTile(board, tile)
            checkGameEnd()
        })
        tile.element.addEventListener("contextmenu", e => {
            e.preventDefault()
            markTile(tile)
            listMinesLeft()
        })
    })
})
boardElement.style.setProperty("--size", BOARD_SIZE)
minesLeftText.textContent = NUMBER_OF_MINES

function listMinesLeft() {
    const markedTilesCount = board.reduce((count, row) => {
        return (
            count + row.filter(tile => tile.status === TILE_STATUSES.MARKED).length
        )
    }, 0)

    minesLeftText.textContent = NUMBER_OF_MINES - markedTilesCount
}

function checkGameEnd() {
    const win = checkWin(board)
    const lose = checkLose(board)

    if (win || lose) {
        boardElement.addEventListener("click", stopProp, { capture: true })
        boardElement.addEventListener("contextmenu", stopProp, { capture: true })
    }

    if (win) {
        messageText.textContent = "You Win"
    }
    if (lose) {
        messageText.textContent = "You Lose"
        board.forEach(row => {
            row.forEach(tile => {
                if (tile.status === TILE_STATUSES.MARKED) markTile(tile)
                if (tile.mine) revealTile(board, tile)
            })
        })
    }

    // Додайте результати гравця до таблиці результатів
    const name = prompt("Enter your name:");
    addScoreToScoreboard(name, time);
}
function addScoreToScoreboard(name, time) {
    // Отримайте таблицю результатів
    const scoreboard = document.getElementById('scoreboard');

    // Створіть новий рядок таблиці результатів
    const row = document.createElement('tr');

    // Створіть комірки для рядка таблиці результатів
    const rankCell = document.createElement('td');
    const nameCell = document.createElement('td');
    const timeCell = document.createElement('td');

    // Встановіть значення комірок
    rankCell.textContent = getRank(); // Ваша функція для визначення рангу
    nameCell.textContent = name;
    timeCell.textContent = time;

    // Додайте комірки до рядка таблиці результатів
    row.appendChild(rankCell);
    row.appendChild(nameCell);
    row.appendChild(timeCell);

    // Додайте рядок таблиці результатів до таблиці результатів
    scoreboard.querySelector('tbody').appendChild(row);
}
function saveScoreToLocalStorage(name, time) {
    // Отримайте поточний список результатів з локального сховища браузера
    const scores = JSON.parse(localStorage.getItem('scores')) || [];

    // Додайте новий результат до списку результатів
    scores.push({ name, time });

    // Збережіть оновлений список результатів у локальному сховищі браузера
    localStorage.setItem('scores', JSON.stringify(scores));
}
function endGame() {
    function endGame() {
        // Отримайте ім'я гравця
        const name = prompt('Enter your name:');

        // Отримайте час гри
        const endTime = new Date().getTime();
        const time = (endTime - startTime) / 1000;

        // Додайте результат гри до таблиці результатів та збережіть його в локальному сховищі
        addScoreToScoreboard(name, time);
        saveScoreToLocalStorage(name, time);

        // Оновіть статистику на екрані
        updateStats();
    }
    function updateStats() {
        // Отримайте таблицю результатів
        const scoreboard = document.getElementById('scoreboard');

        // Очистіть таблицю результатів
        scoreboard.querySelector('tbody').innerHTML = '';

        // Отримайте результати з локального сховища
        const scores = getScoresFromLocalStorage();

        // Додайте кожен результат до таблиці результатів
        scores.forEach((score, index) => {
            addScoreToScoreboard(score.name, score.time);
        });
    }
    function getScoresFromLocalStorage() {
        const scores = localStorage.getItem('scores');

        if (scores) {
            return JSON.parse(scores);
        }

        return [];
    }

    function saveScoreToLocalStorage(name, time) {
        const score = { name, time };
        const scores = getScoresFromLocalStorage();

        scores.push(score);

        localStorage.setItem('scores', JSON.stringify(scores));
    }
    function getScoresFromLocalStorage() {
        const scores = localStorage.getItem('scores');

        if (scores) {
            return JSON.parse(scores);
        }

        return [];
    }

    function saveScoreToLocalStorage(name, time) {
        const score = { name, time };
        const scores = getScoresFromLocalStorage();

        scores.push(score);

        localStorage.setItem('scores', JSON.stringify(scores));
    }
    const viewStatsButton = document.querySelector('#view-stats');

    viewStatsButton.addEventListener('click', () => {
        updateStats();
    });


    // Додайте рекорд до таблиці результатів
    addScoreToScoreboard(name, time);
    // Очистіть дошку гри
    boardElement.innerHTML = '';
    // Перезапустіть гру
    startGame();
}


// Додайте результат до таблиці результатів та збережіть його в локальному сховищі браузера
    addScoreToScoreboard(name, time);
    saveScoreToLocalStorage(name, time);
function checkGameEnd() {
    const win = checkWin(board)
    const lose = checkLose(board)

    if (win || lose) {
        boardElement.addEventListener("click", stopProp, { capture: true })
        boardElement.addEventListener("contextmenu", stopProp, { capture: true })

        const time = new Date().getTime() - startTime;
        endGame();
    }

    if (win) {
        messageText.textContent = "You Win"
    }
    if (lose) {
        messageText.textContent = "You Lose"
        board.forEach(row => {
            row.forEach(tile => {
                if (tile.status === TILE_STATUSES.MARKED) markTile(tile)
                if (tile.mine) revealTile(board, tile)
            })
        })
    }


}
javascript
window.addEventListener('load', () => {
    const scores = JSON.parse(localStorage.getItem('scores')) || [];

    // Сортування результатів за часом
    scores.sort((a, b) => a.time - b.time);

    // Додайте всі результати до таблиці результатів
    scores.forEach((score, index) => {
        addScoreToScoreboard(score.name, score.time);
    });
});

function stopProp(e) {
    e.stopImmediatePropagation()
}

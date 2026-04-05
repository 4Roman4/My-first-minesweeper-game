export const data = {
    game_board: document.querySelector("#game_board"),
    game_board_info: document.querySelector("#game_board_info"),
    game_board_winOrLose: document.querySelector("#game_board_winOrLose"),

    game_settings_size: document.querySelector("#game_settings_size").value,
    game_settings_difficulty: document.querySelector("#game_settings_difficulty").value,
    game_createBoard: document.getElementById("game_createBoard"),

    game_data: []
}

console.log("Successfully imported 'createBoard.js' and linked to 'minesweeper.js'");

/* Game logic for creating board */

export function createBoard() {
    data.game_board.textContent = "Hello there";
    console.log("This is working");
}
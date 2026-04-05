export const data = {
    game_board: document.querySelector("#game_board"),
    game_board_info: document.querySelector("#game_board_info"),
    game_board_winOrLose: document.querySelector("#game_board_winOrLose"),

    game_settings_size: document.querySelector("#game_settings_size"),
    game_settings_difficulty: document.querySelector("#game_settings_difficulty"),
    game_createBoard: document.getElementById("game_createBoard"),

    game_data: []
}

console.log("Successfully imported 'createBoard.js' and linked to 'minesweeper.js'");

/* Game logic for creating board */

export function createBoard() {
    
    // Clearing everything
    data.game_board.innerHTML = "";
    data.game_data = [];

    // Handling the user input
    let selection_size;
    let selection_difficulty;

    switch (data.game_settings_size.value) {
        case "8x8":
            selection_size = 8;
            break;
        case "16x16":
            selection_size = 16;
            break;
        case "24x24":
            selection_size = 24;
            break;
        case "32x32":
            selection_size = 32;
            break;    
        default:
            return "ERROR (createBoard): No size selected";
    }

    switch (data.game_settings_difficulty.value) {
        case "Easy":
            selection_difficulty = Math.floor(selection_size * 0.75);
            break;
        case "Medium":
            selection_difficulty = Math.floor(selection_size * 1.5);
            break;
        case "Hard":
            selection_difficulty = Math.floor(selection_size * 2.5);
            break;
        default:
            return "ERROR(createBoard): No difficulty selected";
    }

    console.log(`Game size selected: ${selection_size}\nGame difficulty selected (number of mines): ${selection_difficulty}`);
    data.game_board.style.gridTemplateColumns = `repeat(${selection_size}, 32px)`;

    /* Creating the board */

    for (let r = 0; r < selection_size; r++) {

        const row = []

        for (let c = 0; c < selection_size; c++) {

            const cell = {
                id: `${r}-${c}`,
                minesAround: 0,
                isRevealed: false,
                isMine: false,
                isFlagged: false
            };

            row.push(cell);

            const cell_visual = document.createElement("div");
            cell_visual.classList.add("cell");
            cell_visual.classList.add("clicked_false");
            cell_visual.setAttribute("id", `${cell.id}`);
            cell_visual.addEventListener("contextmenu", (e) => e.preventDefault());
            data.game_board.appendChild(cell_visual);

        }

        data.game_data.push(row);

    }
}
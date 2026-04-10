import { cellSpread } from "./leftClick.js";
import { cellFlag } from "./rightClick.js";

export const data = {
    game_board: document.querySelector("#game_board"),
    game_board_info: document.querySelector("#game_board_info"),
    game_board_winOrLose: document.querySelector("#game_board_winOrLose"),

    game_settings_size: document.querySelector("#game_settings_size"),
    game_settings_difficulty: document.querySelector("#game_settings_difficulty"),
    game_createBoard: document.getElementById("game_createBoard"),
    game_win: document.getElementById("game_win"),
    game_lose: document.getElementById("game_lose"),

    game_play_selectedSize: 0,
    game_play_selectedDifficulty: "",
    game_play_toWin: 0,

    game_data: []
}

console.log("Successfully imported 'createBoard.js' and linked to 'minesweeper.js'");

/* Game logic for creating board */

export function createBoard() {
    
    // Clearing everything
    data.game_board.innerHTML = "";
    data.game_data = [];
    document.getElementById("game_board_lose").style.display = "none";
    document.getElementById("game_board_win").style.display = "none";
    document.querySelector("#game_board_info").style.display = "block";

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
    }

    console.log(`Game size selected: ${selection_size}\nGame difficulty selected (max. mines): ${selection_difficulty}`);
    data.game_board.style.gridTemplateColumns = `repeat(${selection_size}, 32px)`;
    data.game_play_selectedSize = selection_size;

    /* Creating the board */

    for (let r = 0; r < selection_size; r++) {

        const row = []

        for (let c = 0; c < selection_size; c++) {

            const cell = {
                id: `${r}-${c}`,
                minesAround: Number(0),
                isRevealed: false,
                isMine: false,
                isFlagged: false
            };

            row.push(cell);

            const cell_visual = document.createElement("div");
            cell_visual.classList.add("cell");
            cell_visual.classList.add("clicked_false");
            cell_visual.setAttribute("id", `${cell.id}`);
            cell_visual.addEventListener("contextmenu", cellFlag);
            data.game_board.appendChild(cell_visual);

        }

        data.game_data.push(row);

    }

    /* Creating mines */

    const mines = new Set();

    while (mines.size !== selection_difficulty) {
        const random_row = Math.floor(Math.random() * selection_size);
        const random_col = Math.floor(Math.random() * selection_size);

        let mine;

        if ((random_row >= 0 && random_col < selection_size) && (random_col >= 0 && random_col < selection_size)) {
            mine = `${random_row}-${random_col}`;
        } // TODO: For whatever reason, sometimes the amount of mines are not equal to the selection size and just drops one or two mines away...
        
        /*
            I thought the bug occurs only because the browser can't think that fast
            when you refresh the board way too many times in a short amount of times,
            but it does that even when you leave like a second before you click...
            I don't really understand what causes this and I have to look into this later.
        */
        
        if (!mines.has(mine)) {
            mines.add(mine);
        }
    }

    // Creating mine cells
    console.log("Setting up mines at:");
    mines.forEach(mine => {
        const mine_split = mine.split("-");
        let row = Number(mine_split[0]);
        let col = Number(mine_split[1]);
        data.game_data[row][col].isMine = true;

        //document.getElementById(`${row}-${col}`).textContent = "💣";
        console.log(`Row: ${row}\nColumn: ${col}`);
    });

    data.game_play_selectedDifficulty = mines.size;
    data.game_play_toWin = mines.size;
    document.querySelector("#game_play_info").textContent = data.game_play_selectedDifficulty;

    // Checking for neighbours
    for (let r = 0; r < selection_size; r++) {
        for (let c = 0; c < selection_size; c++) {

            const cellItself = data.game_data[r][c]
            const neighbour_id = [
                [r - 1, c - 1], [r - 1, c], [r - 1, c + 1],
                [r, c - 1], [r, c + 1],
                [r + 1, c - 1], [r + 1, c], [r + 1, c + 1]
            ];

            const neighbour_checker = neighbour_id.filter(cell => {
                const cell_r = cell[0];
                const cell_c = cell[1];

                return (cell_r >= 0 && cell_r < selection_size) &&
                    (cell_c >= 0 && cell_c < selection_size) &&
                    data.game_data[cell_r][cell_c].isMine === true;
            });

            if (cellItself.isMine === false && neighbour_checker.length > 0) {
                cellItself.minesAround = neighbour_checker.length;
                // const num = document.createElement("p");
                // num.textContent = `${neighbour_checker.length}`;
                // num.setAttribute("id", `num-${r}-${c}`);
                // num.style.fontSize = "0rem";
                // document.getElementById(`${r}-${c}`).appendChild(num);
            }
        }
    }

    /*

    This guy did not work. I don't really know why.
    For some reason, some cells would get checked twice and it would mess up the counter.
    I decided to persue a simple for loop above and it seems to do the trick just fine.
    I'll check later what caused the bug before, but for now, this should work fine.

    mines.forEach(mine => {
        const row = mine[0];
        const col = mine[1];

        const neighbour_id = [
            [row - 1, col - 1], [row - 1, col], [row - 1, col + 1],
            [row, col - 1], [row, col + 1],
            [row + 1, col - 1], [row + 1, col], [row + 1, col + 1]
        ];

        const neighbour_check_valid = neighbour_id.filter(id => {
            const id_r = id[0];
            const id_c = id[1];

            return (id_r >= 0 && id_r < selection_size) && (id_c >= 0 && id_c < selection_size)
        });

        const neighHelp = [];

        neighbour_check_valid.forEach(neigh => {
            const neigh_r = neigh[0];
            const neigh_c = neigh[1];

            if (data.game_data[neigh_r][neigh_c].isMine === false) {
                data.game_data[neigh_r][neigh_c].minesAround++;
                document.getElementById(`${neigh_r}-${neigh_c}`).textContent = data.game_data[neigh_r][neigh_c].minesAround;
                neighHelp.push(`${neigh_r}-${neigh_c}`);
            };
        });

        console.log(`Checking neighbours (valid): ` + neighbour_check_valid.join(" / ") + "\n" + "Checking neighbours (mine): " + neighHelp.join(" / "));
    })

    */
}
import { data } from "./createBoard.js";

/* Handling the left click */

export function cellSpread(cell) {

    if (!cell.target.classList.contains("cell") || !cell.target.classList.contains("clicked_false")) {
        return;
    }

    const gettingID = cell.target.id.split("-");
    const row = gettingID[0];
    const col = gettingID[1];

    const clickedCell_data = data.game_data[row][col];
    const clickedCell_visual = document.getElementById(`${row}-${col}`);

    console.log(`Left clicked on cell: ${gettingID.join("-")}`);

    switch (clickedCell_data.isMine) {
        case true:
            clickedCell_data.isRevealed = true;
            clickedCell_visual.style.backgroundColor = "red";

            for (let r = 0; r < data.game_play_selectedSize; r++) {
                for (let c = 0; c < data.game_play_selectedSize; c++) {

                    data.game_data[r][c].isRevealed = true;
                    document.getElementById(`${r}-${c}`).classList.remove("clicked_false");
                    document.getElementById(`${r}-${c}`).classList.remove("clicked_true");

                }
            }
            break;
    
        default:
            clickedCell_data.isRevealed = true;
            clickedCell_visual.classList.remove("clicked_false");
            clickedCell_visual.classList.add("clicked_true");

            break;
    }
}
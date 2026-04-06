import { data } from "./createBoard.js";

/* Handling the left click */

export function cellSpread(cell) {

    if (!cell.target.classList.contains("cell") || !cell.target.classList.contains("clicked_false")) {
        return;
    }

    const gettingID = cell.target.id.split("-");
    const row = Number(gettingID[0]);
    const col = Number(gettingID[1]);

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
            spreading(row, col);
            break;
    }

    function spreading(row, col) {

        clickedCell_data.isRevealed = true;
        clickedCell_visual.classList.remove("clicked_false");
        clickedCell_visual.classList.add("clicked_true");

        /* Spread */
        const neighbours = [
            [row-1, col-1], [row-1, col], [row-1, col+1],
            [row, col-1], [row, col+1],
            [row+1, col-1], [row+1, col], [row+1, col+1]
        ];

        const neighbours_checked = neighbours.filter(neigh => {
            const neigh_row = neigh[0];
            const neigh_col = neigh[1];

            return (neigh_row >= 0 && neigh_row < data.game_play_selectedSize) 
                && (neigh_col >= 0 && neigh_col < data.game_play_selectedSize) 
                && data.game_data[neigh_row][neigh_col].isRevealed === false;
        });

        console.log(neighbours_checked);
    }
}
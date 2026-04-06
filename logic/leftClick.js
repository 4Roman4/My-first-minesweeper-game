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
    console.log("Number of mines around: " + clickedCell_data.minesAround);

    switch (clickedCell_data.isMine) {
        case true:
            clickedCell_data.isRevealed = true;
            clickedCell_visual.innerHTML = "💣"
            clickedCell_visual.style.backgroundColor = "red";

            for (let r = 0; r < data.game_play_selectedSize; r++) {
                for (let c = 0; c < data.game_play_selectedSize; c++) {

                    data.game_data[r][c].isRevealed = true;
                    if (data.game_data[r][c].minesAround > 0) {
                        const clickedCell_text = document.getElementById(`${r}-${c}`);
                        clickedCell_text.innerHTML = data.game_data[r][c].minesAround
                        clickedCell_text.style.fontSize = "1rem";
                        clickedCell_text.style.fontFamily = "Courier New";
                    }
                    if (data.game_data[r][c].isMine === true) {
                        const clickedCell_text = document.getElementById(`${r}-${c}`);
                        clickedCell_text.innerHTML = "💣";
                        clickedCell_text.style.fontSize = "1rem";
                        clickedCell_text.style.fontFamily = "Courier New";
                    }

                    document.getElementById(`${r}-${c}`).classList.remove("clicked_false");
                    document.getElementById(`${r}-${c}`).classList.remove("clicked_true");

                }
            }
            break;
    
        case false:
            spreading(row, col);
            break;
    }

    function spreading(row, col) {

        clickedCell_data.isRevealed = true;
        clickedCell_visual.classList.remove("clicked_false");
        clickedCell_visual.classList.add("clicked_true");

        /* Spread */

        if (clickedCell_data.minesAround > 0) {
            const clickedCell_text = document.getElementById(`${row}-${col}`);
            clickedCell_text.innerHTML = data.game_data[row][col].minesAround
            clickedCell_text.style.fontSize = "1rem";
            clickedCell_text.style.fontFamily = "Courier New";
            return;
        }

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
                && data.game_data[neigh_row][neigh_col].isRevealed === false 
                && data.game_data[neigh_row][neigh_col].isMine === false;
        });

        neighbours_checked.forEach(neigh => {
            const neigh_r = neigh[0];
            const neigh_c = neigh[1];

            const neighbourCell = document.getElementById(`${neigh[0]}-${neigh[1]}`);
            neighbourCell.classList.remove("clicked_false");
            neighbourCell.classList.add("clicked_true");

            if (data.game_data[neigh_r][neigh_c].minesAround === 0) {
                data.game_data[neigh_r][neigh_c].isRevealed = true;
                spreading(neigh_r, neigh_c);
            } else {
                const neighbourCell_text = document.getElementById(`${neigh_r}-${neigh_c}`);
                neighbourCell_text.innerHTML = data.game_data[neigh_r][neigh_c].minesAround;
                neighbourCell_text.style.fontSize = "1rem";
                neighbourCell_text.style.fontFamily = "Courier New";
                return;
            }

        });

        console.log(neighbours_checked);
    }
}
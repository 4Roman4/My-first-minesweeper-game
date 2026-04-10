import { data } from "./createBoard.js";

/* Handling the right click */

export function cellFlag(cell) {

    if (!cell.target.classList.contains("cell") || !cell.target.classList.contains("clicked_false")) {
        return;
    }

    cell.preventDefault();

    const gettingID = cell.target.id.split("-");
    const row = Number(gettingID[0]);
    const col = Number(gettingID[1]);

    const clickedCell_data = data.game_data[row][col];
    const clickedCell_visual = document.getElementById(`${row}-${col}`);

    console.log(`Right clicked on cell: ${gettingID.join("-")}`);

    if (clickedCell_data.isFlagged === false) {

        if (data.game_play_selectedDifficulty > 0) {
            clickedCell_data.isFlagged = true;
            clickedCell_visual.innerHTML = "🚩";
            clickedCell_visual.style.fontSize = "1rem";

            data.game_play_selectedDifficulty -= 1;

            if (clickedCell_data.isMine === true) {
                data.game_play_toWin -= 1;
            }

        } else {
            return;
        }

    } else {

        clickedCell_data.isFlagged = false;
        clickedCell_visual.innerHTML = "";
        clickedCell_visual.style.fontSize = "0rem";

        data.game_play_selectedDifficulty += 1;

        if (clickedCell_data.isMine === true) {
            data.game_play_toWin += 1;
        }

    }

    console.log(`Number of flags left: ${data.game_play_selectedDifficulty}`);
    console.log(`Correctly flagged mines: ${data.game_play_toWin}`);

    if (data.game_play_toWin === 0) {
        console.log("Congratulations! You won the game!");

        for (let r = 0; r < data.game_play_selectedSize; r++) {
            for (let c = 0; c < data.game_play_selectedSize; c++) {

                const finish_data = data.game_data[r][c];
                const finish_visual = document.getElementById(`${r}-${c}`);

                finish_data.isRevealed = true;
                finish_visual.classList.remove("clicked_false");
                finish_visual.classList.add("clicked_true");

                if (finish_data.minesAround > 0) {
                    finish_visual.innerHTML = finish_data.minesAround;
                    finish_visual.style.fontStyle = "Courier New";
                    finish_visual.style.fontSize = "1rem";
                }

                if (finish_data.isFlagged === true) {
                    finish_visual.style.backgroundColor = "green";
                }

            }
        }

        document.getElementById("game_board_win").style.display = "block";
    }

    /*
    if (clickedCell_data.isFlagged === false) {
        clickedCell_data.isFlagged = true;
        clickedCell_visual.textContent = "🚩";
        clickedCell_visual.style.fontSize = "1rem";
    } else {
        if (clickedCell_data.isMine === true) {
            clickedCell_text.textContent = "💣";
        } else {
            clickedCell_text.textContent = clickedCell_data.minesAround;
        }
        clickedCell_data.isFlagged = false;
        clickedCell_visual.textContent = " ";
        clickedCell_visual.style.fontSize = "0rem";
    }
    */
}
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

    let flags = data.game_play_selectedDifficulty;
    console.log(`Number of flags left: ${flags}`);

    if (clickedCell_data.isFlagged === false) {
        switch (clickedCell_visual.innerHTML) {
            case "💣":
                console.log("There is a mine!");
                break;
            case clickedCell_visual.innerHTML.has("p"):
                console.log("There is a number!");
                break;
            default:
                console.log(`Inner HTML: ${clickedCell_visual.innerHTML}`);
                break;
        }
    } else {
        console.log("Bleh");
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
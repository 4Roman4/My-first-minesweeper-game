import { data } from "./createBoard.js";

/* Handling the left click */

export function cellSpread(cell) {

    if (!cell.target.classList.contains("cell") || !cell.target.classList.contains("clicked_false")) {
        return;
    }

    const gettingID = cell.target.id;

    console.log(`Hello from ${gettingID}`);
}
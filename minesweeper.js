import { data, createBoard } from "./logic/createBoard.js";
import { cellSpread } from "./logic/leftClick.js";
import { cellFlag } from "./logic/rightClick.js";

console.log("Running file 'minesweeper.js', version of the game 0.1");

/* Variables */

document.querySelector("#game_board").innerHTML = data.game_board;
document.querySelector("#game_board").textContent = "";
document.querySelector("#game_board").addEventListener("click", cellSpread);
//document.querySelector("#game_board").addEventListener("contextmenu", cellFlag);
document.querySelector("#game_play_info").textContent = data.game_play_amountOfFlags;

const button_createBoard = data.game_createBoard;
const button_win = data.game_win;
const button_lose = data.game_lose;
button_createBoard.addEventListener("click", createBoard);
button_win.addEventListener("click", createBoard);
button_lose.addEventListener("click", createBoard);
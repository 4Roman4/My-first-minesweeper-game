import { data, createBoard } from "./logic/createBoard.js";
import { cellSpread } from "./logic/leftClick.js";
import { cellFlag } from "./logic/rightClick.js";

console.log("Running file 'minesweeper.js', version of the game 0.1");

/* Variables */

document.querySelector("#game_board").innerHTML = data.game_board;
document.querySelector("#game_board").textContent = "";
document.querySelector("#game_board").addEventListener("click", cellSpread);
//document.querySelector("#game_board").addEventListener("contextmenu", cellFlag);

const buttonTest = data.game_createBoard;
buttonTest.addEventListener("click", createBoard);
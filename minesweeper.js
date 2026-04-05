import { data, createBoard } from "./logic/createBoard.js";

console.log("Running file 'minesweeper.js', version of the game 0.1");

/* Variables */

document.querySelector("#game_board").innerHTML = data.game_board;
document.querySelector("#game_board").textContent = "";
const buttonTest = data.game_createBoard;

buttonTest.addEventListener("click", createBoard);
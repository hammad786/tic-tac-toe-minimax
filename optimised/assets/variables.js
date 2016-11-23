console.API;
var playable = true;
var human = false;
var ai = true;
var human_val = -1;
var ai_val = 1;
var current_player = human;
var cells = document.getElementsByClassName("cell");
var btns = document.getElementsByClassName("button");
var state = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var win_combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

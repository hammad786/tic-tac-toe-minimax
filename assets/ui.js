var bdiv = document.createElement("div");
var att = document.createAttribute("id");
att.value = "board";
bdiv.setAttributeNode(att);
document.getElementById("container").appendChild(bdiv);
for (var i = 0; i < 9; i++)
  document.getElementById("board").innerHTML += '<div class="cell" onclick="human_turn(this)"></div>';
document.getElementById("board").innerHTML +='<div id="restart" class="button" onclick="restart()">Restart Game</div>';
document.getElementById("board").innerHTML +='<div id="letai" class="button" onclick="restart(); restart(); ai(state, current_player, true);">Let AI Start!</div>';

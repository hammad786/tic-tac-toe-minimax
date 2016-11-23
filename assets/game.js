function human_turn(clicked) {
    //clear_console();
    ai_start_button('hidden');
    if (!playable){
      alert('Game is over! Please restart to get started..');
      playable = false;
    }
    else{
      for (var x = 0; x < 9; x++) {
        if (cells[x] == clicked && state[x] != 0) {
          alert('You cannot click on occipied cell');
          break;
        }
          if (cells[x] == clicked && state[x] == 0) {
              apply_turn(x, current_player);
              ai(state, current_player, true);

          }
      }
    }

}

function apply_turn(index, player) {
  //Human and AI both will be using this function for applying their turns

    if (!playable){
      return;
    }
    if (state[index] == 0) {
        cells[index].style.background = player == human ? "seagreen" : "purple";
        cells[index].innerHTML = player == human ? "X" : "O";
        state[index] = player == human ? human_val : ai_val;
        current_player = !current_player;

        if (is_win(state, player)){
          restart_change('AI WIN! -10 For You', 'red', 'white');
        }
        if (is_complete(state)){
          restart_change('Draw! 0 Points for both!', 'red', 'white');
        }

        if (is_win(state, player) || is_complete(state)) {

            playable = false;

        }

    }

}


function ai(board, player, turn) {
  ai_start_button('hidden');
  var value = player == human ? human_val : ai_val;
  var max = - Infinity;
  var index = 0;


  if (is_win(board, !player))
  {
    return -10 ;
  }

  if (is_complete(board))
  {
    return 0;
  }

  for (var x = 0; x < 9; x++) {
      if (board[x] == 0) {
          var tempboard = board.slice();
          //console.log(board);
          tempboard[x] = value;
          var newval = -(ai(tempboard, !player, false));
          if (newval > max) {
              max = newval;
              index = x;
          }
      }
  }
  if (turn){
    apply_turn(index, player)
  }
  return max;
}

function is_win(board, player) {

    var value = player == human ? human_val : ai_val;

    for (var x = 0; x < 8; x++) {
      var win = true;
        for (var y = 0; y < 3; y++) {
            if (board[win_combinations[x][y]] != value) {
                win = false;
                break;
            }
        }
        if (win) {

          return true;
        }
    }

    return false;
}
function is_complete(board) {
    for (var x = 0; x < 9; x++)
        if (board[x] == 0)
            return false;
    return true;
}
function restart() {
  clear_console();
    for (var x = 0; x < 9; x++) {
        cells[x].style.background = "#000";
        cells[x].innerHTML = "";
        state[x] = 0;
        t =0;
    }

    restart_change('', 'black', 'grey');
    ai_start_button('visible');

    playable = true;
}
function restart_change(msg, bgcolor, color){

  btns[0].style.background = bgcolor;
  btns[0].style.color =color;
  if (msg.length > 1) {
    alert(msg);
  }


}
function ai_start_button(action){
  btns[1].style.visibility = action;
}
function clear_console(){
  if (typeof console._commandLineAPI !== 'undefined') {
      console.API = console._commandLineAPI; //chrome
  } else if (typeof console._inspectorCommandLineAPI !== 'undefined') {
      console.API = console._inspectorCommandLineAPI; //Safari
  } else if (typeof console.clear !== 'undefined') {
      console.API = console;
  }

  console.API.clear();
}
function ai_first_turn(player){
  var indexes = [0, 2, 4, 6, 8];
  var i = indexes[Math.floor(Math.random()*indexes.length)];
  ai_start_button('hidden');
  cells[i].style.background = player == human ? "seagreen" : "purple";
  cells[i].innerHTML = player == human ? "X" : "O";
  state[i] = player == human ? human_val : ai_val;
}

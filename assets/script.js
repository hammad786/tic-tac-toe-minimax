var cells = document.getElementsByClassName("cell");
var buttons = document.getElementsByClassName("button");
var state = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var game = true;
var visible = true;
var HUMAN = false;
var COMPUTER = true;
var HUMVAL = -1;
var COMVAL = 1;
var cPlayer = HUMAN;
var winMatrix = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function reset() {
    for (var x = 0; x < 9; x++) {
        cells[x].style.background = "#fff";
        cells[x].innerHTML = "";
        state[x] = 0;
    }

    ai_start_button('visible');
    game = true;
}

function human_turn(clicked) {

    ai_start_button('hidden');
    if (!game){
      alert('Game is over! Please reset to get started..');
      game = false;
    }
    else{
      for (var x = 0; x < 9; x++) {
          if (cells[x] == clicked && state[x] == 0) {
              set_turn(x, cPlayer);

              aiturn(state, 0, cPlayer, true);
          }
      }
    }

}

function set_turn(index, player) {
    if (!game){
      return;
    }

    if (state[index] != 0)  {
      alert('You cannot click on occipied cell');
    }

    if (state[index] == 0) {
        cells[index].style.background = player == HUMAN ? "seagreen" : "purple";
        cells[index].innerHTML = player == HUMAN ? "X" : "O";
        state[index] = player == HUMAN ? HUMVAL : COMVAL;
        cPlayer = !cPlayer;

        if (checkWin(state, player) || checkFull(state)) {
            for (var x = 0; x < 9; x++)
            {
              game = false;
            }
        }
        if (checkWin(state, player)){
          resetChange('AI WIN! -10 For You');
        }
        if (checkFull(state)){
          resetChange('Draw! 0 Points for both!');
        }
      //  console.log(HUMVAL);
        //console.log(cPlayer);
    }

}

function checkWin(board, player) {
    var value = player == HUMAN ? HUMVAL : COMVAL;

    for (var x = 0; x < 8; x++) {
      var win = true;
        for (var y = 0; y < 3; y++) {
            if (board[winMatrix[x][y]] != value) {
                win = false;
                break;
            }
        }
        if (win) {
          //  console.log('AI WON!');

            return true;

        }
    }

    return false;
}

function checkFull(board) {
    for (var x = 0; x < 9; x++)
        if (board[x] == 0)
            return false;
    return true;
}

function resetChange(msg){

  buttons[0].style.background ='red';
  buttons[0].style.color ='white';
  alert(msg);

}

function ai_start_button(action){
  buttons[1].style.visibility = action;
}

function aiturn(board, depth, player, turn) {
  //player = -1;
  ai_start_button('hidden');
  if (checkWin(board, !player))
  {
    return -10 ;//+ depth
    }
  if (checkFull(board))
  {
    return 0;
  }

  var value = player == HUMAN ? HUMVAL : COMVAL;
  var max = - Infinity;
  var index = 0;
  for (var x = 0; x < 9; x++) {
      /*if (depth == 0) {
          //cells[x].innerHTML = "";
      }
      */
      //it will test only on empty cells
      if (board[x] == 0) {
          var newboard = board.slice();
          newboard[x] = value;
          var moveval = -aiturn(newboard, depth + 1, !player, false);
          /*
          if (depth == 0) {
            //  cells[x].innerHTML = moveval;
          }
          */
          if (moveval > max) {
              max = moveval;
              index = x;
          }
      }
  }
  if (turn){
    console.log(player);
    set_turn(index, player)
  }

  return max;
}

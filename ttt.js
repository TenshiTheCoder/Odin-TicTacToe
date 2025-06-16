// Function to create the Game Board
function createBoard() {
  const gameBoard = {
    rows : 3,
    columns: 3,
    board : []
  };

  for (let i = 0; i < gameBoard.rows; i++) {
      gameBoard.board[i] = [];
    for (let j = 0; j < gameBoard.columns; j++) {
      gameBoard.board[i].push(boardSquare());
    }
  }

  // Will be uncommented later when we create a UI for our Board
  const getBoard = () => gameBoard;
  const placeMarker = (row, column, player) => {
    if (gameBoard.board[row][column].getSquareValue() === "") {
      gameBoard.board[row][column].addMarker(player);
      console.log(`${player.name} has placed an ${player.marker}`)
    } else {
      console.log("That spot is already taken");
    }
  }

  const printBoard = () => {
  const boardWithValues = gameBoard.board.map(row =>
    row.map(cell => cell.getSquareValue())
  );
  console.log(boardWithValues);
};
  return { getBoard, placeMarker, printBoard};
};

printBoard();

// Player names Objects
let playerInfo = (playerOneName, playerTwoName) => {
    let players = [
      { name : playerOneName, marker: "X" },
      { name : playerTwoName, marker: "O" }
    ]
    return players;
}

const players = playerInfo("Angel", "Odin");
console.log(players[0].name);

// function to define and change the value of each square on the board
  function boardSquare() {
    let squareValue = "";

    const addMarker = (player) => {
      squareValue = player.marker;
    }

    const getSquareValue = () => squareValue;

    return {addMarker, getSquareValue};
  }

function ticTacToe() {
  const playerTurn = players[0];

  const switchTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  }

  const getPlayerTurn = () => playerTurn; 
}





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
  const getBoard = () => gameBoard.board;
  
  const placeMarker = (row, column, player) => {
    if (gameBoard.board[row][column].getSquareValue() === "") {
      gameBoard.board[row][column].addMarker(player);
      console.log(`${player.name} has placed an ${player.marker}`)
    } else {
      console.log("That spot is already taken");
    }
  }

  // Logic to print the board to the console in an array for a clear visual
  const printBoard = () => {
  const boardWithValues = gameBoard.board.map(row =>
    row.map(cell => cell.getSquareValue() || "")
  );

  const formatted = boardWithValues.map(row => row.join(" | ")).join("\n-----------\n");
  console.log(formatted);
};
  return { getBoard, placeMarker, printBoard};
};

// Player names Objects, will most likely move them into the game logic later.
let playerInfo = (playerOneName, playerTwoName) => {
    let players = [
      { name : playerOneName, marker: "X" },
      { name : playerTwoName, marker: "O" }
    ]
    return players;
}

const players = playerInfo("Angel", "Odin");


// function to define and change the value of each square on the board
  function boardSquare() {
    let squareValue = "";

    const addMarker = (player) => {
      squareValue = player.marker;
    }

    const getSquareValue = () => squareValue;

    return {addMarker, getSquareValue};
  }

// Function that defines the logic that enables playing rounds and matches
function ticTacToe() {
  const board = createBoard();
  let playerTurn = players[0];

  const switchTurn = () => {
    playerTurn = playerTurn === players[0] ? players[1] : players[0];
  }
  const getPlayerTurn = () => playerTurn; 

  const newRoundStart = () => {
    board.printBoard();
    console.log(`New Round! It's ${getPlayerTurn().name}'s turn.`);
  }

  const playRound = (row, column) => {
    board.placeMarker(row, column, getPlayerTurn());
    console.log(`${getPlayerTurn().name} placed a ${getPlayerTurn().marker} at [${row}, ${column}]`)

    // Game Win Conditions to be added later

    switchTurn();
    newRoundStart();
  }

  newRoundStart();  

  return {playRound, getPlayerTurn};
}

const game = ticTacToe();
game.playRound(0, 0);
game.playRound(0, 0);
game.playRound(1, 0);





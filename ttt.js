// Selectors to use for UI
const newGame = document.querySelector("#new-game");
const changeNames = document.querySelector("#names-button");
const nameDialog = document.querySelector("#name-dialog");
const closeDialog = document.querySelector(".close-dialog");
const playerOneNameInput = document.querySelector("#player-one-name");
const playerTwoNameInput = document.querySelector("#player-two-name");
const confirmNameOne = document.querySelector(".confirm-name-one");
const confirmNameTwo = document.querySelector(".confirm-name-two");
const gameCells = document.querySelectorAll(".cell");


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

  
  const getBoard = () => gameBoard.board;
  
  // Function to switch values of cells to player markers, need to prevent turn switching if a player tries to overwrite a cell with a value
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

  // Simulates a tic tac toe board by joining each row with | separators and newline tags
  const formattedBoard = boardWithValues.map(row => row.join(" | ")).join("\n-----------\n");
  console.log(formattedBoard);
};
  return { getBoard, placeMarker, printBoard};
};

// Player names Objects, will most likely move them into the game logic later.
let playerInfo = (playerOneName, playerTwoName) => {
  return {
    playerOne: { name: playerOneName, marker: "X" },
    playerTwo: { name: playerTwoName, marker: "O" }
  };
};

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
  let playerTurn = players.playerOne;

  const switchTurn = () => {
    playerTurn = playerTurn === players.playerOne ? players.playerTwo : players.playerOne;
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

// Button Listeners to open the name dialogs
changeNames.addEventListener("click", () => { 
  nameDialog.showModal();
})

closeDialog.addEventListener("click", () => {
  nameDialog.close();
})

// Event Listeners to change player names in the dialog box
confirmNameOne.addEventListener("click", () => {
  players.playerOne.name = playerOneNameInput.value;
  playerOneNameInput = "";
})

confirmNameTwo.addEventListener("click", () => {
  players.playerOne.name = playerTwoNameInput.value;
  playerTwoNameInput = "";
})

// Event Listener to reset game
newGame.addEventListener("click", () => {
  board = createBoard();
  playerTurn = players.playerOne;
  board.printBoard();
})

// Listener to add a marker to a cell on the board, will add win check later
gameCells.forEach((gameCell) => {
  gameCell.addEventListener("click", () => {
    if(gameCell.textContent === "") {
      gameCell.textContent = getPlayerTurn().marker;
      board.printBoard();
      switchTurn();
    }
  })
})



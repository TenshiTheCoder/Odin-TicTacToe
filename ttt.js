// Selectors to use for UI
const newGame = document.querySelector("#new-game");
let playerOneName = document.querySelector(".player-one");
let playerTwoName = document.querySelector(".player-two");
const changeNames = document.querySelector("#names-button");
const nameDialog = document.querySelector("#name-dialog");
const closeDialog = document.querySelector(".close-dialog");
const playerOneNameInput = document.querySelector("#player-one-name");
const playerTwoNameInput = document.querySelector("#player-two-name");
const confirmNameOne = document.querySelector(".confirm-name-one");
const confirmNameTwo = document.querySelector(".confirm-name-two");
const gameCells = document.querySelectorAll(".cell");

// Function to create the Game Board
const CreateBoard = (() => {
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
    gameBoard.board[row][column].addMarker(player.marker);
    console.log(`${player.name} has placed an ${player.marker}`);
    return true;
  } else {
    console.log("That spot is already taken");
    return false;
  }
};

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
})();

// Player name and score Objects, will most likely move them into the game logic later.
let playerInfo = (playerOneName, playerTwoName) => {
  let playerOneScore = 0;
  let playerTwoScore = 0;
  
  return {
    playerOne: { name: playerOneName, marker: "X", score: playerOneScore },
    playerTwo: { name: playerTwoName, marker: "O", score: playerTwoScore }
  };
};

const players = playerInfo("Angel", "Odin");
console.log(players.playerOne);
// function to define and change the value of each square on the board
  function boardSquare() {
    let squareValue = "";

    const addMarker = (marker) => {
      squareValue = marker;
    }

    const getSquareValue = () => squareValue;

    return {addMarker, getSquareValue};
  }

// Function that defines the logic that enables playing rounds and matches
const tttController = (() => {
  const board = CreateBoard;
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

      if(checkWin || checkDraw) return;
      switchTurn();
      newRoundStart();
  }

  const checkWin = (board) => {
    let winningCombos = [
      // Winning Rows
      [ [0, 0], [0, 1], [0, 2] ],
      [ [1, 0], [1, 1], [1, 2] ],
      [ [2, 0], [2, 1], [2, 2] ],

      // Winning Columns
      [ [0, 0], [1, 0], [2, 0] ],
      [ [0, 1], [1, 1], [2, 1] ],
      [ [0, 2], [1, 2], [2, 2] ],

      // Winning Diagonals
      [ [0, 0], [1, 1], [2, 2] ],
      [ [0, 2], [1, 1], [2, 0] ]
    ];

    for(let i = 0; i < winningCombos.length; i++){
      const combo = winningCombos[i];
      const [cell1, cell2, cell3] = combo;
      const firstValue = board[cell1[0]][cell1[1]].getSquareValue();
      const secondValue = board[cell2[0]][cell2[1]].getSquareValue();
      const thirdValue = board[cell3[0]][cell3[1]].getSquareValue();

      if(
        firstValue !== "" && 
        firstValue === secondValue &&
        firstValue === thirdValue
      ) {
        alert(`${getPlayerTurn().name} wins`);
        getPlayerTurn().score++;
        playerOneName.textContent = `${players.playerOne.name}: ${players.playerOne.score}`;
        playerTwoName.textContent = `${players.playerTwo.name}: ${players.playerTwo.score}`;
        console.log(`Updated scores — P1: ${players.playerOne.score}, P2: ${players.playerTwo.score}`);
        console.log(`${getPlayerTurn().name}: ${getPlayerTurn().score}`);
        resetGame();
        return true;
      }
    }
    return false;
  }

  // Function to check for a draw
  const checkDraw = (board) => {
    const allSquares = board.flat();
    const cellsFull = allSquares.every(cell => cell.getSquareValue() !== "");

    if(cellsFull && !checkWin(board)){
      alert(`It's a draw`);
      resetGame();
      return true;
    } 
    return false;
  }

  // Function to manage/check game state
  const gameState = (board) => {
    if(checkWin(board)) {
      console.log(`${getPlayerTurn().name} is the winner`);
      return true;
    };
    if(checkDraw(board)){
      console.log("It's a draw!");
      return true;
    } 
    return false;
  }

  const resetGame = () => {
    gameCells.forEach((cell) => {
      cell.textContent = ""; 
    }) 

    for (let i = 0; i < board.getBoard().length; i++) {
    for (let j = 0; j < board.getBoard()[i].length; j++) {
      board.getBoard()[i][j].addMarker(""); // clear each cell internally
    }
  }
    board.printBoard();
    playerTurn = players.playerOne;
    players.playerOne.score = 0;
    players.playerOne.score = 0;
  } 

  gameCells.forEach((gameCell, index) => {
    // Added Variables to associate the row and columns with each cell
    const row = Math.floor(index / 3);
    const col = index % 3;

    // Added classes to cells to show player markers on hover
    gameCell.addEventListener("mouseenter", () => {
      gameCell.classList.add(getPlayerTurn().marker === "X" ? "hover-x" : "hover-o");
    })

    gameCell.addEventListener("mouseleave", () => {
      gameCell.classList.remove(getPlayerTurn().marker === "X" ? "hover-x" : "hover-o");
    })

    gameCell.addEventListener("click", () => {
      if(gameCell.textContent === "") {
        board.placeMarker(row, col, getPlayerTurn());

        gameCell.textContent = getPlayerTurn().marker;

        // Added classList to allow for styling of player markers and removal of hover effects
        gameCell.classList.add(getPlayerTurn().marker === "X" ? "player-one-marker" : "player-two-marker");
        gameCell.classList.remove(getPlayerTurn().marker === "X" ? "hover-x" : "hover-o");

        // Update the board, check for any win conditions, reset if a win/draw, switch turns if not.
        board.printBoard();
        if(gameState(board.getBoard())) return;
        switchTurn();
        newRoundStart();
      } else {
        alert("That spot is taken!");
      }
    })
})

  newRoundStart();  

  return {playRound, getPlayerTurn, resetGame};
})();

const game = tttController;
game.resetGame();

const uiController = (() => {
  // Display Player Names and scores
playerOneName.textContent = `${players.playerOne.name}: ${players.playerOne.score}`;
playerTwoName.textContent = `${players.playerTwo.name}: ${players.playerTwo.score}`;


// Button Listeners to open/close the name dialog
changeNames.addEventListener("click", () => { 
  nameDialog.showModal();
})

closeDialog.addEventListener("click", () => {
  nameDialog.close();
})

// Event Listeners to change player names in the dialog box
confirmNameOne.addEventListener("click", () => {
  players.playerOne.name = playerOneNameInput.value.trim() || players.playerOne.name;
  playerOneName.textContent = `${players.playerOne.name}: ${players.playerOne.score}`;
  playerOneNameInput.value = "";
});

confirmNameTwo.addEventListener("click", () => {
  players.playerTwo.name = playerTwoNameInput.value.trim() || players.playerTwo.name;
  playerTwoName.textContent = `${players.playerTwo.name}: ${players.playerTwo.score}`;
  playerTwoNameInput.value = "";
});

// Event Listener to reset game
newGame.addEventListener("click", () => {
  game.resetGame();
  players.playerOne.score = 0;
  players.playerOne.score = 0;
  playerOneName.textContent = `${players.playerOne.name}: ${players.playerOne.score}`;
  playerTwoName.textContent = `${players.playerTwo.name}: ${players.playerTwo.score}`;
})
})();








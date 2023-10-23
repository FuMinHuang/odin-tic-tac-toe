// This is a self-contained module for managing a gameboard in a 3x3 grid.
const gameboardController = function() {
    const board = [];
    const rows = 3;
    const columns = 3;

    // Create a 3x3 grid board
    for ( let i = 0; i < rows; i ++) {
        board[i] = [];        
        for ( let j = 0; j < columns; j++) {
            board[i][j] = "";
        }
    }
    
    // Function to place a player's mark on the gameboard
    const placeMark = function(row, column, playerToken) {
        if (board[row][column] === "") {
            board[row][column] = playerToken;
            return true;
        }
        return false;        
    }

    // Function to get the current gameboard
    const getBoard = () => board;

    // Function to display the gameboard in the console
    const displayBoard = () => {console.table(getBoard())}

    // Function to check for a win
    const checkForWin = function(playerToken) {
        // Check rows
        for (let i = 0; i < rows; i++) {
            if (board[i].every((cell) => cell === playerToken)) {
                return true;
            }
        }

        // Check columns
        for (let j = 0; j < columns; j++) {
            if (board.every((row) => row[j] === playerToken)) {
                return true;
            }
        }

        // Check diagonals
        if (board[0][0] === playerToken && board[1][1] === playerToken && board[2][2] === playerToken) {
            return true;
        }
        if (board[0][2] === playerToken && board[1][1] === playerToken && board[2][0] === playerToken) {
            return true;
        }

        return false;
    }

    // Function to check for a draw
    const checkForDraw = function() {
        return board.every(row => row.every(cell => cell !== ""));
    };    

    return {
        getBoard,
        displayBoard,
        placeMark,
        checkForWin,
        checkForDraw,
    };
};

// Module for managing palyers
const playerController = function() {
    const playersArr = [
        {
            name: "Player One",
            token: "X",
        },
        {
            name: "Player Two",
            token: "O",
        }
    ];

    let activePlayer = playersArr[0];

    // Function to get the currently active player
    const getActivePlayer = () => activePlayer;

    return {
        playersArr,
        getActivePlayer,
    };
}

// Module for game control
const gameController = function() {
    const board = gameboardController();
    const gameboard = board.getBoard();
    board.displayBoard()
    const boardDiv = document.querySelector('.board');

    const player = playerController();
    const players = player.playersArr;
    let activePlayer = player.getActivePlayer();

    // Function to switch to the other player's turn
    const switchPlayerTurn = function() {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    // Function to display the gameboard and the active player's turn
    const displayNewRound = function() {
        board.displayBoard();
        console.log(`${activePlayer.name}(${activePlayer.token})'s turn.`);
    };
  

    // Function to play a round of the game
    const playRound = function(row, column) {
        if (board.placeMark(row, column, activePlayer.token) === true) {
            if (board.checkForWin(activePlayer.token)) {
                displayNewRound();
                render();
                setTimeout(function() {
                    alert(`${activePlayer.name}(${activePlayer.token}) Wins!`);
                }, 100);                
            } else if (board.checkForDraw()) {
                displayNewRound();
                render();
                setTimeout(function() {
                    alert("Draw Game!");
                }, 100);                
            } else {
                switchPlayerTurn();
                displayNewRound();
                render();
            }
        } else {
            console.log(`Invalid move. Choose a different place.`);
        }
    };

    const render = function() {
        boardDiv.textContent = "";
        for ( let i = 0; i < gameboard.length; i ++) {          
            for ( let j = 0; j < gameboard[i].length; j++) {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                cellButton.textContent = gameboard[i][j];
                cellButton.dataset.row = i;
                cellButton.dataset.column = j;
                boardDiv.appendChild(cellButton);
            }
        }
    }

    const clickHandlerBoard = function(event) {
        const selectedRow = event.target.dataset.row;
        const selectedColumn = event.target.dataset.column;        
        playRound(selectedRow, selectedColumn);     
    }

    boardDiv.addEventListener("click", clickHandlerBoard)

    render();

    return {
        playRound
    };
}

// Initialize the game controller
const game = gameController();

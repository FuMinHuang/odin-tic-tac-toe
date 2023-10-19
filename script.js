// This is a self-contained module for managing a gameboard in a 3x3 grid.
const gameboard = function() {
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
        board[row][column] = playerToken;
    }

    // Function to get the current gameboard
    const getBoard = () => board;

    // Function to display the gameboard in the console
    const displayBoard = () => {console.table(getBoard())}

    return {
        getBoard,
        displayBoard,
        placeMark,
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
    const board = gameboard();
    board.displayBoard()

    const player = playerController();
    const players = player.playersArr;
    let activePlayer = player.getActivePlayer();

    // Function to switch to the other player's turn
    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    // Function to display the gameboard and the active player's turn
    const displayNewRound = function() {
        board.displayBoard();
        console.log(`${activePlayer.name}(${activePlayer.token})'s turn.`);
    };

    // Function to play a round of the game
    const playRound = function(row, column) {
        board.placeMark(row, column,activePlayer.token);
        switchPlayerTurn();
        displayNewRound();
    };

    return {
        playRound,
    };
}

// Initialize the game controller
const game = gameController();

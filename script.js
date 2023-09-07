const gameBoardModule = (function() {
    const board = [];
    const rows = 3;
    const columns = 3;
    
    function _createBoard() {
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
                board[i][j] = "";
            }
        }
        return board;
    }
    
    function createBoard() {
        return _createBoard();
    }

    return {
        createBoard,      
    };
})();


const countModule = (function() {
    let count = 1;

    function getCount() {
        return count;
    }

    function incrementCount() {
        count++;
    }

    return {
        getCount,
        incrementCount,
    };
})();


const playerFactory = function(name) {
    return {
        name,
    };
};


const isEvenOrOdd = function(number) {
    if (number % 2 === 0) {
      return "Even";
    } else {
      return "Odd";
    }
  }
  

const gameBoard = gameBoardModule.createBoard()
const playerX = playerFactory("X");
const playerO = playerFactory("O");


// const checkBoardEmpty = function() {
//     return gameBoard.some(row => row.includes(playerX.name) || row.includes(playerO.name));
// };

const placeValue = function(row, column) {
    if (isEvenOrOdd(countModule.getCount()) == "Odd") {
        gameBoard[row][column] = playerX.name;        
    } else {
        gameBoard[row][column] = playerO.name;
    }
    countModule.incrementCount();
};

placeValue(0,0);
placeValue(0,1);
placeValue(0,2);
console.log(gameBoard);
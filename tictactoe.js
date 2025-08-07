function createPlayer(name, symbol) {
  return {name, symbol};
}

function createGameboard() {
  let gameboardArray = [['', '', ''], ['', '', ''], ['', '', '']];
  const playerOne = createPlayer("Player One", "X");
  const playerTwo = createPlayer("Player Two", "O");
  let myTurn = playerOne;
  const makeMove = (horizontalIndex, verticalIndex) => {
    gameboardArray[verticalIndex][horizontalIndex] = myTurn.symbol;
    if (myTurn === playerOne) {
      myTurn = playerTwo;
    }
    else {
      myTurn = playerOne;
    }
  }
  const checkHorizontal = (board) => {
    for (let i = 0; i < 3; i++) {
      const curRow = gameboardArray[i];
      if (curRow.every((curValue) => curValue === curRow[0]) && curRow[0] !== '') {
        return curRow[0];
      }
    }
    return '';
  }
  const checkVertical = (board) => {
    for (let j = 0; j < 3; j++) {
      if (
        board[0][j] !== '' &&
        board[0][j] === board[1][j] &&
        board[1][j] === board[2][j]
      ) {
        return board[1][j];
       }
    }
      return '';
  }
  const checkDiagonal = (board) => {
    if (
      board[0][0] !== '' &&
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2]
    ) {
      return board[1][1];
    }
    
    if (
      board[0][2] !== '' &&
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0]
    ) {
      return board[1][1];
    }
    
    return '';
  }
  const checkForWinner = () => {
    const horizontal = checkHorizontal(gameboardArray);
    const vertical = checkVertical(gameboardArray);
    const diagonal = checkDiagonal(gameboardArray);
    if (horizontal !== '') {
      return horizontal;
    }
    if (vertical !== '') {
      return vertical;
    }
    return diagonal;
  };
  const play = (hIndex, vIndex) => {
    makeMove(hIndex, vIndex);
    console.table(gameboardArray);
    checkForWinner();
  }
  return {play};
}

const gameboard = createGameboard();
const button = document.createElement("button");
button.addEventListener("click", () => gameboard.play());
const mySquares = document.body.querySelectorAll('.grid-container div button');
mySquares.forEach((square) => square.addEventListener("click", () => gameboard.play(square.id[1], square.id[0])))
document.body.appendChild(button);
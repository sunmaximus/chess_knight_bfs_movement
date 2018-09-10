// create 1 deminsion chessboard
// https://stackoverflow.com/questions/16684004/simple-javascript-chess-board
export const initializeChessboardColor = () => {
  let a = [];
  for(var i=0; i< 64; i++) {
    a.push(parseInt((i / 8) + i) % 2 === 0 ? 1 : 0)
  }

  return a
}

// https://stackoverflow.com/questions/4492385/how-to-convert-simple-array-into-two-dimensional-arraymatrix-in-javascript-or
export const listToMatrix = (list, elementsPerSubArray) => {
  let matrix = [], i, k;
  for (i = 0, k = -1; i < list.length; i++) {
    if (i % elementsPerSubArray === 0) {
      k++;
      matrix[k] = [];
    }
    matrix[k].push(list[i]);
  }
  return matrix;
}

export const colorChessBoard = () => {
  let nDemensionChessBoard = initializeChessboardColor();
  return listToMatrix(nDemensionChessBoard, 8);
}
export const chessBoardOfZeroes = () => listToMatrix((new Array(64)).fill(0), 8);
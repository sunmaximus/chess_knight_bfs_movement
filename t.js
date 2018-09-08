const queue = require('queue');

// create chessboard 1 dimension
// https://stackoverflow.com/questions/16684004/simple-javascript-chess-board
let a = [];
for(var i=0; i< 64; i++) {
  a.push(parseInt((i / 8) + i) % 2 == 0 ? 1 : 0)
}

// https://stackoverflow.com/questions/4492385/how-to-convert-simple-array-into-two-dimensional-arraymatrix-in-javascript-or
const listToMatrix = (list, elementsPerSubArray) => {
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

// https://stackoverflow.com/questions/3746725/create-a-javascript-array-containing-1-n
let chess = (new Array(64)).fill(0);

// 8 x 8 matrix black and white chess board
// console.log(listToMatrix(a, 8));

// 8 x 8 matrix of 1
console.log(listToMatrix(chess, 8));

const cell = (x, y, dist) => ({ x, y, dist });
const isInside = (x, y, N) => {
  if (x >= 1 && x <= N && y >= 1 && y <= N) return 1;
  return 0;
}

const minStepToReachTarget = (knightPos=[0,0], targetPos=[0,0], N=0) => {
  const end = {};
  // x and y direction, where a knight can move
  const dx = [-2, -1, 1, 2, -2, -1, 1, 2];
  const dy = [-1, -2, -2, -1, 1, 2, 2, 1];

  // queue for storing states of knight in board
  let q = queue();
  let s = true;
  
  let t = {}
  q.push(cell(knightPos[0], knightPos[1], 0));
  // q.push({});

  // console.log(q.jobs)
  let x, y;

  let visited = listToMatrix((new Array(N * N)).fill(0), N);

  // console.log(q)
  // console.log(visited)
  visited[knightPos[0]][knightPos[1]] = 1;

  // loop untill we have one element in queue
  while(q.jobs.length > 0) {
    t = q.jobs[0];
    q.pop();
    
    // if current cell is equal to target cell,
    // return its distance
    if (t.x == targetPos[0] && t.y == targetPos[1]) console.log(t.dist);
    // console.log(1)
    // loop for all reachable states
    for (let i = 0; i < 8; i++) {
      x = t.x + dx[i];
      y = t.y + dy[i];
      
      // console.log(x, y, N)
      // If reachable state is not yet visited and
      // inside board, push that state into queue
      if (isInside(x, y, N) && !visited[x][y]) {
        visited[x][y] = 1;
        q.push(cell(x, y, t.dist + 1));
      }
    }
    // console.log(q.jobs)
  }

  // console.log(typeof visited)
}


let N = 8;
let knightPos = [2, 4];
let targetPos = [6, 4];

minStepToReachTarget(knightPos, targetPos, N);
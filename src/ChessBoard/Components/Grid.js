import React from 'react';
import Cell from './Cell';

const Grid = ({ grid, pointA, pointB, colorGrid, select }) => {
  let cells = [];
  colorGrid.forEach((row, i) => {
    cells = [...cells, ...row.map((isBlackCell, j) => {
     let label = ''
     const isLabelA = grid[i][j] && JSON.stringify(pointA) === JSON.stringify([i, j]);
     const isLabelB = grid[i][j] && JSON.stringify(pointB) === JSON.stringify([i, j])
     if (isLabelA) label = 'A';
     if (isLabelB) label = 'B';
     if (!isLabelA && !isLabelB && grid[i][j]) {
       label = String(grid[i][j] - 1)
     }

     return (
      <Cell
        key={`${i}${j}`}
        xCoordindate={i}
        yCoordindate={j}
        black={isBlackCell}
        highLight={grid[i][j]}
        callBack={select}
        nodeLabel={label}
      />) 
    })]
  })
  return (<div className='chess-board'>{cells}</div>)
}

export default Grid;
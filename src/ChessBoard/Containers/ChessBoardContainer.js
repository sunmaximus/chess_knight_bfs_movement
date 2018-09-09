import React, { Component } from 'react';

import Cell from '../Components/Cell';

import {
  colorChessBoard,
  chessBoardOfZeroes,
} from '../modules/chessboard';

import '../css/chessboard.css';
import '../css/cell.css';


class ChessBoardContainer extends Component {
  constructor(props) {
    super(props)
    const colorGrid = colorChessBoard()
    this.state = {
      colorGrid,
    }
  }

  renderGrids() {
    let cells = []
    this.state.colorGrid.forEach((row, i) => {
      cells = [...cells, ...row.map((cellColor, j) => (
        <Cell
          key={`${i}${j}`}
          xCoordindate={i}
          yCoordindate={j}
          black={cellColor}
        />
      ))]
    })

    return cells
  }

  render() {
    console.log(this.state.colorGrid)
    return (
      <div className='chess-board'>
        {this.renderGrids()}
      </div>
    )
  }
}

export default ChessBoardContainer;
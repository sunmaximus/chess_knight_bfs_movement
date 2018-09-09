import React, { Component } from 'react';
import axios from 'axios';

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
    const grid = chessBoardOfZeroes()
    this.state = {
      colorGrid, // 8 x 8 array that indicates white or black blocks
      keepTrack: 0,
      coordindates: [],
      grid: [...grid], // default block of 8 x 8 array of 0
      gridClickedTracker: [...grid],
      foundShortestPath: false
    }

    this.select = this.select.bind(this);
    this.renderGrids = this.renderGrids.bind(this);
    this.shortestPath = this.shortestPath.bind(this);
    this.reset = this.reset.bind(this)
  }

  reset() {
    const colorGrid = colorChessBoard()
    const grid = chessBoardOfZeroes()
    this.setState({
      colorGrid,
      keepTrack: 0,
      coordindates: [],
      grid: [...grid],
      foundShortestPath: false,
      pointA: [],
      pointB: [],
    })
  }

  select(x,y) {
    if(this.state.grid[x][y] || this.state.keepTrack >= 2) return;
    this.setState((prevState) => { 
      let grid = prevState.grid;
      let gridClickedTracker = prevState.gridClickedTracker;
      grid[x][y] = 1;

      const newState = {
        keepTrack: prevState.keepTrack + 1,
        grid,
        gridClickedTracker,
        coordindates: [...prevState.coordindates, [x, y]]
      };

      if (this.state.keepTrack == 0) newState['pointA'] = [x, y];
      if (this.state.keepTrack == 1) newState['pointB'] = [x, y];

      return newState;
    })
  }

  shortestPath() {
    const { coordindates, foundShortestPath } = this.state;
    if (coordindates.length < 2 || foundShortestPath) return;

    const host = 'https://chess-shortest-path-bfs.herokuapp.com//shortestpath';

    return coordindates.length > 1 &&
      axios.get(`${host}?start=[${coordindates[0]}]&end=[${coordindates[1]}]`)
        .then(response => {
          this.setState((prevState) => {
            let grid = prevState.grid;
            let steps = 0;
            console.log(response.data.steps)
            response.data.steps.forEach(coordindate => {
              const x = coordindate[0];
              const y = coordindate[1];
              steps += 1;
              grid[x][y] = steps;
            })
            return { grid, foundShortestPath: true };
          })
        });
  }

  renderGrids() {
    const { grid, pointA, pointB } = this.state;
    let cells = [];
    let steps = 0;
    this.state.colorGrid.forEach((row, i) => {
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
          callBack={this.select}
          nodeLabel={label}
        />) 
      })]
    })
    return (<div className='chess-board'>{cells}</div>)
  }

  renderButtons() {
    return (
      <div className='btn-container'>
        <button
          className='btn'
          onClick={this.shortestPath}
        >
          Shortest Path
        </button>
        <button
          className='btn'
          onClick={this.reset}
        >
          Reset
        </button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className='instructions'>
          <h1>Instructions</h1>
          <div>Select any two square on the chess board</div>
          <div>Click on ShortestPath button</div>
          <div>Click Reset to start over again</div>
        </div>

        {this.renderGrids()}
        {this.renderButtons()}
      </div>

    )
  }
}

export default ChessBoardContainer;
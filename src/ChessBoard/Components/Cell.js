import React, { Component } from 'react'

import '../css/cell.css'

class Cell extends Component {
  constructor(props) {
    super(props)
    this.state = {
      xCoordindate: this.props.xCoordindate,
      yCoordindate: this.props.yCoordindate,
      highLightOnClick: false,
    }

    this.clickCell = this.clickCell.bind(this)
  }

  clickCell() {
    return this.props.callBack &&
           this.props.callBack(this.state.xCoordindate, this.state.yCoordindate)
  }

  render() {
    // const cellStyle = this.props.highLight ? 'cell-block-highlighted' : 'cell-block'
    const cellStyle = this.props.black ? 'cell-block-black' : 'cell-block-white';
    return <div className={cellStyle} onClick={this.clickCell}></div>
  }

}

export default Cell;
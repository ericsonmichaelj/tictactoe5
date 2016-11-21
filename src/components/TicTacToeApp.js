import React from 'react'
import swal from 'sweetalert'
import Immutable from 'immutable'
import ChangeMovePanel from './ChangeMovePanel'
import TicTacToeBoard from './TicTacToeBoard'
import GamePanel from './GamePanel'
import {
  players,
  ROWS_IN_GRID,
  COLUMNS_IN_GRID,
  LENGTH_OF_DIAGONAL_IN_GRID
 } from '../constants/'

const mutableGridRow = Array(ROWS_IN_GRID).fill(null)
const mutableGrid = Array(COLUMNS_IN_GRID).fill(mutableGridRow)
const grid = Immutable.fromJS(mutableGrid)

const newGameConfig = {
  name: null,
  grid,
  humanOnTemporaryMove: false,
  humanTemporaryMove: null,
  whoseTurn: Math.floor(2 * Math.random()) ? players.HUMAN : players.COMPUTER,
  winner: null
}

class TicTacToeApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = newGameConfig
  }
  componentWillMount() {
    swal({
      title: 'Please enter your name',
      type: 'input',
      closeOnConfirm: false,
      animation: 'slide-from-top',
      inputPlaceholder: 'Type your name here'
    }, (inputValue) => {
      if (inputValue === '') {
        swal.showInputError('You need to write something!')
        return
      }
      this.setState({ name: inputValue })
      swal.close()
    })
  }

  humanDoesTemporaryMove = (row, column) => {
    this.setState({
      humanTemporaryMove: { row, column },
      humanOnTemporaryMove: true
    })
  }

  humanCompletesTemporaryMove = () => {
    const { row, column } = this.state.humanTemporaryMove
    const gridWithNewMove = this.state.grid
      .setIn([row, column], players.HUMAN)
    this.setState({
      humanOnTemporaryMove: false,
      humanTemporaryMove: null,
      grid: gridWithNewMove
    }, this._updateGameResultsAfterMove)
  }

  _updateGameResultsAfterMove() {
    const currentPlayer = this.state.whoseTurn
    const otherPlayer = currentPlayer  === players.COMPUTER ? players.HUMAN : players.COMPUTER
    const winner = this._checkForWinner(currentPlayer)
    if (winner) {
      this.setState({ winner: currentPlayer })
    } else {
      this.setState({ whoseTurn:  otherPlayer })
    }
  }

  humanUndoesTemporaryMove = () => {
    this.setState({
      humanOnTemporaryMove: false, humanTemporaryMove: null
    })
  }

  _checkForWinner = (itemInCell) => {
    if (this._hasXInAnyRow(itemInCell, ROWS_IN_GRID) ||
        this._hasXInAnyDiagonal(itemInCell, COLUMNS_IN_GRID) ||
        this._hasXInAnyColumn(itemInCell, LENGTH_OF_DIAGONAL_IN_GRID)) {
      return true
    }
    return false
  }

  _hasXInAnyDiagonal = (item, x) =>
    this._hasXInForwardDiagonal(item, x) || this._hasXInBackwardDiagonal(item, x)

  _hasXInForwardDiagonal = (item, x) => {
    let allowableUnfoundItemsInforwardDiagonal = LENGTH_OF_DIAGONAL_IN_GRID - x
    for (let i = 0; i < LENGTH_OF_DIAGONAL_IN_GRID; i += 1) {
      if (this.state.grid.getIn([i, i]) !== item) {
        allowableUnfoundItemsInforwardDiagonal -= 1
      }
      if (allowableUnfoundItemsInforwardDiagonal < 0) {
        return false
      }
    }
    return true
  }

  _hasXInBackwardDiagonal = (item, x) => {
    let allowableUnfoundItemsInBackwardsDiagonal = LENGTH_OF_DIAGONAL_IN_GRID - x
    for (let i = 0; i < LENGTH_OF_DIAGONAL_IN_GRID; i += 1) {
      if (this.state.grid.getIn([LENGTH_OF_DIAGONAL_IN_GRID - 1 - i, i]) !== item) {
        allowableUnfoundItemsInBackwardsDiagonal -= 1
      }
      if (allowableUnfoundItemsInBackwardsDiagonal < 0) {
        return false
      }
    }
    return true
  }

  _hasXInAnyRow = (item, x) => {
    for (let i = 0; i < ROWS_IN_GRID; i += 1) {
      if (this._hasXInARow(item, i, x)) {
        return true
      }
    }
    return false
  }

  _hasXInARow = (item, row, x) => {
    let allowableUnfoundItemsInARow = COLUMNS_IN_GRID - x
    const list = this.state.grid.get(row)
    for (let i = 0; i < COLUMNS_IN_GRID; i += 1) {
      if (list.get(i) !== item) {
        allowableUnfoundItemsInARow -= 1
      }
      if (allowableUnfoundItemsInARow < 0) {
        return false
      }
    }
    return true
  }

  _hasXInAnyColumn = (item, x) => {
    for (let i = 0; i < COLUMNS_IN_GRID; i += 1) {
      if (this._hasXInAColumn(item, i, x)) {
        return true
      }
    }
    return false
  }

  _hasXInAColumn = (item, column, x) => {
    let allowableUnfoundItemsInColumn = ROWS_IN_GRID - x
    for (let i = 0; i < ROWS_IN_GRID; i += 1) {
      if (this.state.grid.get(i).get(column) !== item) {
        allowableUnfoundItemsInColumn -= 1
      }
      if (allowableUnfoundItemsInColumn < 0) {
        return false
      }
    }
    return true
  }

  computerCompletesMove = (move) => {
    this.setState({
      grid: this.state.grid.setIn([move.row, move.column], players.COMPUTER)
    }, this._updateGameResultsAfterMove)
  }

  newGame = () => {
    this.setState({ ...newGameConfig, name: this.state.name })
  }

  _renderApp = () => (
    <div>
      <ChangeMovePanel
        completeTemporaryMove={this.humanCompletesTemporaryMove}
        undoTemporaryMove={this.humanUndoesTemporaryMove}
        onTemporaryMove={this.state.humanOnTemporaryMove}
      />
      <div className='col-sm-9'>
      <TicTacToeBoard
        grid={this.state.grid}
        winner={this.state.winner}
        onTemporaryMove={this.state.humanOnTemporaryMove}
        temporaryMove={this.state.humanTemporaryMove}
        whoseTurn={this.state.whoseTurn}
        humanDoesTemporaryMove={this.humanDoesTemporaryMove}
        computerCompletesMove={this.computerCompletesMove}
      />
      </div>
      <div className='col-sm-3'>
      <GamePanel
        name={this.state.name}
        winner={this.state.winner}
        whoseTurn={this.state.whoseTurn}
        newGame={this.newGame}
      />
      </div>
    </div>
  )

  render() {
    return (
      <div className='container'>
        {this.state.name ? this._renderApp(): null}
      </div>
    )
  }
}

export default TicTacToeApp


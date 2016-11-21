import React from 'react'
import swal from 'sweetalert'
import Immutable from 'immutable'
import ChangeMovePanel from './ChangeMovePanel'
import TicTacToeBoard from './TicTacToeBoard'
import GamePanel from './GamePanel'
import {
  players,
  possibleWinners,
  ROWS_IN_GRID,
  COLUMNS_IN_GRID,
  LENGTH_OF_DIAGONAL_IN_GRID
 } from '../constants/'
import GridUtils from '../utils'

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
    }, () => this._updateGameResultsAfterMove({ row, column }))
  }

  _updateGameResultsAfterMove(moveMade) {
    const currentPlayer = this.state.whoseTurn
    const otherPlayer = currentPlayer  === players.COMPUTER ? players.HUMAN : players.COMPUTER
    const gridUtils  = new GridUtils(this.state.grid,
      COLUMNS_IN_GRID, ROWS_IN_GRID, LENGTH_OF_DIAGONAL_IN_GRID)
    const winner = this._checkForWinner(currentPlayer, moveMade, gridUtils)
    const isTie = this._checkForTie(gridUtils)
    if (winner || isTie) {
      if (winner) {
        this.setState({ winner: currentPlayer })
      } else  {
        this.setState({ winner: possibleWinners.TIE })
      }
    } else {
      this.setState({ whoseTurn:  otherPlayer })
    }
  }

  humanUndoesTemporaryMove = () => {
    this.setState({
      humanOnTemporaryMove: false, humanTemporaryMove: null
    })
  }

  _checkForWinner = (currentPlayer, moveMade, gridUtils) => {
    const amountToWinBy = 5
    const column = moveMade.column
    const row = moveMade.row
    const shouldCheckForwardDiagonal = column === row
    const shouldCheckBackwardsDiagonal = column + row  === LENGTH_OF_DIAGONAL_IN_GRID - 1
    return (gridUtils.hasXAmountOrMoreInRow(row, currentPlayer, amountToWinBy)
        || gridUtils.hasXAmountOrMoreInColumn(column, currentPlayer, amountToWinBy)
        || (shouldCheckForwardDiagonal
            && gridUtils.hasXAmountOrMoreInForwardDiagonal(currentPlayer, amountToWinBy)
            )
        || (shouldCheckBackwardsDiagonal &&
            gridUtils.hasXAmountOrMoreInBackwardsDiagonal(currentPlayer, amountToWinBy)
            )
    )
  }

  _checkForTie = (gridUtils) => {
    for (let row = 0; row < ROWS_IN_GRID; row += 1) {
      if (gridUtils.hasXAmountOrMoreInRow(row, null, 1)) {
        return false
      }
    }
    return true
  }

  // _hasXInAnyDiagonal = (item, ) =>
  //   this._hasXInForwardDiagonal(item, x) || this._hasXInBackwardDiagonal(item, x)

  // _hasXInForwardDiagonal = (item, x) => {
  //   let allowableUnfoundItemsInforwardDiagonal = LENGTH_OF_DIAGONAL_IN_GRID - x
  //   for (let i = 0; i < LENGTH_OF_DIAGONAL_IN_GRID; i += 1) {
  //     if (this.state.grid.getIn([i, i]) !== item) {
  //       allowableUnfoundItemsInforwardDiagonal -= 1
  //     }
  //     if (allowableUnfoundItemsInforwardDiagonal < 0) {
  //       return false
  //     }
  //   }
  //   return true
  // }

  // _hasXInAnyRow = (item, x) => {
  //   for (let row = 0; row < ROWS_IN_GRID; row += 1) {
  //     if (hasXAmountInRow(grid, COLUMNS_IN_GRID, row, x)) {
  //       return true
  //     }
  //   }
  //   return false
  // }

  // _hasXInAnyColumn = (item, x) => {
  //   for (let i = 0; i < COLUMNS_IN_GRID; i += 1) {
  //     if (this._hasXInAColumn(item, i, x)) {
  //       return true
  //     }
  //   }
  //   return false
  // }

  computerCompletesMove = (move) => {
    this.setState({
      grid: this.state.grid.setIn([move.row, move.column], players.COMPUTER)
    }, () => this._updateGameResultsAfterMove(move))
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
        {this.state.name ? this._renderApp() : null}
      </div>
    )
  }
}

export default TicTacToeApp


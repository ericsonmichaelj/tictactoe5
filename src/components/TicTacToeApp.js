import React is} from 'react'
import swal from 'sweetalert'
import Immutable from 'immutable'
import ChangeMovePanel from './ChangeMovePanel'
import TicTacToeBoard from './TicTacToeBoard'
import GamePanel from './GamePanel'
import { players } from '../constants/'

const ROWS_IN_GRID = 5
const COLUMNS_IN_GRID = 5
const LENGTH_OF_DIAGONAL_IN_GRID = 5

const mutableGridRow = Array(ROWS_IN_GRID).fill(null)
const mutableGrid = Array(COLUMNS_IN_GRID).fill(mutableGridRow)
const grid = Immutable.fromJS(mutableGrid)

const newGameConfig = {
  name: null,
  grid,
  humanOnTemporaryMove: false,
  humanTemporaryMove: null,
  whoseTurn: Math.floor(2 * Math.random()) ? players.HUMAN : players.ROBOT,
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
      this.setState({ name: inputValue })
    })
  }

  humanCompletesTemporaryMove = () => {
    const gridWithNewMove = this.state.grid.get(this.state.humanTemporaryMove.row)
      .set(this.state.humanTemporaryMove.column, players.HUMAN)
    this.setState({
      humanOnTemporaryMove: false,
      grid: gridWithNewMove
    }, () => {
      const humanWon = this._checkforWinner(players.HUMAN)
      if (humanWon) {
        this.setState({ winner: players.HUMAN })
      } else {
        this.setState({ whoseTurn: players.COMPUTER })
      }
    })
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
      if (this.state.grid.get(i).get(i) !== item) {
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
      if (this.state.grid.get(LENGTH_OF_DIAGONAL_IN_GRID - i).get(i) !== item) {
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


  render() {
    return (
      <div>
        {this.state.humanOnTemporaryMove ?
          <ChangeMovePanel
            completeTemporaryMove={this.humanCompletesTemporaryMove}
            humanUndoesTemporaryMove={this.undoTemporyMove}
          /> : null}
        <TicTacToeBoard
          grid={this.state.grid}
          OnTemporaryMove={this.state.humanOnTemporaryMove}
          temporaryMove={this.state.human}
          whoseTurn={this.state.whoseTurn}
        />
        <GamePanel
          name={this.state.name}
          winner={this.state.winner}
          whoseTurn={this.state.whoseTurn}
        />
      </div>
    )
  }
}

export default TicTacToeApp


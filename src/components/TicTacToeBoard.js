import React, { PropTypes } from 'react'
import Immutable from 'immutable'
import { players,
  possibleWinners,
  ROWS_IN_GRID,
  COLUMNS_IN_GRID,
  LENGTH_OF_DIAGONAL_IN_GRID
} from '../constants'
import GridUtils from '../utils'
import Cell from './Cell'

class TicTacToeBoard extends React.Component {

  componentWillMount() {
    if (this.props.whoseTurn === players.COMPUTER) {
      this.computerCreatesMove()
    }
  }

  componentDidUpdate(prevProps) {
    const isNewGame = !this.props.winner && (prevProps.winner !== this.props.winner)
    if ((prevProps.whoseTurn !== this.props.whoseTurn || isNewGame)
      && this.props.whoseTurn === players.COMPUTER) {
      this.computerCreatesMove()
    }
  }

  computerCreatesMove = () => {
    const TIME_COMPUTER_TAKES = 3000
    const initialTime = performance.now()
    const move = this._computerDecidesMove()
    const finalTime = performance.now()
    setTimeout(() => {
      this.props.computerCompletesMove(move)
    },
     TIME_COMPUTER_TAKES - (finalTime - initialTime))
  }

  _computerDecidesMove = () => {
    const amountToWinBy = 5
    let checkIfHaveXAmount = amountToWinBy - 1
    for (checkIfHaveXAmount; checkIfHaveXAmount >= 0; checkIfHaveXAmount -= 1) {
      // Search for an attacking move first
      let move = this._computerSearchesForMove(checkIfHaveXAmount, players.HUMAN, players.COMPUTER)
      if (move != null) {
        return move
      }
      // Search for a defensive move next
      move = this._computerSearchesForMove(checkIfHaveXAmount, players.COMPUTER, players.HUMAN)
      if (move != null) {
        return move
      }
    }
    // No strategic move
    return this._computerMovesAnyFreeSpace()
  }

  _computerSearchesForMove = (amount, blockingItem, attackingItem) =>  {
    const gridUtils = new GridUtils(this.props.grid,
      COLUMNS_IN_GRID, ROWS_IN_GRID, LENGTH_OF_DIAGONAL_IN_GRID)
    for (let row = 0; row < ROWS_IN_GRID; row += 1) {
      const column = row
      if (gridUtils.hasXAmountOrMoreInRow(row, attackingItem, amount)
        && !gridUtils.hasXAmountOrMoreInRow(row, blockingItem, 1)
        && gridUtils.findCoordinatesOfFirstXInRow(row, null) !== -1) {
        return gridUtils.findCoordinatesOfFirstXInRow(row, null)
      }
      if (gridUtils.hasXAmountOrMoreInColumn(column, attackingItem, amount)
        && !gridUtils.hasXAmountOrMoreInColumn(column, blockingItem, 1)
        && gridUtils.findCoordinatesOfFirstXInColumn(column, null) !== -1) {
        return gridUtils.findCoordinatesOfFirstXInColumn(column, null)
      }
    }
    if (gridUtils.hasXAmountOrMoreInForwardDiagonal(attackingItem, amount)
      && !gridUtils.hasXAmountOrMoreInForwardDiagonal(blockingItem, 1)
      && gridUtils.findCoordinatesOfFirstXInForwardDiagonal(null) !== -1) {
      return gridUtils.findCoordinatesOfFirstXInForwardDiagonal(null)
    }
    if (gridUtils.hasXAmountOrMoreInBackwardsDiagonal(attackingItem, amount)
      && !gridUtils.hasXAmountOrMoreInBackwardsDiagonal(blockingItem, 1)
      && gridUtils.findCoordinatesOfFirstXInBackwardsDiagonal(null) !== -1) {
      return gridUtils.findCoordinatesOfFirstXInBackwardsDiagonal(null)
    }
    return null
  }

  _computerMovesAnyFreeSpace = () => {
    for (let i = 0; i < ROWS_IN_GRID; i += 1) {
      for (let j = 0; j < COLUMNS_IN_GRID; j += 1) {
        if (this.props.grid.get(i).get(j) === null) {
          return { row: i, column: j }
        }
      }
    }
    return Error('No empty cell')
  }

  _renderRow = (list, indexRow) =>
    (
      <div key={indexRow} className='row'>
        {list.map((value, indexColumn) =>
          <Cell
            row={indexRow}
            key={indexColumn}
            column={indexColumn}
            whoseTurn={this.props.whoseTurn}
            value={value}
            winner={this.props.winner}
            humanDoesTemporaryMove={this.props.humanDoesTemporaryMove}
            temporaryMove={this.props.temporaryMove}
            onTemporaryMove={this.props.onTemporaryMove}
          />
        )}
      </div>
    )

  render() {
    return (
      <div className='board'>
        {this.props.grid.map((list, indexRow) =>
          this._renderRow(list, indexRow)
          )
        }
      </div>
    )
  }
}

TicTacToeBoard.propTypes = {
  grid: PropTypes.instanceOf(Immutable.List).isRequired,
  temporaryMove: PropTypes.shape({
    column: PropTypes.number,
    row: PropTypes.number
  }),
  winner: PropTypes.oneOf(
    [possibleWinners.HUMAN, possibleWinners.COMPUTER, possibleWinners.TIE]
  ),
  onTemporaryMove: PropTypes.bool,
  computerCompletesMove: PropTypes.func.isRequired,
  humanDoesTemporaryMove: PropTypes.func.isRequired,
  whoseTurn: PropTypes.oneOf([players.HUMAN, players.COMPUTER]),
}

export default TicTacToeBoard

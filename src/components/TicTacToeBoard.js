import React, { PropTypes } from 'react'
import Immutable from 'immutable'
import { players, ROWS_IN_GRID, COLUMNS_IN_GRID } from '../constants/'
import Cell from './Cell'

class TicTacToeBoard extends React.Component {

  onComponentWillMount() {
    if (this.props.whoseTurn === players.COMPUTER) {
      this.computerCreatesMove()
    }
  }

  onComponentDidUpdate() {
    if (this.props.whoseTurn === players.COMPUTER) {
      this.computerCreatesMove()
    }
  }

  computerCreatesMove = () => {
    const TIME_COMPUTER_TAKES = 3000
    const initialTime = performance.now()
    const move = this.computerDecidesMove()
    const finalTime = performance.now()
    setTimeout(() => this.props.computerCompletesMove(move),
     TIME_COMPUTER_TAKES - (finalTime - initialTime))
  }

  _computerDecidesMove() {
    // TODO: Improve algorithm
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
      <tr key={indexRow}>
        {list.map((value, indexColumn) =>
          <Cell
            row={indexRow}
            column={indexColumn}
            value={value}
            humanDoesTemporaryMove={this.props.humanDoesTemporaryMove}
            temporaryMove={this.props.temporaryMove}
            onTemporaryMove={this.props.onTemporaryMove}
          />
        )}
      </tr>
    )

  render() {
    return (
      <table>
        {this.props.grid.map((list, indexRow) =>
          this._renderRow(list, indexRow)
          )
        }
      </table>
    )
  }
}

TicTacToeBoard.propTypes = {
  grid: PropTypes.instanceOf(Immutable.List),
  temporaryMove: PropTypes.shape({
    column: PropTypes.number,
    row: PropTypes.number
  }),
  onTemporaryMove: PropTypes.boolean,
  computerCompletesMove: PropTypes.func,
  humanDoesTemporaryMove: PropTypes.func,
  whoseTurn: PropTypes.number
}

export default TicTacToeBoard

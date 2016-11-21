import React, { PropTypes } from 'react'
import Immutable from 'immutable'
import { players, ROWS_IN_GRID, COLUMNS_IN_GRID } from '../constants/'
import Cell from './Cell'

class TicTacToeBoard extends React.Component {

  componentWillMount() {
    if (this.props.whoseTurn === players.COMPUTER) {
      this.computerCreatesMove()
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.whoseTurn !== this.props.whoseTurn
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
  winner: PropTypes.oneOf([players.HUMAN, players.COMPUTER]),
  onTemporaryMove: PropTypes.bool,
  computerCompletesMove: PropTypes.func.isRequired,
  humanDoesTemporaryMove: PropTypes.func.isRequired,
  whoseTurn: PropTypes.oneOf([players.HUMAN, players.COMPUTER]).isRequired
}

export default TicTacToeBoard

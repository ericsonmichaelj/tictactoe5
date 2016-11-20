import React, { PropTypes } from 'react'
import { players } from '../constants'

class Cell extends React.Component {

  validateClick = (displayItem) => {
    const { whoseTurn, onTemporaryMove, humanDoesTemporaryMove, winner, row, column } = this.props
    if (!displayItem && whoseTurn === players.HUMAN
      && !onTemporaryMove && !winner) {
      humanDoesTemporaryMove(row, column)
    }
  }

  render() {
    let displayItem = null
    const { temporaryMove, value, column, row } = this.props
    if (temporaryMove && temporaryMove.column === column
      && temporaryMove.row === row) {
      displayItem = 'x'
    } else if (value === players.COMPUTER) {
      displayItem = 'o'
    } else if (value === players.HUMAN) {
      displayItem = 'x'
    }
    return (
      <td>
        <button onClick={() => this.validateClick(displayItem)}>
          {displayItem}
        </button>
      </td>
    )
  }
}
Cell.propTypes = {
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
  temporaryMove: PropTypes.shape({
    column: PropTypes.number,
    row: PropTypes.number
  }),
  winner: PropTypes.oneOf([players.HUMAN, players.COMPUTER]),
  value: PropTypes.oneOf([players.HUMAN, players.COMPUTER]),
  onTemporaryMove: PropTypes.bool.isRequired,
  humanDoesTemporaryMove: PropTypes.func.isRequired,
  whoseTurn: PropTypes.oneOf([players.HUMAN, players.COMPUTER]).isRequired
}

export default Cell

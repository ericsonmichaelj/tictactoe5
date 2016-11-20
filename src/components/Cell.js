import React, { PropTypes } from 'react'
import { players } from '../constants'

class Cell extends React.Component {

  validateClick = (displayItem) => {
    const { whoseTurn, onTemporaryMove, humanDoesTemporaryMove, row, column } = this.props
    if (!displayItem && whoseTurn === players.HUMAN
      && !onTemporaryMove) {
      humanDoesTemporaryMove(row, column)
    }
  }

  render() {
    let displayItem = null
    const { temporaryMove, value, column, row } = this.props
    if (temporaryMove.column === column
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
  row: PropTypes.number,
  column: PropTypes.number,
  temporaryMove: PropTypes.shape({
    column: PropTypes.number,
    row: PropTypes.number
  }),
  value: PropTypes.number,
  onTemporaryMove: PropTypes.boolean,
  humanDoesTemporaryMove: PropTypes.func,
  whoseTurn: PropTypes.number
}

export default Cell

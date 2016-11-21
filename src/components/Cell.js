import React, { PropTypes } from 'react'
import {
  players,
  possibleWinners,
  ROWS_IN_GRID,
  COLUMNS_IN_GRID
} from '../constants'

class Cell extends React.Component {

  validateClick = (displayItem) => {
    const { whoseTurn, onTemporaryMove, humanDoesTemporaryMove, winner, row, column } = this.props
    if (!displayItem && whoseTurn === players.HUMAN
      && !onTemporaryMove && !winner) {
      humanDoesTemporaryMove(row, column)
    }
  }

  _removeEdgeBorders = () => {
    const style = {}
    const styleForRemovingBorder = '3px transparent solid'
    if (this.props.row === 0) {
      style.borderTop = styleForRemovingBorder
    }
    if (this.props.column === 0) {
      style.borderLeft = styleForRemovingBorder
    }
    if (this.props.row === ROWS_IN_GRID - 1) {
      style.borderBottom = styleForRemovingBorder
    }
    if (this.props.column === COLUMNS_IN_GRID - 1) {
      style.borderRight = styleForRemovingBorder
    }
    return style
  }

  render() {
    const style = this._removeEdgeBorders()
    let displayItem = null
    const { temporaryMove, value, column, row } = this.props
    if (temporaryMove && temporaryMove.column === column
      && temporaryMove.row === row) {
      style.backgroundColor = '#faf2cc'
      displayItem = 'x'
    } else if (value === players.COMPUTER) {
      displayItem = 'o'
    } else if (value === players.HUMAN) {
      displayItem = 'x'
    }
    return (
      <div
        className='square'
        style={style}
        onClick={() => this.validateClick(displayItem)}
      >
        <div className={`content bg ${displayItem}`} />
      </div>
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
  winner: PropTypes.oneOf(
    [possibleWinners.HUMAN, possibleWinners.COMPUTER, possibleWinners.TIE]
  ),
  value: PropTypes.oneOf([players.HUMAN, players.COMPUTER]),
  onTemporaryMove: PropTypes.bool.isRequired,
  humanDoesTemporaryMove: PropTypes.func.isRequired,
  whoseTurn: PropTypes.oneOf([players.HUMAN, players.COMPUTER])
}

export default Cell

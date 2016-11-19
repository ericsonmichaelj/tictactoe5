import React, { PropTypes } from 'react'
import Immutable from 'immutable'
import { players } from '../constants/'

class TicTacToeBoard extends React.Component {

  validateClick = () => {
    if()
  }

  _renderCell = (value, indexRow, indexColumn) => {
    if (this.props.humanTemporaryMove.column === indexRow
        && this.props.humanTemporaryMove.column === indexColumn) {
      return (
        <div>x</div>
      )
    } else if (value === players.COMPUTER) {
      return (
        <div>o</div>
        )
    } else if (value === players.COMPUTER) {
      return <div>o</div>
    } else {
      return (
        <div onClick={this.validateClick}></div>
      )
    }
  }

  _renderRow = (list, indexRow) => {
    return (
        <tr key={index}>
          {list.map((value, indexColumn) =>
              <td>this._renderCell(value, indexRow, indexColumn)</td>
          )}
        </tr>
      )
  }

  render() {
    return (
      <table>
        {this.props.grid.map((list, index) =>
          {this._renderRow(list, indexRow)}
          )
      }
      </table>
    )
  }
}

TicTacToeBoard.propTypes = {
  grid: PropTypes.instanceOf(Immutable.List),
  humanTemporaryMove: PropTypes.shape({
    column: PropTypes.number,
    row: PropTypes.number
  }),


}

export default TicTacToeBoard

import React, { PropTypes } from 'react'
import { players } from '../constants/'

class GamePanel extends React.Component {

  _renderGameStatusMessage = () => {
    if (this.props.winner) {
      return (
        <div>
          {this.props.winner === players.HUMAN ?
            'You won!' : 'computer won'
          }
          <button onClick={this.props.newGame}>
            New Game
          </button>
        </div>
      )
    } else {
      return (
        <div>
          {this.props.whoseTurn === players.HUMAN ?
            'Your turn' : 'computer\'s turn'
          }
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        Welcome {this.props.name}!
          {this._renderGameStatusMessage()}
      </div>
    )
  }
}

GamePanel.propTypes = {
  name: PropTypes.string.isRequired,
  winner: PropTypes.oneOf([players.HUMAN, players.COMPUTER]),
  whoseTurn: PropTypes.oneOf([players.HUMAN, players.COMPUTER]),
  newGame: PropTypes.func.isRequired
}

export default GamePanel

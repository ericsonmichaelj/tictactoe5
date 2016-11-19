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
        Welcome ${this.props.name}!
      </div>
    )
  }
}

GamePanel.propTypes = {
  name: PropTypes.string,
  winner: PropTypes.number,
  whoseTurn: PropTypes.number
}

export default GamePanel

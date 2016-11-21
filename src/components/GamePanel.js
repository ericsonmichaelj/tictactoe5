import React, { PropTypes } from 'react'
import { players, possibleWinners } from '../constants/'

class GamePanel extends React.Component {

  _renderGameStatusMessage = () => {
    if (this.props.winner) {
      return (
        <div>
          <p>
            {
              this.props.winner === possibleWinners.HUMAN &&
              <span className='human-wins'>You won!</span>
            }
            {
              this.props.winner === possibleWinners.COMPUTER &&
              <span className='computer-wins'>Computer won!</span>
            }
            {
              this.props.winner === possibleWinners.TIE &&
              <span className='tie'>It is a tie!</span>
            }
          </p>
          <button className='btn btn-primary' onClick={this.props.newGame}>
            New Game
          </button>
        </div>

      )
    } else {
      return (
        <p style={{ color: '#104e6f' }}>
          {this.props.whoseTurn === players.HUMAN ?
            'Your turn!' : 'Computer\'s turn!'
          }
        </p>
      )
    }
  }

  render() {
    return (
      <div className='panel panel-primary game-panel'>
        <div className='panel-heading'>
            5 x 5 Tic-Tac-Toe
        </div>
        <div className='panel-body text-center game-panel-text'>
          <p>Welcome {this.props.name}</p>
          <hr />
          {this._renderGameStatusMessage()}
        </div>
      </div>
    )
  }
}

GamePanel.propTypes = {
  name: PropTypes.string.isRequired,
  winner: PropTypes.oneOf(
    [possibleWinners.HUMAN, possibleWinners.COMPUTER, possibleWinners.TIE]
  ),
  whoseTurn: PropTypes.oneOf([players.HUMAN, players.COMPUTER]),
  newGame: PropTypes.func.isRequired
}

export default GamePanel

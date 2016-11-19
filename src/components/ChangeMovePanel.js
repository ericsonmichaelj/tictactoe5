import React, { PropTypes } from 'react'
import ReactCountdownClock from 'react-countdown-clock'


class ChangeMovePanel extends React.Component {

  render() {
    return (
      <div>
        Is that your final move?
        <ReactCountdownClock
          seconds={60}
          color='#000'
          alpha={0.9}
          size={300}
          onComplete={this.completeTemporaryMove}
        />
        <button onClick={this.completeTemporaryMove}>
          Yes
        </button>
        <button onClick={this.undoTemporyMove}>
          No
        </button>
      </div>
    )
  }
}


export default ChangeMovePanel

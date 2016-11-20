import React, { PropTypes } from 'react'
import ReactCountdownClock from 'react-countdown-clock'


const ChangeMovePanel = ({ completeTemporaryMove, undoTemporaryMove }) =>
    (
      <div>
        Is that your final move?
        <ReactCountdownClock
          seconds={3}
          color='#000'
          alpha={0.9}
          size={100}
          onComplete={completeTemporaryMove}
        />
        <button onClick={completeTemporaryMove}>
          Yes
        </button>
        <button onClick={undoTemporaryMove}>
          No
        </button>
      </div>
    )

ChangeMovePanel.propTypes = {
  completeTemporaryMove: PropTypes.func.isRequired,
  undoTemporaryMove: PropTypes.func.isRequired
}

export default ChangeMovePanel

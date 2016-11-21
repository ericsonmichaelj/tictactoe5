import React, { PropTypes } from 'react'
import ReactCountdownClock from 'react-countdown-clock'


const ChangeMovePanel = ({ completeTemporaryMove, undoTemporaryMove, onTemporaryMove }) => {
  const style = {}
  if (!onTemporaryMove) {
    style.visibility = 'hidden'
  }
  return (
    <div className='panel panel-default change-move-panel' style={style}>
      <div className='panel-body'>
        <h4
          className='text-center'
          style={{ marginTop: '0px' }}
        >
          Is that your final move?
        </h4>
        <div className='text-center'>
          { onTemporaryMove ?
            <ReactCountdownClock
              seconds={3}
              color='#d9534f'
              alpha={1}
              size={40}
              onComplete={completeTemporaryMove}
            /> : <div style={{ width: '40px', height: '40px' }} /> }
        </div>
        <div className='row text-center'>
          <div
            className='btn-group text-center'
            style={{ marginRight: '1em' }}
          >
            <button
              type='button'
              className='btn btn-primary'
              onClick={completeTemporaryMove}
            >
              Yes
            </button>
          </div>
          <div
            className='btn-group'
            style={{ marginLeft: '1em' }}
          >
            <button
              type='button'
              className='btn btn-danger'
              onClick={undoTemporaryMove}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

ChangeMovePanel.propTypes = {
  completeTemporaryMove: PropTypes.func.isRequired,
  undoTemporaryMove: PropTypes.func.isRequired,
  onTemporaryMove:PropTypes.bool.isRequired
}

export default ChangeMovePanel

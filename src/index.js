import React from 'react'
import ReactDOM from 'react-dom'
import Immutable from 'immutable'
import TicTacToeApp from './components/TicTacToeApp'

const mutableGridRow = Array(5).fill(null)     
const muttableGrid = Array(5).fill(mutableGrid);


ReactDOM.render(
  <TicTacToeApp store={store}/>,
  document.getElementById('app'))
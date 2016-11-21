export default class GridUtils {
  constructor(grid, columnsInGrid, rowsInGrid, lengthOfDiagonal) {
    this.grid = grid
    this.columnsInGrid = columnsInGrid
    this.rowsInGrid = rowsInGrid
    this.lengthOfDiagonal = lengthOfDiagonal
  }
  hasXAmountOrMoreInRow(row, x, amount) {
    let amountFound = 0
    for (let column = 0; column < this.columnsInGrid; column += 1) {
      if (this.grid.getIn([row, column]) === x) {
        amountFound += 1
      }
      if (amountFound >= amount) {
        return true
      }
    }
    return false
  }
  findCoordinatesOfFirstXInRow(row, x) {
    for (let column = 0; column < this.columnsInGrid; column += 1) {
      if (this.grid.getIn([row, column]) === x) {
        return { row, column }
      }
    }
    return -1
  }
  hasXAmountOrMoreInColumn(column, x, amount) {
    let amountFound = 0
    for (let row = 0; row < this.rowsInGrid; row += 1) {
      if (this.grid.getIn([row, column]) === x) {
        amountFound += 1
      }
      if (amountFound >= amount) {
        return true
      }
    }
    return false
  }
  findCoordinatesOfFirstXInColumn(column, x) {
    for (let row = 0; row < this.rowsInGrid; row += 1) {
      if (this.grid.getIn([row, column]) === x) {
        return { row, column }
      }
    }
    return -1
  }
  hasXAmountOrMoreInBackwardsDiagonal(x, amount) {
    let amountFound = 0
    for (let row = 0; row < this.lengthOfDiagonal; row += 1) {
      const column = this.lengthOfDiagonal - 1 - row
      if (this.grid.getIn([row, column]) === x) {
        amountFound += 1
      }
      if (amountFound >= amount) {
        return true
      }
    }
    return false
  }
  findCoordinatesOfFirstXInBackwardsDiagonal(x) {
    for (let row = 0; row < this.lengthOfDiagonal; row += 1) {
      const column = this.lengthOfDiagonal - 1 - row
      if (this.grid.getIn([row, column]) === x) {
        return { row, column }
      }
    }
    return -1
  }
  hasXAmountOrMoreInForwardDiagonal(x, amount) {
    let amountFound = 0
    for (let row = 0; row < this.lengthOfDiagonal; row += 1) {
      const column = row
      if (this.grid.getIn([row, column]) === x) {
        amountFound += 1
      }
      if (amountFound >= amount) {
        return true
      }
    }
    return false
  }
  findCoordinatesOfFirstXInForwardDiagonal(x) {
    for (let row = 0; row < this.lengthOfDiagonal; row += 1) {
      const column = row
      if (this.grid.getIn([row, column]) === x) {
        return { row, column }
      }
    }
    return -1
  }
}

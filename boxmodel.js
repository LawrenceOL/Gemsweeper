class Square {
  constructor(squareName, coordinates, neighbors) {
    this.squareName = squareName
    this.coordinates = coordinates
    this.neighbors = neighbors
    this.isLava = false
    this.isGem = false
    this.isHiddenObject = false
    this.isFlagged = false
    this.isFlipped = false
    this.selector = document.querySelector(`${boxName}`)
    this.squareValue = 0
  }
}

//idToCoords is an object
// idToCoords.box0 is an object

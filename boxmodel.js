class Box {
  constructor(boxName, coordinates, neighbors) {
    this.boxName = boxName
    this.coordinates = coordinates
    this.neighbors = neighbors
    this.isLava = false
    this.isGem = false
    this.isFlagged = false
    this.isFlipped = false
    this.selector = document.querySelector(`${boxName}`)
  }
}

//idToCoords is an object
// idToCoords.box0 is an object

let gameSquares = document.querySelectorAll('.game-square')
let resetButton = document.querySelector('button')

let lavaDisplay = document.querySelector('#lava-display')
let gemDisplay = document.querySelector('#gem-display')

let gridWidth = 9
let gridHeight = 9
let squareCount = gridWidth * gridHeight
let totalLavas = 8

let seededHiddenLava = 0
let totalGems = 2
let seededGems = 0

let coordinateArrayOfSquares = []

const idToCoords = {}
const squares = {}

generateCoordinatesArray()
generateSquareObjects()
addSquareID()
seedHidden()
seedGems()
incrementValuesAroundHidden()
addFlipListener()

resetButton.addEventListener('click', reset)

//functions

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min) //The maximum is inclusive and the minimum is inclusive
}

function seedHidden() {
  while (seededHiddenLava < totalLavas) {
    for (let i = 0; i < squareCount; i++) {
      if (
        seededHiddenLava < totalLavas &&
        !squares[coordinateArrayOfSquares[i]].isLava
      ) {
        if (getRandomIntInclusive(1, 10) === 5) {
          squares[coordinateArrayOfSquares[i]].isLava = true
          squares[coordinateArrayOfSquares[i]].isHiddenObject = true
          // document.querySelector(
          //   squares[coordinateArrayOfSquares[i]].selector
          // ).style.background = 'red'
          seededHiddenLava += 1
        }
      }
    }
  }
}

function seedGems() {
  while (seededGems < totalGems) {
    for (let i = 0; i < squareCount; i++) {
      if (
        seededGems < totalGems &&
        !squares[coordinateArrayOfSquares[i]].isHiddenObject
      ) {
        if (getRandomIntInclusive(1, 10) === 5) {
          squares[coordinateArrayOfSquares[i]].isGem = true
          squares[coordinateArrayOfSquares[i]].isHiddenObject = true
          // document.querySelector(
          //   squares[coordinateArrayOfSquares[i]].selector
          // ).style.background = 'lightblue'
          seededGems += 1
        }
      }
    }
  }
}

//generates 9x9 2d array
function generateCoordinatesArray() {
  for (y = gridHeight - 1; y >= 0; y--) {
    for (let x = 0; x < gridWidth; x++) {
      coordinateArrayOfSquares.push([x, y])
    }
  }
}

function generateSquareObjects() {
  for (let i = 0; i < squareCount; i++) {
    let squareName = 'square' + i
    squares[coordinateArrayOfSquares[i]] = {
      name: squareName,
      coordinates: coordinateArrayOfSquares[i],
      neighbors: 'tbd',
      isLava: false,
      isGem: false,
      isHiddenObject: false,
      squareValue: 0,
      isFlagged: false,
      isFlipped: false,
      selector: `#${squareName}`
    }
  }
}

function addSquareID() {
  gameSquares.forEach((gameSquare, index) => {
    let id = `square${index}`
    gameSquare.id = id
  })
}

function addFlipListener() {
  gameSquares.forEach((gameSquare, i) => {
    gameSquare.addEventListener('click', () => {
      if (
        !squares[coordinateArrayOfSquares[i]].isFlipped &&
        squares[coordinateArrayOfSquares[i]].isHiddenObject === false
      )
        if (squares[coordinateArrayOfSquares[i]].squareValue === 0) {
          let x = squares[coordinateArrayOfSquares[i]].coordinates[0]
          let y = squares[coordinateArrayOfSquares[i]].coordinates[1]
          let num = 0

          flipAdjacentEmptySquares(x, y, num)
        }

      {
        document.querySelector(
          squares[coordinateArrayOfSquares[i]].selector
        ).style.background = 'gray'
        squares[coordinateArrayOfSquares[i]].isFlipped = true
      }

      if (squares[coordinateArrayOfSquares[i]].squareValue > 0) {
        document.querySelector(
          squares[coordinateArrayOfSquares[i]].selector
        ).innerText = `${squares[coordinateArrayOfSquares[i]].squareValue}`
      }

      if (squares[coordinateArrayOfSquares[i]].isLava === true) {
        document.querySelector(
          squares[coordinateArrayOfSquares[i]].selector
        ).style.background = 'red'
        alert('you lose!')
      }

      if (squares[coordinateArrayOfSquares[i]].isGem === true) {
        document.querySelector(
          squares[coordinateArrayOfSquares[i]].selector
        ).style.background = 'lightblue'
        alert('you found a gem!!')
      }
    })
  })
}

function incrementValuesAroundHidden() {
  for (i = 0; i < squareCount; i++) {
    // left adjacent
    if (
      squares[coordinateArrayOfSquares[i - 1]] &&
      squares[coordinateArrayOfSquares[i]].coordinates[0] !== 0 &&
      squares[coordinateArrayOfSquares[i]].isHiddenObject &&
      !squares[coordinateArrayOfSquares[i - 1]].isHiddenObject
    ) {
      squares[coordinateArrayOfSquares[i - 1]].squareValue += 1
      // document.querySelector(
      //   squares[coordinateArrayOfSquares[i - 1]].selector
      // ).innerText = `${squares[coordinateArrayOfSquares[i - 1]].squareValue}`
    }

    // //     //right adjacent
    if (
      squares[coordinateArrayOfSquares[i + 1]] &&
      squares[coordinateArrayOfSquares[i]].coordinates[0] !== 8 &&
      squares[coordinateArrayOfSquares[i]].isHiddenObject &&
      !squares[coordinateArrayOfSquares[i + 1]].isHiddenObject
    ) {
      squares[coordinateArrayOfSquares[i + 1]].squareValue += 1
      // document.querySelector(
      //   squares[coordinateArrayOfSquares[i + 1]].selector
      // ).innerText = `${squares[coordinateArrayOfSquares[i + 1]].squareValue}`
    }

    // //Above - 1 aka 10 before
    if (
      squares[coordinateArrayOfSquares[i - gridWidth - 1]] &&
      squares[coordinateArrayOfSquares[i]].isHiddenObject &&
      !squares[coordinateArrayOfSquares[i - gridWidth - 1]].isHiddenObject &&
      squares[coordinateArrayOfSquares[i]].coordinates[0] !== 0
    ) {
      squares[coordinateArrayOfSquares[i - gridWidth - 1]].squareValue += 1
      // document.querySelector(
      //   squares[coordinateArrayOfSquares[i - gridWidth - 1]].selector
      // ).innerText = `${
      //   squares[coordinateArrayOfSquares[i - gridWidth - 1]].squareValue
      // }`
    }

    // //Above aka 9 before
    if (
      squares[coordinateArrayOfSquares[i - gridWidth]] &&
      squares[coordinateArrayOfSquares[i]].isHiddenObject &&
      !squares[coordinateArrayOfSquares[i - gridWidth]].isHiddenObject
    ) {
      squares[coordinateArrayOfSquares[i - gridWidth]].squareValue += 1
      // document.querySelector(
      //   squares[coordinateArrayOfSquares[i - gridWidth]].selector
      // ).innerText = `${
      //   squares[coordinateArrayOfSquares[i - gridWidth]].squareValue
      // }`
    }

    // //Above + 1 aka 8 before
    if (
      squares[coordinateArrayOfSquares[i - gridWidth + 1]] &&
      squares[coordinateArrayOfSquares[i]].isHiddenObject &&
      !squares[coordinateArrayOfSquares[i - gridWidth + 1]].isHiddenObject &&
      squares[coordinateArrayOfSquares[i]].coordinates[0] !== 8
    ) {
      squares[coordinateArrayOfSquares[i - gridWidth + 1]].squareValue += 1
      // document.querySelector(
      //   squares[coordinateArrayOfSquares[i - gridWidth + 1]].selector
      // ).innerText = `${
      //   squares[coordinateArrayOfSquares[i - gridWidth + 1]].squareValue
      // }`
    }

    // //below - 1 aka 8 after
    if (
      squares[coordinateArrayOfSquares[i + gridWidth - 1]] &&
      squares[coordinateArrayOfSquares[i]].isHiddenObject &&
      !squares[coordinateArrayOfSquares[i + gridWidth - 1]].isHiddenObject &&
      squares[coordinateArrayOfSquares[i]].coordinates[0] !== 0
    ) {
      squares[coordinateArrayOfSquares[i + gridWidth - 1]].squareValue += 1
      // document.querySelector(
      //   squares[coordinateArrayOfSquares[i + gridWidth - 1]].selector
      // ).innerText = `${
      //   squares[coordinateArrayOfSquares[i + gridWidth - 1]].squareValue
      // }`
    }

    // //below aka 9 after
    if (
      squares[coordinateArrayOfSquares[i + gridWidth]] &&
      squares[coordinateArrayOfSquares[i]].isHiddenObject &&
      !squares[coordinateArrayOfSquares[i + gridWidth]].isHiddenObject
    ) {
      squares[coordinateArrayOfSquares[i + gridWidth]].squareValue += 1
      // document.querySelector(
      //   squares[coordinateArrayOfSquares[i + gridWidth]].selector
      // ).innerText = `${
      //   squares[coordinateArrayOfSquares[i + gridWidth]].squareValue
      // }`
    }

    // //below + 1 aka 10 after
    if (
      squares[coordinateArrayOfSquares[i + gridWidth + 1]] &&
      squares[coordinateArrayOfSquares[i]].isHiddenObject &&
      !squares[coordinateArrayOfSquares[i + gridWidth + 1]].isHiddenObject &&
      squares[coordinateArrayOfSquares[i]].coordinates[0] !== 8
    ) {
      squares[coordinateArrayOfSquares[i + gridWidth + 1]].squareValue += 1
      // document.querySelector(
      //   squares[coordinateArrayOfSquares[i + gridWidth + 1]].selector
      // ).innerText = `${        squares[coordinateArrayOfSquares[i + gridWidth + 1]].squareValue
      // }`
    }
  }
}

function flipAdjacentEmptySquares(x, y, num) {
  console.log('x: ' + x + ' y: ' + y + ' num: ' + num)

  if (x < 0 || num >= 1) {
    return
  }
  if (x > 8 || num >= 1) {
    return
  }
  if (y < 0 || num >= 1) {
    return
  }
  if (y > 8 || num >= 1) {
    return
  }
  if (squares[`${x},${y}`].isFlipped === true) {
    return
  } else {
    num = squares[`${x},${y}`].squareValue
    document.querySelector(
      squares[`${x},${y}`].selector
    ).style.backgroundColor = `gray`

    if (num >= 1) {
      document.querySelector(squares[`${x},${y}`].selector).innerText = `${
        squares[`${x},${y}`].squareValue
      }`
    }
    squares[`${x},${y}`].isFlipped = true
    flipAdjacentEmptySquares(x - 1, y, num)
    flipAdjacentEmptySquares(x + 1, y, num)
    flipAdjacentEmptySquares(x, y + 1, num)
    flipAdjacentEmptySquares(x, y - 1, num)
  }
}

function reset() {
  window.location.reload()
}

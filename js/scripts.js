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
    for (let i = 0; i < 81; i++) {
      if (
        seededHiddenLava < totalLavas &&
        !squares[coordinateArrayOfSquares[i]].isLava
      ) {
        if (getRandomIntInclusive(1, 10) === 5) {
          squares[coordinateArrayOfSquares[i]].isLava = true
          squares[coordinateArrayOfSquares[i]].isHiddenObject = true
          document.querySelector(
            squares[coordinateArrayOfSquares[i]].selector
          ).style.background = 'red'
          seededHiddenLava += 1
        }
      }
    }
  }
}

function seedGems() {
  while (seededGems < totalGems) {
    for (let i = 0; i < 81; i++) {
      if (
        seededGems < totalGems &&
        !squares[coordinateArrayOfSquares[i]].isHiddenObject
      ) {
        if (getRandomIntInclusive(1, 10) === 5) {
          squares[coordinateArrayOfSquares[i]].isGem = true
          squares[coordinateArrayOfSquares[i]].isHiddenObject = true
          document.querySelector(
            squares[coordinateArrayOfSquares[i]].selector
          ).style.background = 'lightblue'
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
      if (!squares[coordinateArrayOfSquares[i]].isFlipped) {
        document.querySelector(
          squares[coordinateArrayOfSquares[i]].selector
        ).style.background = 'green'
        squares[coordinateArrayOfSquares[i]].isFlipped = true
      }
    })
  })
}

function incrementValuesAroundHidden() {
  for (i = 0; i < squareCount; i++) {
    // left adjacent
    if (
      squares[coordinateArrayOfSquares[i - 1]] &&
      squares[coordinateArrayOfSquares[i]].coordinates[1] !== 0 &&
      squares[coordinateArrayOfSquares[i]].isHiddenObject &&
      !squares[coordinateArrayOfSquares[i - 1]].isHiddenObject
    ) {
      squares[coordinateArrayOfSquares[i - 1]].squareValue += 1
      document.querySelector(
        squares[coordinateArrayOfSquares[i - 1]].selector
      ).innerText = `${squares[coordinateArrayOfSquares[i - 1]].squareValue}`
    }

    //right adjacent
    if (
      squares[coordinateArrayOfSquares[i + 1]] &&
      squares[coordinateArrayOfSquares[i]].coordinates[1] !== 8 &&
      squares[coordinateArrayOfSquares[i]].isHiddenObject &&
      !squares[coordinateArrayOfSquares[i + 1]].isHiddenObject
    ) {
      squares[coordinateArrayOfSquares[i + 1]].squareValue += 1
      document.querySelector(
        squares[coordinateArrayOfSquares[i + 1]].selector
      ).innerText = `${squares[coordinateArrayOfSquares[i + 1]].squareValue}`
    }
  }
}

// -- Above work

// //10 before
// else if (
//   squares[coordinateArrayOfSquares[i - gridWidth - 1]] &&
//   squares[coordinateArrayOfSquares[i]].isHiddenObject &&
//   !squares[coordinateArrayOfSquares[i - gridWidth - 1]].isHiddenObject
// ) {
//   squares[coordinateArrayOfSquares[i - gridWidth - 1]].squareValue += 1
//   document.querySelector(
//     squares[coordinateArrayOfSquares[i - gridWidth - 1]].selector
//   ).innerText = `${
//     squares[coordinateArrayOfSquares[i - gridWidth - 1]].squareValue
//   }`
// }

// //9 before
// else if (
//   squares[coordinateArrayOfSquares[i - gridWidth]] &&
//   squares[coordinateArrayOfSquares[i]].isHiddenObject &&
//   !squares[coordinateArrayOfSquares[i - gridWidth]].isHiddenObject
// ) {
//   squares[coordinateArrayOfSquares[i - gridWidth]].squareValue += 1
//   document.querySelector(
//     squares[coordinateArrayOfSquares[i - gridWidth]].selector
//   ).innerText = `${
//     squares[coordinateArrayOfSquares[i - gridWidth]].squareValue
//   }`
// }

// //8 before
// else if (
//   squares[coordinateArrayOfSquares[i - gridWidth + 1]] &&
//   squares[coordinateArrayOfSquares[i]].isHiddenObject &&
//   !squares[coordinateArrayOfSquares[i - gridWidth + 1]].isHiddenObject
// ) {
//   squares[coordinateArrayOfSquares[i - gridWidth + 1]].squareValue += 1
//   document.querySelector(
//     squares[coordinateArrayOfSquares[i - gridWidth + 1]].selector
//   ).innerText = `${
//     squares[coordinateArrayOfSquares[i - gridWidth + 1]].squareValue
//   }`
// }

// //8 after
// else if (
//   squares[coordinateArrayOfSquares[i + gridWidth - 1]] &&
//   squares[coordinateArrayOfSquares[i]].isHiddenObject &&
//   !squares[coordinateArrayOfSquares[i + gridWidth - 1]].isHiddenObject
// ) {
//   squares[coordinateArrayOfSquares[i + gridWidth - 1]].squareValue += 1
//   document.querySelector(
//     squares[coordinateArrayOfSquares[i + gridWidth - 1]].selector
//   ).innerText = `${
//     squares[coordinateArrayOfSquares[i + gridWidth - 1]].squareValue
//   }`
// }

// //9 after
// else if (
//   squares[coordinateArrayOfSquares[i + gridWidth]] &&
//   squares[coordinateArrayOfSquares[i]].isHiddenObject &&
//   !squares[coordinateArrayOfSquares[i + gridWidth]].isHiddenObject
// ) {
//   squares[coordinateArrayOfSquares[i + gridWidth]].squareValue += 1
//   document.querySelector(
//     squares[coordinateArrayOfSquares[i + gridWidth]].selector
//   ).innerText = `${
//     squares[coordinateArrayOfSquares[i + gridWidth]].squareValue
//   }`
// }

// //10 after
// else if (
//   squares[coordinateArrayOfSquares[i + gridWidth + 1]] &&
//   squares[coordinateArrayOfSquares[i]].isHiddenObject &&
//   !squares[coordinateArrayOfSquares[i + gridWidth + 1]].isHiddenObject
// ) {
//   squares[coordinateArrayOfSquares[i + gridWidth + 1]].squareValue += 1
//   document.querySelector(
//     squares[coordinateArrayOfSquares[i + gridWidth + 1]].selector
//   ).innerText = `${
//     squares[coordinateArrayOfSquares[i + gridWidth + 1]].squareValue
//   }`
// }

//   !squares[coordinateArrayOfSquares[i - 1]].isHiddenObject
// ) {
//   squares[coordinateArrayOfSquares[i - 1]].squareValue += 1
// }

//then x and y loops -1 to 1 comparing against coordinates

//   for (x = 0; x < gridWidth; x++) {
//     for (y = 0; y < gridHeight; y++) {
//       if (x > 0 && y > 0 && ![coordinateArrayOfSquares[x]].isHiddenObject) {
//         ;[coordinateArrayOfSquares[x]].squareValue += 1
//         document.querySelector(
//           squares[coordinateArrayOfSquares[x]].selector
//         ).innerText = '1'
//       }
//     }
//   }
// }

function reset() {
  window.location.reload()
}

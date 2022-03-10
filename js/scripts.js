let gameSquares = document.querySelectorAll('.game-square')
let resetButton = document.querySelector('button')

let lavaDisplay = document.querySelector('#lava-display')
let bonusDisplay = document.querySelector('#bonus-display')
let endGameBanner = document.querySelector('#end-game-banner')

let gridWidth = 9
let gridHeight = 9
let squareCount = gridWidth * gridHeight
let totalLavas = 8

let seededHiddenLava = 0
let totalGems = 2
let seededGems = 0
let flipCount = 0
let coordinateArrayOfSquares = []

const idToCoords = {}
const squares = {}

generateCoordinatesArray()
generateSquareObjects()
addSquareID()
addFlipListener()
addFlagListener()
addCheckWinListener()

resetButton.addEventListener('click', reset)

//functions

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min) //The maximum is inclusive and the minimum is inclusive
}

function cheatMode() {
  for (square in squares) {
    if (squares[square].isHiddenObject === true) {
      document.querySelector(`${squares[square].selector}`).innerText = 'H'
    } else
      document.querySelector(`${squares[square].selector}`).innerText =
        squares[square].squareValue
  }
}

function countFoundObjects() {
  let flaggedLavaCount = 0
  let flaggedGemCount = 0
  let bonusGemCount = 0
  foundObjectsCount = ['lava', 'gem bonus']
  for (square in squares) {
    if (squares[square].isFlagged === true) {
      if (squares[square].isLava === true) {
        flaggedLavaCount += 1
      }
      if (squares[square].isGem === true) {
        flaggedGemCount += 1
      }
    }
    if (squares[square].isGem === true && squares[square].isFlipped === true) {
      bonusGemCount += 1
    }
  }
  foundObjectsCount[0] = flaggedGemCount + flaggedLavaCount
  foundObjectsCount[1] = bonusGemCount * 100
  return foundObjectsCount
}

function updateFoundObjectsDisplay(foundObjectsCount) {
  lavaDisplay.innerText = `Hidden Objects Found: ${foundObjectsCount[0]}`
  bonusDisplay.innerText = `Bonus Points Awarded: ${foundObjectsCount[1]}`
}

function checkWin() {
  let flaggedHiddens = 0
  for (square in squares) {
    if (
      squares[square].isHiddenObject === true &&
      squares[square].isFlagged === true
    ) {
      flaggedHiddens += 1
      if (flaggedHiddens === 10) {
        freezeGame()
        endGameBanner.innerText = 'You win! Hit reset to play again'
        endGameBanner.style.backgroundColor = 'lightgreen'
        endGameBanner.style.visibility = 'visible'
      }
    }
  }
  countFoundObjects()
  updateFoundObjectsDisplay(foundObjectsCount)
}

function addCheckWinListener() {
  gameSquares.forEach((gameSquare) => {
    gameSquare.addEventListener('click', () => {
      checkWin()
    })

    gameSquare.addEventListener(
      'contextmenu',
      function (ev) {
        ev.preventDefault()
        checkWin()
        return false
      },
      false
    )
  })
}

function seedHidden(x, y, num) {
  while (seededHiddenLava < totalLavas) {
    for (let i = 0; i < squareCount; i++) {
      if (
        seededHiddenLava < totalLavas &&
        !squares[coordinateArrayOfSquares[i]].isLava &&
        !(
          squares[coordinateArrayOfSquares[i]].coordinates ===
          squares[`${x},${y}`]
        ) &&
        !(
          squares[coordinateArrayOfSquares[i]].coordinates ===
          squares[`${x - 1},${y}`]
        ) &&
        !(
          squares[coordinateArrayOfSquares[i]].coordinates ===
          squares[`${x + 1},${y}`]
        ) &&
        !(
          squares[coordinateArrayOfSquares[i]].coordinates ===
          squares[`${x},${y - 1}`]
        ) &&
        !(
          squares[coordinateArrayOfSquares[i]].coordinates ===
          squares[`${x},${y + 1}`]
        ) &&
        !(
          squares[coordinateArrayOfSquares[i]].coordinates ===
          squares[`${x + 1},${y + 1}`]
        ) &&
        !(
          squares[coordinateArrayOfSquares[i]].coordinates ===
          squares[`${x + 1},${y - 1}`]
        ) &&
        !(
          squares[coordinateArrayOfSquares[i]].coordinates ===
          squares[`${x - 1},${y + 1}`]
        ) &&
        !(
          squares[coordinateArrayOfSquares[i]].coordinates ===
          squares[`${x - 1},${y - 1}`]
        ) &&
        !(
          squares[coordinateArrayOfSquares[i]].coordinates ===
          squares[`${x - 1},${y - 1}`]
        )
      ) {
        if (getRandomIntInclusive(1, 10) === 5) {
          squares[coordinateArrayOfSquares[i]].isLava = true
          squares[coordinateArrayOfSquares[i]].isHiddenObject = true
          seededHiddenLava += 1
        }
      }
    }
  }
  seedGems(x, y, num)
}

function seedGems(x, y, num) {
  while (seededGems < totalGems) {
    for (let i = 0; i < squareCount; i++) {
      if (
        seededGems < totalGems &&
        !squares[coordinateArrayOfSquares[i]].isHiddenObject &&
        !(
          squares[coordinateArrayOfSquares[i]].coordinates ===
          squares[`${x},${y}`]
        ) &&
        !(
          squares[coordinateArrayOfSquares[i]].coordinates ===
          squares[`${x - 1},${y}`]
        ) &&
        !(
          squares[coordinateArrayOfSquares[i]].coordinates ===
          squares[`${x + 1},${y}`]
        ) &&
        !(
          squares[coordinateArrayOfSquares[i]].coordinates ===
          squares[`${x},${y - 1}`]
        ) &&
        !(
          squares[coordinateArrayOfSquares[i]].coordinates ===
          squares[`${x},${y + 1}`]
        ) &&
        !(
          squares[coordinateArrayOfSquares[i]].coordinates ===
          squares[`${x + 1},${y + 1}`]
        ) &&
        !(
          squares[coordinateArrayOfSquares[i]].coordinates ===
          squares[`${x + 1},${y - 1}`]
        ) &&
        !(
          squares[coordinateArrayOfSquares[i]].coordinates ===
          squares[`${x - 1},${y + 1}`]
        ) &&
        !(
          squares[coordinateArrayOfSquares[i]].coordinates ===
          squares[`${x - 1},${y - 1}`]
        ) &&
        !(
          squares[coordinateArrayOfSquares[i]].coordinates ===
          squares[`${x - 1},${y - 1}`]
        )
      ) {
        if (getRandomIntInclusive(1, 10) === 5) {
          squares[coordinateArrayOfSquares[i]].isGem = true
          squares[coordinateArrayOfSquares[i]].isHiddenObject = true
          seededGems += 1
        }
      }
    }
  }

  incrementValuesAroundHidden()
  flipAdjacentEmptySquares(x, y, num)
}

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

function freezeGame() {
  let gameBoard = document.querySelector('.game-container')
  let frozenGameBoard = gameBoard.cloneNode(true)
  gameBoard.parentNode.replaceChild(frozenGameBoard, gameBoard)
}

function addFlagListener() {
  gameSquares.forEach((gameSquare, i) => {
    gameSquare.addEventListener(
      'contextmenu',
      function (ev) {
        ev.preventDefault()
        if (
          !squares[coordinateArrayOfSquares[i]].isFlagged &&
          !squares[coordinateArrayOfSquares[i]].isFlipped
        ) {
          squares[coordinateArrayOfSquares[i]].isFlagged = true

          document.querySelector(
            squares[coordinateArrayOfSquares[i]].selector
          ).style.backgroundColor = '#d8a1e6'
        } else if (squares[coordinateArrayOfSquares[i]].isFlagged) {
          squares[coordinateArrayOfSquares[i]].isFlagged = false

          document.querySelector(
            squares[coordinateArrayOfSquares[i]].selector
          ).style.backgroundColor = '#964B00'
        }
        return false
      },
      false
    )
  })
}

function addFlipListener() {
  gameSquares.forEach((gameSquare, i) => {
    gameSquare.addEventListener('click', () => {
      if (flipCount === 0) {
        squares[coordinateArrayOfSquares[i]].isFlipped = true
        flipCount += 1
        squares[coordinateArrayOfSquares[i]].squareValue = 0
        flipCount = 1
        let x = squares[coordinateArrayOfSquares[i]].coordinates[0]
        let y = squares[coordinateArrayOfSquares[i]].coordinates[1]
        let num = -404
        seedHidden(x, y, num)
      }

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
        flipCount
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
        endGameBanner.style.visibility = 'visible'
        endGameBanner.style.backgroundColor = 'red'
        endGameBanner.innerText = 'You lose! Hit reset to play again'
        freezeGame()
      }

      if (squares[coordinateArrayOfSquares[i]].isGem === true) {
        document.querySelector(
          squares[coordinateArrayOfSquares[i]].selector
        ).style.background = 'lightblue'
        squares[coordinateArrayOfSquares[i]].isFlagged = true
      }
    })
  })
}

function incrementValuesAroundHidden() {
  for (i = 0; i < squareCount; i++) {
    if (
      squares[coordinateArrayOfSquares[i - 1]] &&
      squares[coordinateArrayOfSquares[i]].coordinates[0] !== 0 &&
      squares[coordinateArrayOfSquares[i]].isHiddenObject &&
      !squares[coordinateArrayOfSquares[i - 1]].isHiddenObject
    ) {
      squares[coordinateArrayOfSquares[i - 1]].squareValue += 1
    }

    if (
      squares[coordinateArrayOfSquares[i + 1]] &&
      squares[coordinateArrayOfSquares[i]].coordinates[0] !== 8 &&
      squares[coordinateArrayOfSquares[i]].isHiddenObject &&
      !squares[coordinateArrayOfSquares[i + 1]].isHiddenObject
    ) {
      squares[coordinateArrayOfSquares[i + 1]].squareValue += 1
    }

    if (
      squares[coordinateArrayOfSquares[i - gridWidth - 1]] &&
      squares[coordinateArrayOfSquares[i]].isHiddenObject &&
      !squares[coordinateArrayOfSquares[i - gridWidth - 1]].isHiddenObject &&
      squares[coordinateArrayOfSquares[i]].coordinates[0] !== 0
    ) {
      squares[coordinateArrayOfSquares[i - gridWidth - 1]].squareValue += 1
    }

    if (
      squares[coordinateArrayOfSquares[i - gridWidth]] &&
      squares[coordinateArrayOfSquares[i]].isHiddenObject &&
      !squares[coordinateArrayOfSquares[i - gridWidth]].isHiddenObject
    ) {
      squares[coordinateArrayOfSquares[i - gridWidth]].squareValue += 1
    }

    if (
      squares[coordinateArrayOfSquares[i - gridWidth + 1]] &&
      squares[coordinateArrayOfSquares[i]].isHiddenObject &&
      !squares[coordinateArrayOfSquares[i - gridWidth + 1]].isHiddenObject &&
      squares[coordinateArrayOfSquares[i]].coordinates[0] !== 8
    ) {
      squares[coordinateArrayOfSquares[i - gridWidth + 1]].squareValue += 1
    }

    if (
      squares[coordinateArrayOfSquares[i + gridWidth - 1]] &&
      squares[coordinateArrayOfSquares[i]].isHiddenObject &&
      !squares[coordinateArrayOfSquares[i + gridWidth - 1]].isHiddenObject &&
      squares[coordinateArrayOfSquares[i]].coordinates[0] !== 0
    ) {
      squares[coordinateArrayOfSquares[i + gridWidth - 1]].squareValue += 1
    }

    if (
      squares[coordinateArrayOfSquares[i + gridWidth]] &&
      squares[coordinateArrayOfSquares[i]].isHiddenObject &&
      !squares[coordinateArrayOfSquares[i + gridWidth]].isHiddenObject
    ) {
      squares[coordinateArrayOfSquares[i + gridWidth]].squareValue += 1
    }

    if (
      squares[coordinateArrayOfSquares[i + gridWidth + 1]] &&
      squares[coordinateArrayOfSquares[i]].isHiddenObject &&
      !squares[coordinateArrayOfSquares[i + gridWidth + 1]].isHiddenObject &&
      squares[coordinateArrayOfSquares[i]].coordinates[0] !== 8
    ) {
      squares[coordinateArrayOfSquares[i + gridWidth + 1]].squareValue += 1
    }
  }
}

function flipAdjacentEmptySquares(x, y, num) {
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
  if (num !== -404 && squares[`${x},${y}`].isFlipped === true) {
    return
  }

  if (squares[`${x},${y}`].isHiddenObject === true) {
    return
  } else {
    if (num === -404) {
      num = 0
    } else {
      num = squares[`${x},${y}`].squareValue
    }
    document.querySelector(
      squares[`${x},${y}`].selector
    ).style.backgroundColor = `gray`

    if (num >= 1 || num === -404) {
      document.querySelector(squares[`${x},${y}`].selector).innerText = `${
        squares[`${x},${y}`].squareValue
      }`
    }
    squares[`${x},${y}`].isFlipped = true
    flipCount += 1

    flipAdjacentEmptySquares(x + 1, y + 1, num)
    flipAdjacentEmptySquares(x - 1, y + 1, num)

    flipAdjacentEmptySquares(x + 1, y, num)
    flipAdjacentEmptySquares(x - 1, y, num)

    flipAdjacentEmptySquares(x, y + 1, num)
    flipAdjacentEmptySquares(x, y - 1, num)

    flipAdjacentEmptySquares(x, y + 1, num)
    flipAdjacentEmptySquares(x, y - 1, num)
  }
}

function reset() {
  window.location.reload()
}

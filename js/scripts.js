let gameSquares = document.querySelectorAll('.game-square')
let resetButton = document.querySelector('button')

let lavaDisplay = document.querySelector('#lava-display')
let gemDisplay = document.querySelector('#gem-display')

let squareCount = 81
let totalHidden = 10

//could use seededSquares instead of seededHidden?
let seededHidden = 0
let totalGems = 2
let seededGems = 0

seedHidden()
let seededSquares = document.querySelectorAll('.seeded-square')
seedGems()

gameSquares.forEach((gameSquare) => {
  gameSquare.addEventListener('click', () => {
    gameSquare.style.background = 'green'
  })
})

resetButton.addEventListener('click', reset)

//functions

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min) //The maximum is inclusive and the minimum is inclusive
}

function seedHidden() {
  while (seededHidden < totalHidden) {
    gameSquares.forEach((gameSquare) => {
      if (seededHidden < totalHidden) {
        if (getRandomIntInclusive(1, 10) === 5) {
          gameSquare.style.background = 'red'
          gameSquare.classList.add('seeded-square')
          seededHidden += 1
        }
      }
    })
  }
  lavaDisplay.innerText = `${
    seededHidden - seededGems
  } lava squares remain unmarked`
}

function seedGems() {
  while (seededGems < totalGems) {
    seededSquares.forEach((seededSquare) => {
      if (seededGems < totalGems) {
        if (getRandomIntInclusive(1, 10) === 5) {
          seededSquare.style.background = 'lightblue'
          seededGems += 1
          seededSquare.classList.remove('seeded-square')
          seededSquare.classList.add('seeded-gem')
        }
      }
    })
  }
}

//seed hidden gems

function reset() {
  gameSquares.forEach((gameSquare) => {
    gameSquare.classList.remove('seeded-square')
    gameSquare.classList.remove('seeded-gem')
    if (
      gameSquare.style.background === 'red' ||
      gameSquare.style.background === 'green'
    ) {
      gameSquare.style.background = 'gray'
    }
  })
  seededHidden = 0
  seededGems = 0
  seedHidden()
}

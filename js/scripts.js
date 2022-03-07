gameSquares = document.querySelectorAll('.game-square')

squareCount = 0
gameSquares.forEach((gameSquare) => {
  gameSquare.addEventListener('click', () => {
    gameSquare.style.background = 'red'
  })
})

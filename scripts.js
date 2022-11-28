
//game module
const gameBoard = (() =>{
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  const board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  let player2Turn

  const allCells = document.querySelectorAll('[data-cell]');
  const refreshBtn = document.getElementById('refresh-btn');
  allCells.forEach(cell => {
    cell.addEventListener('click', clickHandler, {once: true});
  })
  refreshBtn.addEventListener('click', refresh);

  function clickHandler(e) {
    const cell = e.target;
    const currentMarker = player2Turn ? interface.second.marker : interface.first.marker;
    placeMarker(cell, currentMarker);
    if(checkWinner(currentMarker)) {
      endGame();
    }
    if(checkDraw()) {
      endGame(true);
    }
    swapTurns();
  }

  function placeMarker(cell, currentMarker) {
    cell.classList.add(currentMarker);
  }

  function checkWinner(currentMarker) {
    return winningCombinations.some(combinations => {
      return combinations.every(index => {
        return allCells[index].classList.contains(currentMarker);
      })
    })
  }

  function checkDraw() {
    return board.every(index => {
      return allCells[index].classList.length === 2
    })
  }

  function swapTurns() {
    player2Turn = !player2Turn;
  }

  function endGame(draw) {
    const winnerAnnouncer = document.getElementById('winner-message');
    const gameResult = document.getElementById('game-result');
    if (draw) {
      winnerAnnouncer.textContent = `It's a draw!`
    } else if(player2Turn) {
      winnerAnnouncer.textContent = `${interface.second.name} wins!`
    } else {
      winnerAnnouncer.textContent = `${interface.first.name} wins!`
    }
    gameResult.style.display = "flex";
  }

  function refresh() {
    location.reload();
  }
})()


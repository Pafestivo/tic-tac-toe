//game board module
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
  let circleTurn

  const allCells = document.querySelectorAll('[data-cell]');
  const refreshBtn = document.getElementById('refresh-btn');
  allCells.forEach(cell => {
    cell.addEventListener('click', clickHandler, {once: true});
  })
  refreshBtn.addEventListener('click', refresh);

  function clickHandler(e) {
    const cell = e.target;
    const currentMarker = circleTurn ? "o" : "x";
    placeMarker(cell, currentMarker);
    if(checkWinner(currentMarker)) {
      endGame();
    }
    //check for draw
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

  function swapTurns() {
    circleTurn = !circleTurn;
  }

  function endGame(draw) {
    const winnerAnnouncer = document.getElementById('winner-message');
    const gameResult = document.getElementById('game-result');
    if (draw) {

    } else if(circleTurn) {
      winnerAnnouncer.textContent = `X is the winner!`
    } else {
      winnerAnnouncer.textContent = `O is the winner!`
    }
    gameResult.style.display = "flex";
  }

  function refresh() {
    location.reload();
  }
})()

//players factory:
function setPlayer(name, marker) {
  return {name, marker};
}
const playerOne = setPlayer('player1', 'X');
const playerTwo = setPlayer('player2', 'O');

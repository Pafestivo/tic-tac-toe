//game board module
const gameBoard = (() =>{
  let circleTurn
  const allCells = document.querySelectorAll('[data-cell]');
  allCells.forEach(cell => {
    cell.addEventListener('click', clickHandler, {once: true});
  })

  function clickHandler(e) {
    const cell = e.target;
    const currentMarker = circleTurn ? "o" : "x";
    placeMarker(cell, currentMarker);
    //check for winner
    //check for draw
    swapTurns();
  }

  function placeMarker(cell, currentMarker) {
    cell.classList.add(currentMarker);
  }

  function swapTurns() {
    circleTurn = !circleTurn;
  }
})()

//players factory:
function setPlayer(name, marker) {
  return {name, marker};
}
const playerOne = setPlayer('player1', 'X');
const playerTwo = setPlayer('player2', 'O');

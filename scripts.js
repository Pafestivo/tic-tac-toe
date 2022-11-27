//game board module
const gameBoard = (() =>{
  const allCells = document.querySelectorAll('[data-cell]');
  allCells.forEach(cell => {
    cell.addEventListener('click', clickHandler, {once: true});
  })

  function clickHandler() {
    console.log('clicked');
  }
})()

//players factory:
function setPlayer(name, sign) {
  return {name, sign};
}
const playerOne = setPlayer('player1', 'X');
const playerTwo = setPlayer('player2', 'O');

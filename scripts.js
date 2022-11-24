//game board module
const gameBoard = (() =>{

})

//players factory:
function setPlayer(name, sign) {
  return {name, sign};
}
const playerOne = setPlayer('player1', 'X');
const playerTwo = setPlayer('player2', 'O');

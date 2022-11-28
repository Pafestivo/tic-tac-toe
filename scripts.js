//interface module:
const interface = (() => {
  const players = {};

  const startBtn = document.getElementById('start-game');
  const overlay = document.getElementById('interface-overlay');
  const oSign = document.getElementById('o');
  const isPlayer1 = document.getElementById('is-player1');
  const isPlayer2 = document.getElementById('is-player2');
  
  startBtn.addEventListener('click', startGame);
  
  function startGame() {
    CreatePlayers();
    overlay.style.display = 'none';
  }

  function CreatePlayers() {
    const sign1 = oSign.checked ? "o" : "x";
    const name1 = isPlayer1.value === 'player' ? "Player1" : "Bot1";
    const sign2 = !oSign.checked ? "o" : "x";
    const name2 = isPlayer2.value === 'player' ? "Player2" : "Bot2";
    players.first = setPlayer(name1, sign1);
    players.second = setPlayer(name2, sign2);
  }

  function setPlayer(name, marker) {
    return {name, marker};
  }
  return players;
})()

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
    if(checkDraw()) {
      endGame(true);
    }
    swapTurns();
  }

  function placeMarker(cell, currentMarker) {
    cell.classList.add(currentMarker);
    console.log(interface)
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
    circleTurn = !circleTurn;
  }

  function endGame(draw) {
    const winnerAnnouncer = document.getElementById('winner-message');
    const gameResult = document.getElementById('game-result');
    if (draw) {
      winnerAnnouncer.textContent = `It's a draw!`
    } else if(circleTurn) {
      winnerAnnouncer.textContent = `O is the winner!`
    } else {
      winnerAnnouncer.textContent = `X is the winner!`
    }
    gameResult.style.display = "flex";
  }

  function refresh() {
    location.reload();
  }
})()


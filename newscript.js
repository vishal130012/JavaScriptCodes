'use strick';

const playerOne = document.querySelector('.player--0');
const playerTwo = document.querySelector('.player--1');
const rollDice = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');
const dice = document.querySelector('.dice');
const playerOneCurrentScore = document.querySelector('#current--0');
const playerTwoCurrentScore = document.querySelector('#current--1');
const playerOneTotalScore = document.querySelector('#score--0');
const playerTwoTotalScore = document.querySelector('#score--1');
const modalMessage = document.querySelector('.message-victory');
const images = [
  'http://127.0.0.1:5500/dice-1.png',
  'http://127.0.0.1:5500/dice-2.png',
  'http://127.0.0.1:5500/dice-3.png',
  'http://127.0.0.1:5500/dice-4.png',
  'http://127.0.0.1:5500/dice-5.png',
  'http://127.0.0.1:5500/dice-6.png',
];
onLoad();
function call() {
  console.log('test');
}
// call();
function onLoad() {
  document.querySelector('.dice').classList.add('hidden');
  playerOne.classList.add('player--active');
  playerTwo.classList.remove('player--active');
  playerOneCurrentScore.textContent = 0;
  playerTwoCurrentScore.textContent = 0;
  playerOneCurrentScore.dataset.currentScore = 0;
  playerTwoCurrentScore.dataset.currentScore = 0;
  playerOneTotalScore.textContent = 0;
  playerTwoTotalScore.textContent = 0;
  playerOneTotalScore.dataset.totalScore = 0;
  playerTwoTotalScore.dataset.totalScore = 0;
  playerOne.dataset.isActive = true;
  playerTwo.dataset.isActive = false;
}

rollDice.addEventListener('click', evt => {
  dice.classList.remove('hidden');
  const currentPlayerElement = getActivePlayer();
  currentPlayerElement.classList.add('player--active');
  const diceValue = getDiceRoll(1, 6);
  generateDiceImg(diceValue);
  updateCurrentScore(currentPlayerElement, diceValue);
  getWinner();
});
0;
hold.addEventListener('click', evt => {
  const currentPlayerElement = getActivePlayer();
  updateTotalScore(currentPlayerElement);
  switchPlayer(currentPlayerElement);
  dice.classList.add('hidden');
  changeColorOnPlayerChange(playerOne, playerTwo);
});

newGame.addEventListener('click', evt => {
  onLoad();
});
function getActivePlayer() {
  const CurrentPlayerElement =
    playerOne.dataset.isActive === 'true' ? playerOne : playerTwo;
  return CurrentPlayerElement;
}
function changeColorOnPlayerChange(playerOne, playerTwo) {
  if (playerOne.dataset.isActive === 'false') {
    playerOne.classList.remove('player--active');
    playerTwo.classList.add('player--active');
  } else if (playerTwo.dataset.isActive === 'false') {
    playerTwo.classList.remove('player--active');
    playerOne.classList.add('player--active');
  }
}

function createRandonNumber(min, max) {
  return Math.trunc(Math.random() * (max + 1 - min) + min);
}
function getDiceRoll(min, max) {
  const diceValue = createRandonNumber(min, max);
  dice.dataset.currentValue = diceValue;
  return diceValue;
}
function generateDiceImg(diceValue) {
  dice.src = images[diceValue - 1];
}
function updateCurrentScore(currentPlayerElement, diceValue) {
  const currentPlayerName =
    currentPlayerElement.querySelector('.name').textContent;
  if (diceValue === 1 && currentPlayerName === 'Player 1') {
    updateScoreForOne(playerOneCurrentScore, currentPlayerElement);
    changeColorOnPlayerChange(playerOne, playerTwo);
  } else if (diceValue === 1 && currentPlayerName === 'Player 2') {
    updateScoreForOne(playerTwoCurrentScore, currentPlayerElement);
    changeColorOnPlayerChange(playerOne, playerTwo);
  } else if (diceValue !== 1 && currentPlayerName === 'Player 1') {
    UpdateCurrentScoreForNotOne(playerOneCurrentScore, diceValue);
  } else if (diceValue !== 1 && currentPlayerName === 'Player 2') {
    UpdateCurrentScoreForNotOne(playerTwoCurrentScore, diceValue);
  }
}
function updateScoreForOne(playerCurrentScore, currentPlayerElement) {
  playerCurrentScore.textContent = 0;
  playerCurrentScore.dataset.currentScore = 0;
  switchPlayer(currentPlayerElement);
  changeColorOnPlayerChange(playerOne, playerTwo);
}
function UpdateCurrentScoreForNotOne(playerCurrentScore, diceValue) {
  let currentScore = Number(playerCurrentScore.dataset.currentScore);
  currentScore = currentScore + diceValue;
  playerCurrentScore.textContent = currentScore;
  playerCurrentScore.dataset.currentScore = currentScore;
}

function switchPlayer(currentPlayerElement) {
  const currentPlayerName =
    currentPlayerElement.querySelector('.name').textContent;
  currentPlayerName === 'Player 1'
    ? switchEachPlayer(currentPlayerElement, false, true)
    : switchEachPlayer(currentPlayerElement, true, false);
}
function switchEachPlayer(
  currentPlayerElement,
  playerOneIsActive,
  playerTwoIsActive
) {
  playerOne.dataset.isActive = playerOneIsActive;
  playerTwo.dataset.isActive = playerTwoIsActive;
}
function updateTotalScore() {
  const currentPlayerElement = getActivePlayer();
  const currentPlayerName =
    currentPlayerElement.querySelector('.name').textContent;
  currentPlayerName === 'Player 1'
    ? updateScoreEachPlayer(playerOneTotalScore, playerOneCurrentScore)
    : updateScoreEachPlayer(playerTwoTotalScore, playerTwoCurrentScore);
}
function updateScoreEachPlayer(playerTotalScore, playerCurrentScore) {
  const totalScore =
    Number(playerTotalScore.dataset.totalScore) +
    Number(playerCurrentScore.dataset.currentScore);
  playerTotalScore.textContent = totalScore;
  playerTotalScore.dataset.totalScore = totalScore;
  playerCurrentScore.dataset.currentScore = 0;
  playerCurrentScore.textContent = 0;
}
function getWinner() {
  const PlayerOneCurrrentTotal = getCurrentTotalScore(
    Number(playerOneCurrentScore.dataset.currentScore),
    Number(playerOneTotalScore.dataset.totalScore)
  );
  const PlayerTwoCurrrentTotal = getCurrentTotalScore(
    Number(playerTwoCurrentScore.dataset.currentScore),
    Number(playerTwoTotalScore.dataset.totalScore)
  );
  if (PlayerOneCurrrentTotal >= 15) {
    const message = generateMessage(
      'Player 1',
      PlayerOneCurrrentTotal,
      dice.dataset.currentValue
    );
    showModal(message);
    updateTotalScoreOnWinning(
      playerOneTotalScore,
      PlayerOneCurrrentTotal,
      playerOneCurrentScore
    );
  } else if (PlayerTwoCurrrentTotal >= 15) {
    const message = generateMessage(
      'Player 2',
      PlayerTwoCurrrentTotal,
      dice.dataset.currentValue
    );
    showModal(message);
    updateTotalScoreOnWinning(
      playerTwoTotalScore,
      PlayerTwoCurrrentTotal,
      playerTwoCurrentScore
    );
  }
}
function generateMessage(player, totalScorePlayer, diceValue) {
  return `<h2>Yay! ${player} is the Winner! </h2>
                <h2>Your Last Round Score = ${diceValue}</h2>
            <h2>Total Score = ${totalScorePlayer} </h2>Please Press New Game Button To Play Again!`;
}

function getCurrentTotalScore(currentScore, totalScore) {
  return currentScore + totalScore;
}
function updateTotalScoreOnWinning(winnerTotal, total, winnerCurrent) {
  winnerTotal.textContent = total;
  winnerCurrent.textContent = 0;
}

function showModal(message) {
  const modal = document.querySelector('.modal');
  const overlay = document.querySelector('.overlay');
  const btnCloseModal = document.querySelector('.close-modal');
  modalMessage.innerHTML = message;
  openModal();
  btnCloseModal.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  function openModal() {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  }

  function closeModal() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
  }
  document.addEventListener('keydown', evt => {
    if (evt.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

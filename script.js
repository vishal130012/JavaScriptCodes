// 'use strict';
// const btnNewGame = document.querySelector('.btn--new');
// const playerOneScore = document.querySelector('#score--0');
// const playerTwoScore = document.querySelector('#score--1');
// const playerOneSection = document.querySelector('.player--0');
// const playerTwoSection = document.querySelector('.player--1');
// const playerOneCurrentScore = document.querySelector('#current--0');
// const playerTwoCurrentScore = document.querySelector('#current--1');
// const playerOne = document.querySelector('#name--0');
// const playerTwo = document.querySelector('#name--1');
// const players = [
//   document.querySelector('#name--0'),
//   document.querySelector('#name--1'),
// ];
// const rollDice = document.querySelector('.btn--roll');
// const dice = document.querySelector('.dice');
// const hold = document.querySelector('.btn--hold');
// const newGame = document.querySelector('.btn--new');
// const modalMessage = document.querySelector('.message-victory');
// const images = [
//   'http://127.0.0.1:5500/dice-1.png',
//   'http://127.0.0.1:5500/dice-2.png',
//   'http://127.0.0.1:5500/dice-3.png',
//   'http://127.0.0.1:5500/dice-4.png',
//   'http://127.0.0.1:5500/dice-5.png',
//   'http://127.0.0.1:5500/dice-6.png',
// ];
// //let currentScore = 0;
// let currentScore1 = 0;
// let currentScore2 = 0;
// let totalScorePlayer1 = 0;
// let totalScorePlayer2 = 0;
// let currentPlayer;
// setDefaultOnPageLoad();

// rollDice.addEventListener('click', evt => {
//   dice.classList.remove('hidden');
//   const diceValue = getDiceRoll(1, 6);
//   generateDiceImg(diceValue);
//   const currentPlayer = getCurrentPlayer();
//   const scoreElement = getScoreElement(currentPlayer);
//   addScores(scoreElement, diceValue);
//   const message = getWinner();
//   if (message != undefined) {
//     showModal(message);
//   }
// });
// hold.addEventListener('click', evt => {
//   switchPlayer();
// });
// function getDiceRoll(min, max) {
//   const diceValue = createRandonNumber(min, max);
//   return diceValue;
// }
// function generateDiceImg(diceValue) {
//   dice.src = images[diceValue - 1];
// }
// function switchPlayer() {
//   const currentPlayer = getCurrentPlayer();
//   updateTotalScore(currentPlayer);
//   currentPlayer === 'Player 1' ? (currentScore1 = 0) : (currentScore2 = 0);
//   if (currentPlayer === 'Player 1') {
//     currentScore1 = 0;
//     playerOneSection.classList.remove('player--active');
//     playerTwoSection.classList.add('player--active');
//   } else if (currentPlayer === 'Player 2') {
//     currentScore2 = 0;
//     playerTwoSection.classList.remove('player--active');
//     playerOneSection.classList.add('player--active');
//   }
// }

// function createRandonNumber(min, max) {
//   return Math.trunc(Math.random() * (max + 1 - min) + min);
// }

// function addScores(player, diceValue) {
//   if (player.id === 'current--0') {
//     if (diceValue === 1) {
//       currentScore1 = 0;
//       player.textContent = 0;
//       switchPlayer();
//     } else {
//       currentScore1 = currentScore1 + diceValue;
//       player.textContent = currentScore1;
//     }
//   } else if (player.id === 'current--1') {
//     if (diceValue === 1) {
//       currentScore2 = 0;
//       player.textContent = 0;
//       switchPlayer();
//     } else {
//       currentScore2 = currentScore2 + diceValue;
//       player.textContent = currentScore2;
//     }
//   }
// }
// newGame.addEventListener('click', evt => {
//   setDefaultNewGame(0, 0, 0, 0);
// });

// function getCurrentPlayer() {
//   players.forEach(player => {
//     if (player.dataset.isPlaying === 'yes') {
//       currentPlayer = player.textContent;
//     }
//   });
//   return currentPlayer;
// }
// function getScoreElement(currentPlayer) {
//   const scoreElement =
//     currentPlayer === 'Player 1'
//       ? playerOneCurrentScore
//       : playerTwoCurrentScore;
//   return scoreElement;
// }

// function updateTotalScore(currentPlayer) {
//   if (currentPlayer === 'Player 1') {
//     const currentScorePlayer1 = Number(playerOneCurrentScore.textContent);
//     totalScorePlayer1 += currentScorePlayer1;
//     playerOneCurrentScore.textContent = 0;
//     playerOneScore.textContent = totalScorePlayer1;
//     setDefaultDataset('no', 'yes');
//   } else if (currentPlayer === 'Player 2') {
//     const currentScorePlayer2 = Number(playerTwoCurrentScore.textContent);
//     totalScorePlayer2 += currentScorePlayer2;
//     playerTwoCurrentScore.textContent = 0;
//     playerTwoScore.textContent = totalScorePlayer2;
//     setDefaultDataset('yes', 'no');
//   }
// }

// function setDefaultDataset(value1, value2) {
//   playerOne.dataset.isPlaying = value1;

//   playerTwo.dataset.isPlaying = value2;
// }
// function setDefaultOnPageLoad() {
//   dice.classList.add('hidden');
//   playerOneCurrentScore.textContent = 0;
//   playerTwoCurrentScore.textContent = 0;
//   playerOneScore.textContent = 0;
//   playerTwoScore.textContent = 0;
//   setDefaultDataset('yes', 'no');
// }

// function getWinner() {
//   if (currentScore1 + totalScorePlayer1 >= 15) {
//     return generateMessage('Player 1', currentScore1, totalScorePlayer1);
//   } else if (currentScore2 + totalScorePlayer2 >= 15) {
//     return generateMessage('Player 2', currentScore2, totalScorePlayer2);
//   }
// }
// function generateMessage(player, currentScore, totalScorePlayer) {
//   return `<h2>Yay! ${player} is the Winner! </h2>
//             <h2>Total Score = ${
//               currentScore + totalScorePlayer
//             } </h2>Please Press New Game Button To Play Again!`;
// }
// function showModal(message) {
//   const modal = document.querySelector('.modal');
//   const overlay = document.querySelector('.overlay');
//   const btnCloseModal = document.querySelector('.close-modal');
//   modalMessage.innerHTML = message;
//   openModal();
//   btnCloseModal.addEventListener('click', closeModal);
//   overlay.addEventListener('click', closeModal);

//   function openModal() {
//     modal.classList.remove('hidden');
//     overlay.classList.remove('hidden');
//   }

//   function closeModal() {
//     modal.classList.add('hidden');
//     overlay.classList.add('hidden');
//   }
//   document.addEventListener('keydown', evt => {
//     if (evt.key === 'Escape' && !modal.classList.contains('hidden')) {
//       closeModal();
//     }
//   });
// }
// function setDefaultNewGame(cs1, cs2, ts1, ts2) {
//   currentScore1 = cs1;
//   currentScore2 = cs2;
//   totalScorePlayer1 = ts1;
//   totalScorePlayer2 = ts2;
//   playerOneScore.textContent = 0;
//   playerTwoScore.textContent = 0;
//   playerOneCurrentScore.textContent = 0;
//   playerTwoCurrentScore.textContent = 0;
//   dice.classList.add('hidden');
//   setDefaultDataset('yes', 'no');
//   playerOneSection.classList.add('player--active');
//   playerTwoSection.classList.remove('player--active');
// }

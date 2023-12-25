'use strict';

//Starting Elements
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

const score1Ele = document.getElementById('score--0');
const score2Ele = document.getElementById('score--1');
const diceImage = document.querySelector('.dice');
const newGame = document.querySelector('.btn--new');
const diceRoll = document.querySelector('.btn--roll');
const diceHold = document.querySelector('.btn--hold');
const player1Score = document.getElementById('current--0');
const player0Score = document.getElementById('current--1');

let scores, currentScore, activePlayer, playing;

//Starting Conditions
//...Which player is active...rigth now its player 1

const init = function () {
  playing = true;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  score1Ele.textContent = '0';
  score2Ele.textContent = '0';
  player0Score.textContent = 0;
  player1Score.textContent = 0;

  diceImage.classList.add('hidden');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');

  player1.classList.add('player--active');
  player2.classList.remove('player--active');
};
init();

const togglePlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};

//Dice implementation
diceRoll.addEventListener('click', function () {
  if (playing) {
    //generate random dice roll
    const dice = Math.floor(Math.random() * 6) + 1;
    console.log(dice);
    //display it
    diceImage.classList.remove('hidden');
    diceImage.src = `dice-${dice}.png`;

    //if number is 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      togglePlayer();
    }
  }
});

diceHold.addEventListener('click', function () {
  if (playing) {
    //1. Current score to the total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if score is greater than 100
    if (scores[activePlayer] >= 20) {
      playing = false;
      diceImage.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //3. switch player
      togglePlayer();
    }
  }
});

newGame.addEventListener('click', init);

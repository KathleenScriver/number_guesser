var randomNumber;
const guessSubmit = document.querySelector('.guessSubmit');
const mostRecentGuess = document.querySelector('.mostRecentGuess');
const correctGuess = document.querySelector('.correctGuess');
const guessField = document.querySelector('.userGuess');
const highLow = document.querySelector('.highLow');
const gameReset = document.querySelector('.gameReset');
const instructions = document.getElementById('instructions');
const gameState = document.querySelector('.gameState');
const rangeMinField = document.querySelector('.rangeMin');
const rangeMaxField = document.querySelector('.rangeMax');
const rangeSet = document.querySelector('.rangeSet');
var gameRound = 1;

document.onload = gameStart();

function gameStart() {
  if (gameRound === 1) {
    instructions.style.display = 'block';
    rangeMinField.focus();
  } else {
    setNumber(event);
    guessField.focus();
  }
  guessField.disabled = false;
  guessSubmit.disabled = false;
  let round = document.querySelector('.round');
  round.textContent = "Round: " + gameRound;
}

rangeSet.addEventListener('click', setNumber);
var rangeMin;
var rangeMax;

function setNumber(event) {
  event.preventDefault();
  instructions.style.display = 'none';
  if (gameRound === 1) {
    rangeMin = Number(rangeMinField.value);
    rangeMax = Number(rangeMaxField.value);
  } else {
    rangeMin < 10 ? rangeMin = 0 : rangeMin - 10;
    rangeMax = rangeMax + 10;
  }
  let guessRange = rangeMax - rangeMin;
  randomNumber = Math.floor((Math.random() * (guessRange + 1)) + rangeMin);
  let gameRange = document.querySelector('.gameRange')
  gameRange.textContent = "The Secret Number is between " + rangeMin + " and " + rangeMax
  guessField.focus()
};

guessSubmit.addEventListener('click', guessCheck);
gameReset.addEventListener('click', restartGame);

function guessCheck(event) {
  event.preventDefault();
  let userGuess = Number(guessField.value);

  if (validateGuess(userGuess)) {
    mostRecentGuess.textContent = 'Your Most Recent Guess: ' + userGuess;
    if (userGuess === randomNumber) {
      highLow.textContent = '';
      correctGuess.textContent = "BOOM!";
      guessSubmit.disabled = true;
      guessField.disabled = true;
    } else if (userGuess > randomNumber) {
      highLow.textContent = "That is too high!";
    } else if (userGuess < randomNumber) {
      highLow.textContent = "That is too low!";
    }
    guessField.value = '';
    guessField.focus();
  };
};

function validateGuess(guess) {
  let guessError = document.querySelector('.error');
  guessError.textContent = '';
  if (isNaN(guess)) {
    guessError.textContent = "You need to guess a numberical number.";
    return false;
  } else if (guess < rangeMin || guess > rangeMax) {
    guessError.textContent = 'Your guess should be between ' + rangeMin + ' and ' + rangeMax;
    return false;
  } else {
    return true;
  }
};

function restartGame() {
  gameReset.disabled = true;
  let messages = document.querySelectorAll('.guessState p');
  for (i = 0; i < messages.length; i++) {
    messages[i].textContent = '';
  };
  guessField.value = '';
  gameRound++;
  gameStart();
};

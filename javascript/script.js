var randomNumber;
const guessSubmit = document.querySelector('.guessSubmit');
const mostRecentGuess = document.querySelector('.mostRecentGuess');
const correctGuess = document.querySelector('.correctGuess');
const guessField = document.querySelector('.userGuess');
const highLow = document.querySelector('.highLow');
const min = 1;
const max = 100;
const gameReset = document.querySelector('.gameReset');

document.onload = gameStart();

function gameStart() {
  setNumber();
  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.focus();
}

function setNumber() {
  randomNumber = Math.floor((Math.random() * 100) + 1);
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
  } else if (guess < min || guess > max) {
    guessError.textContent = 'Your guess should be between ' + min + ' and ' + max;
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
  gameStart();
};

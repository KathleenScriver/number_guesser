let randomNumber = Math.floor((Math.random() * 100) + 1);
const guessSubmit = document.querySelector('.guessSubmit');
const mostRecentGuess = document.querySelector('.mostRecentGuess');
const correctGuess = document.querySelector('.correctGuess');
const guessField = document.querySelector('.userGuess');
const highLow = document.querySelector('.highLow');


guessField.focus();

guessSubmit.addEventListener('click', guessCheck);

function guessCheck(event) {
  event.preventDefault();
  let userGuess = Number(guessField.value);
  mostRecentGuess.textContent = 'Your Most Recent Guess: ' + userGuess;

  if (userGuess === randomNumber) {
    correctGuess.textContent = "BOOM!";
    guessSubmit.disabled = true;
    guessField.disabled = true;
    resetGame();
  } else if (userGuess > randomNumber) {
    highLow.textContent = "That is too high!";
  } else if (userGuess < randomNumber) {
    highLow.textContent = "That is too low!";
  }

  guessField.value = '';
  guessField.focus();
};

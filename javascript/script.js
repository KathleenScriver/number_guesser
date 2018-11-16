let randomNumber = Math.floor((Math.random() * 100) + 1);
const guessSubmit = document.querySelector('.guessSubmit');
const mostRecentGuess = document.querySelector('.mostRecentGuess');
const correctGuess = document.querySelector('.correctGuess');
const userGuess = document.querySelector('.userGuess');
const highLow = document.querySelector('.highLow');

userGuess.focus();

guessSubmit.addEventListener('click', guessCheck);

function guessCheck() {
  mostRecentGuess.textContent = 'Your Most Recent Guess: ' + userGuess.value;
  if (Number(userGuess.value) === randomNumber) {
    correctGuess.textContent = "BOOM!";
    guessSubmit.disabled = true;
    userGuess.disabled = true;
    resetGame();
  } else if (Number(userGuess.value) > randomNumber) {
    highLow.textContent = "That is too high!";
    userGuess.focus();
  } else if ((Number(userGuess.value) < randomNumber)) {
    highlow.textContent = "That is too low!";
    userGuess.focus();
  }
}

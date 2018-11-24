// All comments refer to the line below them

// declaring variable which will be used throughout program. Used var since the
// value will be changing and so the variable will be available for scope of
// program
var randomNumber;
// these lines are all setting up const variables to be used throughout the
//program. Used const since these values will not be changing, they are refering
// to specific html elements that won't change
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
// used var for gameRound since this variable will be updated after each round
// of play and needs to be accessible throughout app
var gameRound = 1;
// this initiates the gameStart function upon the document successfully loading
document.onload = gameStart();
// declares the function gameStart
function gameStart() {
  // if the gameRound is round 1, then do this block
  if (gameRound === 1) {
    // show the instructions and form inputs to allow user to set the number range
    instructions.style.display = 'block';
    // set the cursor into the rangeMin field so user knows that's where they
    // should be.
    rangeMinField.focus();
  // if gameRound is anything other than 1, do this block.
  } else {
    // proceed to the setNumber function since we will do this automatically for
    // all future rounds
    setNumber(event);
    // put the cursor in the guessField input so the user can easily guess
    // a number.
    guessField.focus();
  }
  // enable the guessField and Submit buttons since we are allowing user to guess now
  guessField.disabled = false;
  guessSubmit.disabled = false;
  // sets up variable for this function to set the round paragraph. Used let here
  // since we only need this variable for this section, not the scope of the entire
  // program
  let round = document.querySelector('.round');
  // sets the html <p> to show the Round number for the user
  round.textContent = "Round: " + gameRound;
}
// sets an event listener to the rangeSet button so when the user clicks on it
// the setNumber function will be initiated
rangeSet.addEventListener('click', setNumber);
// Next two lines declare two variables that will be changing throughout the
// program and will need to be used in multiple functions. This is why I used
// var as opposed to let, so their scope will be more program wide.
var rangeMin;
var rangeMax;
// declares the setNumber function, passes an event to use for the preventDefault
// function so the page will not refresh when the Set Range button is clicked
function setNumber(event) {
  // stops normal action for the event, in this case, the event is the button
  // being clicked and the default action would be to reload the page.
  event.preventDefault();
  instructions.style.display = 'none';
  if (gameRound === 1) {
    rangeMin = Number(rangeMinField.value);
    rangeMax = Number(rangeMaxField.value);
  } else {
    rangeMin < 10 ? rangeMin = 0 : rangeMin -= 10;
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
    mostRecentGuess.textContent = userGuess;
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

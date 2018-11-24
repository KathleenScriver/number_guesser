// jquery file to help with input validation and disabling of buttons/fields
// when the document is ready loading, this function will initiate
$(document).ready(function() {
  // once a user inputs something into the userGuess field, this function will run
  $('.userGuess').on("input", function() {
    // enables the Clear Guess button since the user has input something in box
    $('.clearGuess').prop('disabled', false);
    // enables the game Reset button since as soon as the user types something,
    // the game has started so there is something to reset if desired
    $('.gameReset').prop('disabled', false);
    // checks userGuess and if it's blank, run the disableReset function
    if ( $('.userGuess').val() === '') {
      disableReset;
    };
  });
// when user clicks on Submit Guess button, the disableReset function is run
  $('.guessSubmit').on('click', disableReset);
// when user clicks on Clear Guess, this function will run
  $('.clearGuess').on('click', function(event) {
    // run disableReset function
    disableReset;
    // run clearContents function
    clearContents;
  });
// declares disableReset function
  function disableReset() {
    // changes the property of the Clear Guess button to disabled.
    $('.clearGuess').prop('disabled', true);
  };
// declares the clearContents function
  function clearContents() {
    // sets the userGuess html text to an empty string.
    $('.userGuess').html('');
  }
});

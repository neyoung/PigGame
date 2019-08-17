/*
PIG GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var activePlayer, roundScore, globalScore, isGamePlaying;
init();

document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.btn-roll').addEventListener('click', function() {
  if(isGamePlaying) {
    // 1. Generate random number from 1 to 6 (both inclusive)
    var dice = Math.floor(Math.random() * 6) + 1;

    // 2. Displays the random number dice each time 'ROLL DICE' button is clicked
    var diceDOM = document.querySelector('.dice');

    // 3. Updates the CURRENT score and active status of the current player when
    //    dice rolled is not 1
    if(dice !== 1) {
      diceDOM.style.display = '';
      diceDOM.src = 'dice-' + dice + '.png';
      roundScore += dice;
      document.getElementById('current-' + activePlayer).textContent = roundScore;
    } else {
      // Next player's turn
      nextPlayer();
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if(isGamePlaying) {
    // 1. Updates the CURRENT player's global score
    globalScore[activePlayer] += roundScore;
    document.getElementById('score-' + activePlayer).textContent = globalScore[activePlayer];
    roundScore = 0;
    // 2. Checks to see if any player has won
    if(globalScore[activePlayer] >= 100) {
      isGamePlaying = false;
      document.querySelector('.dice').style.display = 'none';
      document.getElementById('name-' + activePlayer).textContent = 'WINNER!';
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    } else {
      // 3. Switches the active player to the next player and resumes game
      nextPlayer();
    }
  }
});

function init() {
  activePlayer = 0;
  roundScore = 0;
  globalScore = [0, 0];
  isGamePlaying = true;

  document.querySelector('.dice').style.display = 'none';

  for(var i = 0; i < globalScore.length; i++) {
    document.getElementById('name-' + i).textContent = 'Player ' + (i+1);
    document.getElementById('score-' + i).textContent = '0';
    document.getElementById('current-' + i).textContent = '0';
    document.querySelector('.player-' + i + '-panel').classList.remove('active');
  }

  document.querySelector('.player-0-panel').classList.add('active');
}

function nextPlayer() {
  document.querySelector('.dice').style.display = 'none';
  // Sets the previous player 'CURRENT' score to 0 and removes active status
  document.getElementById('current-' + activePlayer).textContent = 0;
  document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

  // Switches the active player to the next player and resumes game
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // Ternary IF-ELSE statement
  roundScore = 0;
  document.getElementById('current-' + activePlayer).textContent = roundScore;
  document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}

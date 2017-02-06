// JavaScript Document
// Tic Tac Toe Module
var ticTacToeModule = (function(){
  "use strict";
  // Public Functions
  var exports =  {};
	
	
  // Initilization	
  exports.start = function () {
	 
	//Show Start Screen
    showStartupScreen();
	  
	//Add Event Listeners
	addEventListeners();
	
  };
	
  // Tic Tac Toe Constructor
  function TicTacToe() {
	  this.currentPlayer = "X";
  }
	
  TicTacToe.prototype.switchPlayer = function () {
	  if (this.currentPlayer === "X") {
		  this.currentPlayer = "O";
	  } else {
		  this.currentPlayer = "X";
	  }
  };
	
  // Add event listeners to controls
  function addEventListeners() {
	  $("#start a.button").on("click", startGameHandler);
  }
	
  // Event Handlers
  function startGameHandler() {
	  startGame();
  }
	
  // Show the startup screen
  function showStartupScreen() {
	  // Hide the board
	  $("#board").hide();
	  var $startScreen = $('<div class="screen screen-start" id="start"><header><h1>Tic Tac Toe</h1><a href="#" class="button">Start game</a></header></div>');
	  $("#board").before($startScreen);
  }
	
	
  // Start Game	
  function startGame() {
	  $("#start").hide();
	  $("#board").show();
  }
 
  return exports;
}());

ticTacToeModule.start();

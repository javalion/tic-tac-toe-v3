// JavaScript Document
// Tic Tac Toe Module
var ticTacToeModule = (function(){
  "use strict";
	
  // Constnats (Just jusing var to maintain ES5 compatibility)
  var X_CONST = "X";
  var O_CONST = "O";
	
  // Public Functions
  var exports =  {};
  var board = ["","","","","","","","",""];
  var winningCombinations = [
	  [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
  ];
	
  // Startup
  exports.start = function () {
	 
    //Show Start Screen
    showStartupScreen();	  
	
	$("#start").on("click", "a.button", startGameHandler);
	
  };
	
  // Tic Tac Toe Constructor
  function TicTacToe() {
	  this.currentPlayer = O_CONST;
	  this.selectionCount = 0;
	  $(".box").each(function (idx){
		  $(this).attr("piece", idx);
	  });
	  this.switchPlayer();
  }
	
  TicTacToe.prototype.switchPlayer = function () {
	  $(".players").removeClass("active");
	  if (this.currentPlayer === X_CONST) {
		  this.currentPlayer = O_CONST;
		  $("#player1").addClass("active");
	  } else {
		  this.currentPlayer = X_CONST;
		  $("#player2").addClass("active");
	  }
  };
	
  // Add event listeners to controls
  TicTacToe.prototype.addEventListeners = function () {
	  
	  $(".boxes .box").on("mouseenter", { context: this}, this.enterBoxHandler);
	  $(".boxes .box").on("mouseleave", { context: this}, this.leaveBoxHandler);
	  $(".boxes .box").on("click", { context: this}, this.clickBoxHandler);
  };
	
  // Event Handlers
  function startGameHandler() {
	  startGame();
  }
	
  TicTacToe.prototype.enterBoxHandler = function (e) {
	if ($(this).hasClass("box-filled-1") || 
		$(this).hasClass("box-filled-2") ||
	    $(this).hasClass("clicked")) {
		return;
	}
	var currentClass = "box-filled-1";
	  if (e.data.context.currentPlayer === X_CONST) {
        currentClass = "box-filled-2";		  
	  }
	  
	$(this).addClass(currentClass);
  };
	
  TicTacToe.prototype.leaveBoxHandler = function (e) {
	if ($(this).hasClass("clicked")) {
		return;}
	var currentClass = "box-filled-1";
	  if (e.data.context.currentPlayer === X_CONST) {
        currentClass = "box-filled-2";		  
	  }
	$(this).removeClass(currentClass);
  };
	
  TicTacToe.prototype.clickBoxHandler = function (e) {
	if ($(this).hasClass("clicked")) {
		return;}
	var _this = e.data.context;
	_this.selectionCount++;
    var currentPlayer = _this.currentPlayer;
	$(this).addClass("clicked"); 	
    board[$(this).attr("piece")] = currentPlayer;
	if (!_this.isWinner(currentPlayer)) { 
	  _this.switchPlayer();
	} else if (_this.selectionCount === 9) {
		_this.showWinner("-");
	} else {
       _this.showWinner(currentPlayer);
	}
  };
	
  TicTacToe.prototype.showWinner = function(winner) {
	  $("#board").hide();
	  var $winScreen = $('<div class="screen screen-win" id="finish"><header><h1>Tic Tac Toe</h1><p class="message">Winner</p><a href="#" class="button">New game</a></header></div>');
	  if (winner === O_CONST) {
		  $winScreen.addClass("screen-win-one");
	  } else if ( winner === X_CONST) {
		  $winScreen.addClass("screen-win-two");
	  } else {
		  $winScreen.addClass("screen-win-tie");
		  $winScreen.find(".message").text("It's a Tie!");
	  }
	  
      $("body").append($winScreen);

  };
	
  TicTacToe.prototype.isWinner = function(cp) {
	if ( this.selectionCount >= 5 ){ 
		for (var i = 0; i < winningCombinations.length; i++) {
          var combination = winningCombinations[i];
		  if (board[combination[0]] === cp && 
			  board[combination[1]] === cp &&
			  board[combination[2]] === cp){
              return true; }
		}
	}  
    return false;
  };
	
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
	  var game = new TicTacToe();
	  game.addEventListeners();
	  $("#board").show();
  }
 
  return exports;
}());

ticTacToeModule.start();

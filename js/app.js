var ticTacToeModule = (function(){
  "use strict";

  // *********************
  // TIC TAC TOE CLASS
  // *********************
	
  // Tic Tac Toe Constructor
  function TicTacToe() {
	  this.currentPlayer = O_CONST;
	  this.player1 = $('#name1').val();
	  this.player2 = $('#name2').val();
	  this.computerOpponent = $("#computer").is(':checked');
	  this.board = ["","","","","","","","",""];
	  this.selectionCount = 0;
	  $(".box").each(function (idx){
		  $(this).attr("piece", idx);
	  });
	  this.switchPlayer();
  }
	
  // Tic Tac Toe: Switch Player - changes the active player
  TicTacToe.prototype.switchPlayer = function () {
	  $(".players").removeClass("active");
	  if (this.currentPlayer === X_CONST) {
		  this.currentPlayer = O_CONST;
		  $("#player1").addClass("active");
	  } else {
		  this.currentPlayer = X_CONST;
		  $("#player2").addClass("active");
	  }
	  
	  if (this.computerOpponent === true && this.currentPlayer === X_CONST) {
 	    this.processComputerTurn();
	  }
  };
	
  // Computer will automatically select a game piece
  TicTacToe.prototype.processComputerTurn = function () {
		  var rand = (Math.floor(Math.random() * this.board.length));
          while ($('.box[piece="' + rand + '"]').hasClass("clicked")){
		      rand = (Math.floor(Math.random() * this.board.length));
		  }
		  var piece = rand;
		  setTimeout(function() {
   		      $('.box[piece="' + piece + '"]').trigger('mouseenter');
		  },100);
		  setTimeout(function() {
			  	 $('.box[piece="' + piece + '"]').trigger('click');
			     $('.box:not(.clicked)').removeClass("box-filled-1").removeClass("box-filled-2");
		  },500);
  };
	
  // *********************
  // TIC TAC TOE EVENT HANDLERS
  // *********************
	
  // Add event listeners to controls
  TicTacToe.prototype.addEventListeners = function () {
	  $(".boxes .box").on("mouseenter", { context: this}, this.mouseEnterHandler);
	  $(".boxes .box").on("mouseleave", { context: this}, this.mouseLeaveHandler);
	  $(".boxes .box").on("click", { context: this}, this.clickBoxHandler);
  };
	
  // Remove event listeners to controls
  TicTacToe.prototype.removeEventListeners = function () {
	  
	  $(".boxes .box").off("mouseenter", this.mouseEnterHandler);
	  $(".boxes .box").off("mouseleave", this.mouseLeaveHandler);
	  $(".boxes .box").off("click",  this.clickBoxHandler);
  };
	
  // Show active player game piece if selection hasn't been chosen
  TicTacToe.prototype.mouseEnterHandler = function (e) {
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
	
  // Remove the game piece if it hasn't been chosen
  TicTacToe.prototype.mouseLeaveHandler = function () {
	console.log("In Mouse Leave Handler Piece #" + $(this).attr('piece'));	  
	if ($(this).hasClass("clicked")) {return;}
	$(this).removeClass("box-filled-1").removeClass("box-filled-2");
  };
	
  // Select the game piece and check for winner
  TicTacToe.prototype.clickBoxHandler = function (e) {
	if ($(this).hasClass("clicked")) {return;}
	var _this = e.data.context;
	_this.selectionCount++;
	$(this).addClass("clicked"); 	
    _this.board[$(this).attr("piece")] = _this.currentPlayer;
	_this.checkWinner();
  };
	
  // *********************
  // TIC TAC TOE GENERAL METHODS
  // *********************
	
  // Check for winner 
  TicTacToe.prototype.checkWinner = function(){
	if (this.isWinner(this.currentPlayer)) { 
	    this.showWinner(this.currentPlayer); 
	} else if (this.selectionCount === 9) {
		this.showWinner("-");
	} else {
		this.switchPlayer();
	}

  };
	
  // Show Winner
  TicTacToe.prototype.showWinner = function(winner) {
	  $("#board").hide();
	  this.removeEventListeners();
	  $('#finish').remove();
	  var $winScreen = $(WINNER_SCREEN_CONST);
	  var msg = "";
	  if (winner === O_CONST) {
		  $winScreen.addClass("screen-win-one");
		  msg = (this.player1 !== "" ? this.player1 : "O") + " Win's!";
	  } else if ( winner === X_CONST) {
		  $winScreen.addClass("screen-win-two");
		  msg = (this.player2 !== "" ? this.player2 : "X") + " Win's!";
	  } else {
		  $winScreen.addClass("screen-win-tie");
		  msg = "It's a Tie!";
	  }
	  $winScreen.find(".message").text(msg);
	  $winScreen.find("a").on("click",startGame);
      $("body").append($winScreen);

  };
	
  // Checks if player is winner	
  TicTacToe.prototype.isWinner = function(player) {
	if ( this.selectionCount >= 5 ){ 
		for (var i = 0; i < winningCombinations.length; i++) {
          var combination = winningCombinations[i];
		  if (this.board[combination[0]] === player && 
			  this.board[combination[1]] === player &&
			  this.board[combination[2]] === player){
              return true; }
		}
	}  
    return false;
  };
	
// Constants (Just jusing var to maintain ES5 compatibility)
  var X_CONST = "X";
  var O_CONST = "O";
  var WINNER_SCREEN_CONST = '<div class="screen screen-win" id="finish"><header><h1>Tic Tac Toe</h1><p class="message">Winner</p><a href="#" class="button">New game</a></header></div>';
  var START_SCREEN_CONST = '<div class="screen screen-start" id="start"><form name="players" id="players"><div><label for="name1">Player 1:</label><input type="text" id="name1" name="name1" ></div><div><label for="name2">Player 2:</label><input type="text" id="name2" name="name2" > <input type="checkbox" name="computer" id="computer" > <label for="computer"> Computer </label></div></form><header><h1>Tic Tac Toe</h1><a href="#" class="button">Start game</a></header></div>';
	
  // Public Functions
  var exports =  {};
  // Define The Winning Combinations
  var winningCombinations = [
	  [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
  ];
	
  // Startup
  exports.start = function () {
    //Show Start Screen
    showStartupScreen();	  
	$("#start").on("click", "a.button", startGameHandler);
  };	
	
  // *********************
  // GENERAL HANDLERS
  // *********************
	
  // Computer Checkbox Handler
  var computerCheckboxHandler = function() {
	if ($("#computer").is(':checked')) {
		$('#name2').val('Computer').attr('disabled',true);
	} else {
		$('#name2').val('').attr('disabled',false);
	}
  };
	
  // Start Game Handler
  var startGameHandler = function() {
	  $('#player1').append('<p>' + $("#name1").val() + '</p>');
	  $('#player2').append('<p>' + $("#name2").val() + '</p>');
	  startGame();
  };
	
  // Start Game	
  function startGame() {
	  $("#start").hide();
	  $("#finish").hide();
	  $("li.box").removeClass("box-filled-1").removeClass("box-filled-2").removeClass("clicked");
	  var game = new TicTacToe();
	  game.addEventListeners();
	  $("#board").show();
  }
	
	  // Show the startup screen
  function showStartupScreen() {
	  // Hide the board
	  $("#board").hide();
	  var $startScreen = $(START_SCREEN_CONST);
	  $startScreen.find("#computer").on('change', computerCheckboxHandler);
	  $("#board").before($startScreen);
	  $("#name1").focus();
  }
 
  return exports;
}());

ticTacToeModule.start();

// JavaScript Document
// Tic Tac Toe Module
var ticTacToeModule = (function(){
  "use strict";
	
  // Constnats (Just jusing var to maintain ES5 compatibility)
  var X_CONST = "X";
  var O_CONST = "O";
	
  // Public Functions
  var exports =  {};

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
	  this.computerOpponent = $("#computer").is(':checked');
	  this.board = ["","","","","","","","",""];
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
	  
	  if (this.computerOpponent === true && this.currentPlayer === X_CONST) {
		  var rand = (Math.floor(Math.random() * this.board.length));
          while ($('.box[piece="' + rand + '"]').hasClass("clicked"))
		  {
		      rand = (Math.floor(Math.random() * this.board.length));
		  }
          

		  var piece = rand;
		  console.log("Identified piece#" + piece);
		  setTimeout(function() {
			  console.log("Triggering mouseenter for piece #" + piece);
   		      $('.box[piece="' + piece + '"]').trigger('mouseenter');
		  },100);
		  setTimeout(function() {
			   console.log("Triggering click for piece #" + piece);
			  		  $('.box[piece="' + piece + '"]').trigger('click');
			     $('.box:not(.clicked)').removeClass("box-filled-1").removeClass("box-filled-2");
		  },500);

	  }
  };
	
  // Add event listeners to controls
  TicTacToe.prototype.addEventListeners = function () {
	  
	  $(".boxes .box").on("mouseenter", { context: this}, this.enterBoxHandler);
	  $(".boxes .box").on("mouseleave", { context: this}, this.leaveBoxHandler);
	  $(".boxes .box").on("click", { context: this}, this.clickBoxHandler);
  };
	
  // Remove event listeners to controls
  TicTacToe.prototype.removeEventListeners = function () {
	  
	  $(".boxes .box").off("mouseenter", this.enterBoxHandler);
	  $(".boxes .box").off("mouseleave", this.leaveBoxHandler);
	  $(".boxes .box").off("click",  this.clickBoxHandler);
  };
	
	
  TicTacToe.prototype.enterBoxHandler = function (e) {
	console.log("In Mouse Enter Handler Piece #" + $(this).attr('piece'));
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
	
  TicTacToe.prototype.leaveBoxHandler = function () {
	console.log("In Mouse Leave Handler Piece #" + $(this).attr('piece'));	  
	if ($(this).hasClass("clicked")) {return;}
	$(this).removeClass("box-filled-1").removeClass("box-filled-2");
  };
	
  TicTacToe.prototype.clickBoxHandler = function (e) {
	console.log("In Click Handler");
	if ($(this).hasClass("clicked")) {
		return;}
	var _this = e.data.context;
	_this.selectionCount++;
    var currentPlayer = _this.currentPlayer;
	  console.log("Adding clicked to piece #" + $(this).attr("piece"));
	$(this).addClass("clicked"); 	
    _this.board[$(this).attr("piece")] = currentPlayer;
	if (_this.isWinner(currentPlayer)) { 
	    _this.showWinner(currentPlayer); 
	} else if (_this.selectionCount === 9) {
		_this.showWinner("-");
	} else {
		_this.switchPlayer();
	}
  };
	
  TicTacToe.prototype.showWinner = function(winner) {
	  $("#board").hide();
	  this.removeEventListeners();
	  $('#finish').remove();
	  var $winScreen = $('<div class="screen screen-win" id="finish"><header><h1>Tic Tac Toe</h1><p class="message">Winner</p><a href="#" class="button">New game</a></header></div>');
	  if (winner === O_CONST) {
		  $winScreen.addClass("screen-win-one");
	  } else if ( winner === X_CONST) {
		  $winScreen.addClass("screen-win-two");
	  } else {
		  $winScreen.addClass("screen-win-tie");
		  $winScreen.find(".message").text("It's a Tie!");
	  }
	  $winScreen.find("a").on("click",startGame);
      $("body").append($winScreen);

  };
	
  TicTacToe.prototype.isWinner = function(cp) {
	if ( this.selectionCount >= 5 ){ 
		for (var i = 0; i < winningCombinations.length; i++) {
          var combination = winningCombinations[i];
		  if (this.board[combination[0]] === cp && 
			  this.board[combination[1]] === cp &&
			  this.board[combination[2]] === cp){
              return true; }
		}
	}  
    return false;
  };
	
  // Show the startup screen
  function showStartupScreen() {
	  // Hide the board
	  $("#board").hide();
	  var $startScreen = $('<div class="screen screen-start" id="start"><form name="players" id="players"><div><label for="name1">Player 1:</label><input type="text" id="name1" name="name1" ></div><div><label for="name2">Player 2:</label><input type="text" id="name2" name="name2" > <input type="checkbox" name="computer" id="computer" > <label for="computer"> Computer </label></div></form><header><h1>Tic Tac Toe</h1><a href="#" class="button">Start game</a></header></div>');
	  $startScreen.find("#computer").on('change', computerCheckboxHandler);
	  $("#board").before($startScreen);
	  $("#name1").focus();
  }
	
  var computerCheckboxHandler = function() {
	if ($("#computer").is(':checked')) {
		$('#name2').val('Computer').attr('disabled',true);
	} else {
		$('#name2').val('').attr('disabled',false);
	}
  };
	
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
 
  return exports;
}());

ticTacToeModule.start();

(function() {
  var alpha, canvas, clearCanvas, clicked, count, ctx, draw, drawAlphabet, drawHiddenWord, drawLetters, drawLives, drawMessage, fillColor, guessed, lineStart, lives, livesContainer, message, messageColor, messageContainer, myWord, step, textColor, wordList,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  canvas = document.getElementById('gameCanvas');

  ctx = canvas.getContext("2d");

  ctx.font = "30px Arial";

  wordList = ["apple", "pear", "pineapple", "orange", "apricot", "peach", "raspberry", "strawberry"];

  alpha = "abcdefghijklmnopqrstuvwxyz";

  myWord = wordList[Math.floor(Math.random() * wordList.length)];

  guessed = [];

  clicked = [];

  lives = 7;

  message = "Guess word";

  lineStart = 50;

  step = 25;

  textColor = "black";

  fillColor = "silver";

  messageColor = "#49ade9";

  messageContainer = document.getElementById("message");

  livesContainer = document.getElementById("lives");

  drawAlphabet = function() {
    var j, len, letter, letterContainer, results, span;
    letterContainer = document.getElementById("lettersContainer");
    results = [];
    for (j = 0, len = alpha.length; j < len; j++) {
      letter = alpha[j];
      span = document.createElement("span");
      span.innerHTML = letter;
      span.classList.add("letter");
      span.id = letter;
      results.push(letterContainer.appendChild(span));
    }
    return results;
  };

  drawHiddenWord = function() {
    var i, j, ref, results;
    results = [];
    for (i = j = 1, ref = myWord.length; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
      ctx.moveTo(lineStart * i, 100);
      ctx.lineTo(lineStart * i + 20, 100);
      results.push(ctx.stroke());
    }
    return results;
  };

  drawLetters = function() {
    var copyWord, i, j, ref, ref1, results;
    copyWord = myWord;
    results = [];
    for (i = j = 1, ref = myWord.length + 1; 1 <= ref ? j < ref : j > ref; i = 1 <= ref ? ++j : --j) {
      if (ref1 = myWord[i - 1], indexOf.call(guessed, ref1) >= 0) {
        ctx.fillStyle = textColor;
        ctx.fillText(myWord[i - 1], step * 2 * (copyWord.indexOf(copyWord[i - 1]) + 1), 85);
        results.push(copyWord = copyWord.replace(myWord[i - 1], "0"));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  drawMessage = function() {
    messageContainer.innerHTML = message;
    return messageContainer.style.color = messageColor;
  };

  drawLives = function() {
    livesContainer.innerHTML = lives;
    return livesContainer.style.color = messageColor;
  };

  draw = function() {
    console.log("Draw");
    drawHiddenWord();
    drawLetters();
    drawMessage();
    return drawLives();
  };

  clearCanvas = function() {
    console.log("Clear");
    return ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  count = function(string, char) {
    var re;
    re = new RegExp(char, "gi");
    return string.match(re).length;
  };

  document.addEventListener("click", function(e) {
    var clickedLetter, dummy_r, j, ref;
    if (e.target.classList.contains("letter") && message !== "You win" && message !== "You lose") {
      clickedLetter = e.target.id;
      if (!(indexOf.call(clicked, clickedLetter) >= 0) && !(indexOf.call(myWord, clickedLetter) >= 0)) {
        lives -= 1;
        if (lives === 0) {
          messageColor = "#dc4949";
          message = "You lose";
        }
      } else if (!(indexOf.call(clicked, clickedLetter) >= 0) && (indexOf.call(myWord, clickedLetter) >= 0)) {
        for (dummy_r = j = 0, ref = count(myWord, clickedLetter); 0 <= ref ? j < ref : j > ref; dummy_r = 0 <= ref ? ++j : --j) {
          guessed.push(clickedLetter);
          if (guessed.length === myWord.length) {
            messageColor = "#2ecc71";
            message = "You win";
          }
        }
      }
      clicked.push(clickedLetter);
      e.target.classList.add("disabled");
      return draw();
    } else if (e.target.id = "playAgain") {
      return clearCanvas();
    }
  }, false);

  window.onload = function() {
    drawAlphabet();
    return draw();
  };

}).call(this);

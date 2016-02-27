(function() {
  var alpha, canvas, clearCanvas, clicked, count, ctx, draw, drawAlphabet, drawHangman, drawHiddenWord, drawLetters, drawLives, drawMessage, fillColor, guessed, initialState, lineStart, lives, livesContainer, message, messageColor, messageContainer, myWord, step, textColor, wordList,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  canvas = document.getElementById('gameCanvas');

  ctx = canvas.getContext("2d");

  ctx.font = "30px Arial";

  wordList = ["apple", "pear", "pineapple", "go"];

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

  drawHangman = function(counter) {
    if (counter === 7) {
      ctx.beginPath();
      ctx.moveTo(595, 0);
      ctx.lineTo(595, canvas.height);
      ctx.lineWidth = 10;
      ctx.strokeStyle = "black";
      ctx.stroke();
      ctx.moveTo(530, canvas.height - 5);
      ctx.lineTo(595, canvas.height - 5);
      ctx.stroke();
      ctx.moveTo(500, 5);
      ctx.lineTo(595, 5);
      ctx.stroke();
      ctx.moveTo(500, 0);
      ctx.lineTo(500, 20);
      ctx.stroke();
      ctx.moveTo(565, 0);
      ctx.lineTo(595, 30);
      ctx.lineWidth = 5;
      return ctx.stroke();
    } else if (counter === 6) {
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.fillStyle = "black";
      ctx.arc(500, 80, 30, 0, Math.PI * 2, true);
      return ctx.stroke();
    } else if (counter === 5) {
      ctx.beginPath();
      ctx.moveTo(500, 110);
      ctx.lineTo(500, 180);
      return ctx.stroke();
    } else if (counter === 4) {
      ctx.beginPath();
      ctx.moveTo(500, 110);
      ctx.lineTo(450, 160);
      return ctx.stroke();
    } else if (counter === 3) {
      ctx.beginPath();
      ctx.moveTo(500, 110);
      ctx.lineTo(550, 160);
      return ctx.stroke();
    } else if (counter === 2) {
      ctx.beginPath();
      ctx.strokeStyle = "black";
      ctx.moveTo(500, 180);
      ctx.lineTo(450, 280);
      return ctx.stroke();
    } else if (counter === 1) {
      ctx.beginPath();
      ctx.moveTo(500, 180);
      ctx.lineTo(550, 280);
      return ctx.stroke();
    } else if (counter === 0) {
      ctx.beginPath();
      ctx.strokeStyle = "#dc4949";
      ctx.lineWidth = 4;
      ctx.moveTo(500, 20);
      ctx.lineTo(500, 50);
      return ctx.stroke();
    }
  };

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
    var i, j, ref;
    ctx.beginPath();
    for (i = j = 1, ref = myWord.length; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
      ctx.moveTo(lineStart * i, 100);
      ctx.lineTo(lineStart * i + 20, 100);
      ctx.stroke();
    }
    return ctx.closePath();
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
    drawLetters();
    drawMessage();
    return drawLives();
  };

  clearCanvas = function() {
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
        drawHangman(lives);
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
    } else if (e.target.classList.contains("play-button")) {
      return initialState();
    }
  }, false);

  initialState = function() {
    var disabledLetters, j, len, letter;
    clearCanvas();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    myWord = wordList[Math.floor(Math.random() * wordList.length)];
    guessed = [];
    clicked = [];
    lives = 7;
    message = "Guess word";
    messageColor = "#49ade9";
    disabledLetters = document.querySelectorAll(".letter.disabled");
    for (j = 0, len = disabledLetters.length; j < len; j++) {
      letter = disabledLetters[j];
      letter.classList.remove("disabled");
    }
    drawHiddenWord();
    drawHangman(lives);
    drawMessage();
    return drawLives();
  };

  window.onload = function() {
    drawAlphabet();
    draw();
    drawHiddenWord();
    return drawHangman(lives);
  };

}).call(this);

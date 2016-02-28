(function() {
  var alpha, canvas, clearAll, clearCanvas, clicked, correct, count, ctx, draw, drawAlphabet, drawHangman, drawHiddenWord, drawLetters, drawLives, drawMessage, fillColor, gameOver, guessed, imageContainer, initialState, lineStart, lives, livesContainer, message, messageColor, messageContainer, myWord, processLetter, showImage, step, textColor, vertManStart, win, wordList, wrong,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  canvas = document.getElementById('gameCanvas');

  ctx = canvas.getContext("2d");

  ctx.font = "30px Arial";

  wordList = ["sad", "annoyed", "angry", "anxious", "bored", "curious", "delighted", "determined", "disappointed", "disapproving", "discouraged", "disgusted", "enraged", "envious", "excited", "frightened", "furious", "hopeful", "hostile", "jealous", "joyful", "offended", "proud", "puzzled", "surprised", "suspicious", "terrified", "thoughtful", "undecided", "upset", "worried"];

  alpha = "abcdefghijklmnopqrstuvwxyz";

  myWord = wordList[Math.floor(Math.random() * wordList.length)];

  guessed = [];

  clicked = [];

  lives = 7;

  message = "Guess emotion";

  lineStart = 50;

  step = 25;

  textColor = "black";

  fillColor = "silver";

  messageColor = "#49ade9";

  messageContainer = document.getElementById("message");

  livesContainer = document.getElementById("lives");

  imageContainer = document.getElementById("imgContainer");

  wrong = new Audio('wrong.mp3');

  correct = new Audio('correct.wav');

  gameOver = new Audio('game_over.wav');

  win = new Audio('win.wav');

  vertManStart = 80;

  showImage = function() {
    var image, imagePath;
    imagePath = "img/" + myWord + ".jpg";
    image = document.createElement("img");
    image.setAttribute("src", imagePath);
    return imageContainer.appendChild(image);
  };

  drawHangman = function(counter) {
    if (counter === 7) {
      ctx.beginPath();
      ctx.moveTo(795, 0);
      ctx.lineTo(795, canvas.height);
      ctx.lineWidth = 10;
      ctx.strokeStyle = "black";
      ctx.stroke();
      ctx.moveTo(730, canvas.height - 5);
      ctx.lineTo(795, canvas.height - 5);
      ctx.stroke();
      ctx.moveTo(700, 5);
      ctx.lineTo(795, 5);
      ctx.stroke();
      ctx.moveTo(700, 0);
      ctx.lineTo(700, 20);
      ctx.stroke();
      ctx.moveTo(765, 0);
      ctx.lineTo(795, 30);
      ctx.lineWidth = 5;
      return ctx.stroke();
    } else if (counter === 6) {
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.fillStyle = "black";
      ctx.arc(700, vertManStart, 30, 0, Math.PI * 2, true);
      return ctx.stroke();
    } else if (counter === 5) {
      ctx.beginPath();
      ctx.moveTo(700, vertManStart + 30);
      ctx.lineTo(700, vertManStart + 100);
      return ctx.stroke();
    } else if (counter === 4) {
      ctx.beginPath();
      ctx.moveTo(700, vertManStart + 30);
      ctx.lineTo(650, vertManStart + 80);
      return ctx.stroke();
    } else if (counter === 3) {
      ctx.beginPath();
      ctx.moveTo(700, vertManStart + 30);
      ctx.lineTo(750, vertManStart + 80);
      return ctx.stroke();
    } else if (counter === 2) {
      ctx.beginPath();
      ctx.strokeStyle = "black";
      ctx.moveTo(700, vertManStart + 100);
      ctx.lineTo(650, vertManStart + 170);
      return ctx.stroke();
    } else if (counter === 1) {
      ctx.beginPath();
      ctx.moveTo(700, vertManStart + 100);
      ctx.lineTo(750, vertManStart + 170);
      return ctx.stroke();
    } else if (counter === 0) {
      ctx.beginPath();
      ctx.strokeStyle = "#dc4949";
      ctx.lineWidth = 4;
      ctx.moveTo(700, 20);
      ctx.lineTo(700, 50);
      ctx.stroke();
      ctx.lineWidth = 3;
      ctx.fillStyle = "black";
      ctx.strokeStyle = "black";
      ctx.moveTo(685, vertManStart - 10);
      ctx.lineTo(695, vertManStart);
      ctx.stroke();
      ctx.moveTo(695, vertManStart - 10);
      ctx.lineTo(685, vertManStart);
      ctx.stroke();
      ctx.moveTo(705, vertManStart - 10);
      ctx.lineTo(715, vertManStart);
      ctx.stroke();
      ctx.moveTo(715, vertManStart - 10);
      ctx.lineTo(705, vertManStart);
      ctx.stroke();
      ctx.lineWidth = 1;
      ctx.fillStyle = "#49ade9";
      ctx.strokeStyle = "#49ade9";
      ctx.moveTo(690, vertManStart + 10);
      ctx.bezierCurveTo(695, vertManStart + 50, 705, vertManStart + 50, 710, vertManStart + 10);
      return ctx.fill();
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

  processLetter = function(letter) {
    var dummy_r, j, ref;
    if (!(indexOf.call(clicked, letter) >= 0) && !(indexOf.call(myWord, letter) >= 0)) {
      lives -= 1;
      wrong.play();
      drawHangman(lives);
      if (lives === 0) {
        messageColor = "#dc4949";
        message = "You lose";
        myWordContainer.innerHTML = myWord;
        setTimeout(function() {
          return gameOver.play();
        }, 500);
      }
    } else if (!(indexOf.call(clicked, letter) >= 0) && (indexOf.call(myWord, letter) >= 0)) {
      for (dummy_r = j = 0, ref = count(myWord, letter); 0 <= ref ? j < ref : j > ref; dummy_r = 0 <= ref ? ++j : --j) {
        guessed.push(letter);
        correct.play();
        if (guessed.length === myWord.length) {
          messageColor = "#2ecc71";
          message = "You win";
          myWordContainer.innerHTML = myWord;
          setTimeout(function() {
            return win.play();
          }, 500);
        }
      }
    }
    clicked.push(letter);
    return draw();
  };

  document.addEventListener("keypress", function(e) {
    var charCode, charStr, keyboardLetter;
    e = e || window.event;
    charCode = e.keyCode || e.which;
    charStr = String.fromCharCode(charCode);
    if (indexOf.call(alpha, charStr) >= 0 && message !== "You win" && message !== "You lose") {
      processLetter(charStr);
      keyboardLetter = document.getElementById(charStr);
      return keyboardLetter.classList.add("disabled");
    }
  });

  document.addEventListener("click", function(e) {
    var clickedLetter;
    if (e.target.classList.contains("letter") && message !== "You win" && message !== "You lose") {
      clickedLetter = e.target.id;
      e.target.classList.add("disabled");
      return processLetter(clickedLetter);
    } else if (e.target.classList.contains("play-button")) {
      return initialState();
    }
  }, false);

  clearAll = function() {
    var disabledLetters, j, len, letter;
    clearCanvas();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    vertManStart = 80;
    myWord = wordList[Math.floor(Math.random() * wordList.length)];
    guessed = [];
    clicked = [];
    lives = 7;
    message = "Guess emotion";
    messageColor = "#49ade9";
    disabledLetters = document.querySelectorAll(".letter.disabled");
    for (j = 0, len = disabledLetters.length; j < len; j++) {
      letter = disabledLetters[j];
      letter.classList.remove("disabled");
    }
    drawHiddenWord();
    drawHangman(lives);
    drawMessage();
    drawLives();
    imageContainer.innerHTML = "";
    myWordContainer.innerHTML = "";
    return showImage();
  };

  initialState = function() {
    var myInterval;
    if (message === "You lose") {
      myInterval = setInterval(function() {
        var j, results, stage;
        if (vertManStart < canvas.height + vertManStart && message === "You lose") {
          vertManStart += 10;
          ctx.clearRect(canvas.width / 2, 0, canvas.width, canvas.height);
          results = [];
          for (stage = j = 0; j <= 7; stage = ++j) {
            results.push(drawHangman(stage));
          }
          return results;
        }
      }, 30);
      return setTimeout(function() {
        clearInterval(myInterval);
        return clearAll();
      }, 1000);
    } else {
      return clearAll();
    }
  };

  window.onload = function() {
    drawAlphabet();
    draw();
    drawHiddenWord();
    drawHangman(lives);
    return showImage();
  };

}).call(this);

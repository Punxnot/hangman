(function() {
  var alpha, ballRadius, canvas, canvasBottomEdge, canvasLeftEdge, canvasRightEdge, canvasTopEdge, clicked, count, ctx, draw, drawAlphabet, drawHiddenWord, drawLetters, drawLives, drawMessage, fillColor, guessed, lettersInLine, lineHeight, lineStart, lives, message, messageColor, myWord, rect, startX, startY, step, textColor, wordList,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  canvas = document.getElementById('gameCanvas');

  ctx = canvas.getContext("2d");

  ctx.font = "30px Arial";

  wordList = ["apple", "pear", "pineapple", "orange", "apricot", "peach", "raspberry", "strawberry"];

  alpha = "abcdefghijklmnopqrstuvwxyz";

  startX = 20;

  startY = 250;

  myWord = wordList[Math.floor(Math.random() * wordList.length)];

  guessed = [];

  clicked = [];

  lives = 7;

  message = "Guess word";

  lineStart = 50;

  rect = canvas.getBoundingClientRect();

  canvasLeftEdge = rect.left;

  canvasRightEdge = rect.right;

  canvasBottomEdge = rect.bottom;

  canvasTopEdge = rect.top;

  ballRadius = 17;

  lineHeight = 35;

  lettersInLine = 13;

  step = 25;

  textColor = "black";

  fillColor = "silver";

  messageColor = "#49ade9";

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

  drawAlphabet = function() {
    var j, len, letter, results, x, y;
    x = startX;
    y = startY;
    results = [];
    for (j = 0, len = alpha.length; j < len; j++) {
      letter = alpha[j];
      ctx.beginPath();
      ctx.arc(x + 7, y - 7, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = textColor;
      ctx.stroke();
      ctx.fillText(letter, x, y);
      ctx.closePath();
      if (indexOf.call(clicked, letter) >= 0) {
        ctx.beginPath();
        ctx.arc(x + 7, y - 7, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = fillColor;
        ctx.fill();
        ctx.closePath();
      }
      x += lineHeight;
      if (x >= 460) {
        y += 50;
        results.push(x = 20);
      } else {
        results.push(void 0);
      }
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
    ctx.beginPath();
    ctx.fillStyle = messageColor;
    ctx.fillText(message, 20, 30);
    return ctx.closePath();
  };

  drawLives = function() {
    ctx.beginPath();
    ctx.fillStyle = messageColor;
    ctx.fillText(lives, 460, 30);
    return ctx.closePath();
  };

  draw = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawHiddenWord();
    drawAlphabet();
    drawLetters();
    drawMessage();
    return drawLives();
  };

  count = function(string, char) {
    var re;
    re = new RegExp(char, "gi");
    return string.match(re).length;
  };

  document.addEventListener("click", function(e) {
    var i, j, k, l, m, n, o, p, pos, r, ref, ref1, ref10, ref11, ref12, ref13, ref14, ref15, ref16, ref17, ref18, ref19, ref2, ref20, ref21, ref22, ref3, ref4, ref5, ref6, ref7, ref8, ref9, results, results1, results2, results3;
    pos = [e.clientX - canvasLeftEdge, e.clientY - canvasTopEdge];
    if (lives > 0 && message !== "You win") {
      for (i = j = 0, ref = alpha.length; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
        if (i < lettersInLine) {
          if ((ref1 = pos[0], indexOf.call((function() {
            results = [];
            for (var k = ref2 = startX + lineHeight * i + 7 - ballRadius, ref3 = startX + lineHeight * i + 7 + ballRadius; ref2 <= ref3 ? k <= ref3 : k >= ref3; ref2 <= ref3 ? k++ : k--){ results.push(k); }
            return results;
          }).apply(this), ref1) >= 0) && (ref4 = pos[1], indexOf.call((function() {
            results1 = [];
            for (var l = ref5 = startY - 7 - ballRadius, ref6 = startY - 7 + ballRadius; ref5 <= ref6 ? l <= ref6 : l >= ref6; ref5 <= ref6 ? l++ : l--){ results1.push(l); }
            return results1;
          }).apply(this), ref4) >= 0)) {
            console.log(alpha[i]);
            if (!(ref7 = alpha[i], indexOf.call(clicked, ref7) >= 0) && !(ref8 = alpha[i], indexOf.call(myWord, ref8) >= 0)) {
              lives -= 1;
              if (lives === 0) {
                messageColor = "#dc4949";
                message = "You lose";
              }
            } else if (!(ref9 = alpha[i], indexOf.call(clicked, ref9) >= 0) && (ref10 = alpha[i], indexOf.call(myWord, ref10) >= 0)) {
              for (r = m = 0, ref11 = count(myWord, alpha[i]); 0 <= ref11 ? m < ref11 : m > ref11; r = 0 <= ref11 ? ++m : --m) {
                guessed.push(alpha[i]);
                if (guessed.length === myWord.length) {
                  messageColor = "#2ecc71";
                  message = "You win";
                }
              }
            }
            clicked.push(alpha[i]);
          }
        } else {
          if ((ref12 = pos[0], indexOf.call((function() {
            results2 = [];
            for (var n = ref13 = startX + lineHeight * (i - lettersInLine) + 7 - ballRadius, ref14 = startX + lineHeight * (i - lettersInLine) + 7 + ballRadius; ref13 <= ref14 ? n <= ref14 : n >= ref14; ref13 <= ref14 ? n++ : n--){ results2.push(n); }
            return results2;
          }).apply(this), ref12) >= 0) && (ref15 = pos[1], indexOf.call((function() {
            results3 = [];
            for (var o = ref16 = startY + 50 - 7 - ballRadius, ref17 = startY + 50 - 7 + ballRadius; ref16 <= ref17 ? o <= ref17 : o >= ref17; ref16 <= ref17 ? o++ : o--){ results3.push(o); }
            return results3;
          }).apply(this), ref15) >= 0)) {
            console.log(alpha[i]);
            if (!(ref18 = alpha[i], indexOf.call(clicked, ref18) >= 0) && !(ref19 = alpha[i], indexOf.call(myWord, ref19) >= 0)) {
              lives -= 1;
              if (lives === 0) {
                messageColor = "#dc4949";
                message = "You lose";
              }
            } else if (!(ref20 = alpha[i], indexOf.call(clicked, ref20) >= 0) && (ref21 = alpha[i], indexOf.call(myWord, ref21) >= 0)) {
              for (r = p = 0, ref22 = count(myWord, alpha[i]); 0 <= ref22 ? p < ref22 : p > ref22; r = 0 <= ref22 ? ++p : --p) {
                guessed.push(alpha[i]);
                if (guessed.length === myWord.length) {
                  messageColor = "#2ecc71";
                  message = "You win";
                }
              }
            }
            clicked.push(alpha[i]);
          }
        }
      }
    }
    return draw();
  }, false);

  draw();

}).call(this);

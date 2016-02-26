(function() {
  var alpha, ballRadius, canvas, canvasBottomEdge, canvasLeftEdge, canvasRightEdge, canvasTopEdge, clicked, ctx, draw, drawAlphabet, drawHiddenWord, guessed, lettersInLine, lineHeight, lineStart, lives, message, myWord, rect, startX, startY, wordList,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  canvas = document.getElementById('gameCanvas');

  ctx = canvas.getContext("2d");

  ctx.font = "30px Arial";

  wordList = ["apple", "pear", "pineapple", "orange", "apricot", "peach", "raspberry", "strawberry"];

  alpha = "abcdefghijklmnopqrstuvwxyz";

  startX = 20;

  startY = 250;

  myWord = "apple";

  guessed = [];

  clicked = [];

  lives = 7;

  message = "";

  lineStart = 50;

  rect = canvas.getBoundingClientRect();

  canvasLeftEdge = rect.left;

  canvasRightEdge = rect.right;

  canvasBottomEdge = rect.bottom;

  canvasTopEdge = rect.top;

  ballRadius = 17;

  lineHeight = 35;

  lettersInLine = 13;

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
      ctx.fillStyle = "black";
      ctx.stroke();
      ctx.closePath();
      ctx.fillText(letter, x, y);
      if (indexOf.call(clicked, letter) >= 0) {
        ctx.beginPath();
        ctx.arc(x + 7, y - 7, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "silver";
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

  draw = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawHiddenWord();
    return drawAlphabet();
  };

  document.addEventListener("click", function(e) {
    var i, j, k, l, m, n, pos, ref, ref1, ref10, ref11, ref12, ref13, ref14, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, results, results1, results2, results3;
    pos = [e.clientX - canvasLeftEdge, e.clientY - canvasTopEdge];
    if (lives > 0 && message !== "YOU WIN!") {
      for (i = j = 0, ref = alpha.length; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
        if (i <= lettersInLine) {
          if ((ref1 = pos[0], indexOf.call((function() {
            results = [];
            for (var k = ref2 = startX + lineHeight * i + 7 - ballRadius, ref3 = startX + lineHeight * i + 7 + ballRadius; ref2 <= ref3 ? k <= ref3 : k >= ref3; ref2 <= ref3 ? k++ : k--){ results.push(k); }
            return results;
          }).apply(this), ref1) >= 0) && (ref4 = pos[1], indexOf.call((function() {
            results1 = [];
            for (var l = ref5 = startY - 7 - ballRadius, ref6 = startY - 7 + ballRadius; ref5 <= ref6 ? l <= ref6 : l >= ref6; ref5 <= ref6 ? l++ : l--){ results1.push(l); }
            return results1;
          }).apply(this), ref4) >= 0)) {
            if (!(ref7 = alpha[i], indexOf.call(clicked, ref7) >= 0) && !(ref8 = alpha[i], indexOf.call(myWord, ref8) >= 0)) {
              lives -= 1;
            }
            clicked.push(alpha[i]);
          }
        } else {
          if ((ref9 = pos[0], indexOf.call((function() {
            results2 = [];
            for (var m = ref10 = startX + lineHeight * (i - lettersInLine) + 7 - ballRadius, ref11 = startX + lineHeight * (i - lettersInLine) + 7 + ballRadius; ref10 <= ref11 ? m <= ref11 : m >= ref11; ref10 <= ref11 ? m++ : m--){ results2.push(m); }
            return results2;
          }).apply(this), ref9) >= 0) && (ref12 = pos[1], indexOf.call((function() {
            results3 = [];
            for (var n = ref13 = startY + 50 - 7 - ballRadius, ref14 = startY + 50 - 7 + ballRadius; ref13 <= ref14 ? n <= ref14 : n >= ref14; ref13 <= ref14 ? n++ : n--){ results3.push(n); }
            return results3;
          }).apply(this), ref12) >= 0)) {
            clicked.push(alpha[i]);
          }
        }
      }
      console.log(clicked);
      return draw();
    }
  }, false);

  draw();

}).call(this);

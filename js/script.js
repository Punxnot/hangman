(function() {
  var ballColor, ballRadius, canvas, ctx, draw, drawBall, drawPaddle, dx, dy, leftPressed, paddleColor, paddleHeight, paddleStep, paddleWidth, paddleX, rightPressed, x, y;

  canvas = document.getElementById('gameCanvas');

  ctx = canvas.getContext("2d");

  x = canvas.width / 2;

  y = canvas.height - 30;

  dx = 2;

  dy = -2;

  ballRadius = 10;

  ballColor = "#0095DD";

  paddleColor = "#0095DD";

  paddleHeight = 10;

  paddleWidth = 75;

  paddleX = (canvas.width - paddleWidth) / 2;

  paddleStep = 7;

  rightPressed = false;

  leftPressed = false;

  drawBall = function() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    return ctx.closePath();
  };

  drawPaddle = function() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = paddleColor;
    ctx.fill();
    return ctx.closePath();
  };

  draw = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    x += dx;
    y += dy;
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
      paddleX += paddleStep;
    } else if (leftPressed && paddleX > 0) {
      paddleX -= paddleStep;
    }
    if (y + dy < ballRadius) {
      dy = -dy;
      ballColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    } else if (y + dy > canvas.height - ballRadius) {
      if (x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
      } else {
        console.log("Game over");
      }
    }
    if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
      dx = -dx;
      return ballColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    }
  };

  document.addEventListener("keydown", function(e) {
    console.log(e.keyCode);
    if (e.keyCode === 39) {
      return rightPressed = true;
    } else if (e.keyCode === 37) {
      return leftPressed = true;
    }
  }, false);

  document.addEventListener("keyup", function(e) {
    if (e.keyCode === 39) {
      return rightPressed = false;
    } else if (e.keyCode === 37) {
      return leftPressed = false;
    }
  }, false);

  setInterval(draw, 10);

}).call(this);

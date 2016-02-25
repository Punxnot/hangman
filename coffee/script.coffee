canvas = document.getElementById('gameCanvas')
ctx = canvas.getContext("2d")
x = canvas.width/2
y = canvas.height - 30
dx = 2 # horizontal vector
dy = -2 # vertical vector
ballRadius = 10
ballColor = "#0095DD"
paddleColor = "#0095DD"
paddleHeight = 10
paddleWidth = 75
paddleX = (canvas.width - paddleWidth)/2
paddleStep = 7
rightPressed = false
leftPressed = false

drawBall = ->
  ctx.beginPath()
  ctx.arc(x, y, ballRadius, 0, Math.PI*2)
  ctx.fillStyle = ballColor
  ctx.fill()
  ctx.closePath()

drawPaddle = ->
  ctx.beginPath()
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight)
  ctx.fillStyle = paddleColor
  ctx.fill()
  ctx.closePath()

draw = ->
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawBall()
  drawPaddle()

  # Move ball
  x += dx
  y += dy

  # Move paddle on arrows press
  if rightPressed && paddleX < canvas.width - paddleWidth
    paddleX += paddleStep
  else if leftPressed && paddleX > 0
    paddleX -= paddleStep

  # Bounce off top and bottom walls
  if y + dy < ballRadius
    dy = -dy
    ballColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16)
  else if y + dy > canvas.height - ballRadius
    if x > paddleX && x < paddleX + paddleWidth
      dy = -dy
    else
      console.log "Game over"
      # alert "GAME OVER"
      # document.location.reload()
  # Bounce off left and right walls
  if x + dx < ballRadius || x + dx > canvas.width - ballRadius
    dx = -dx
    ballColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16)

# Listen to key press
document.addEventListener("keydown", (e)->
  console.log e.keyCode
  if e.keyCode == 39
    rightPressed = true
  else if e.keyCode == 37
    leftPressed = true
, false)

document.addEventListener("keyup", (e)->
  if e.keyCode == 39
    rightPressed = false
  else if e.keyCode == 37
    leftPressed = false
, false)

setInterval(draw, 10)

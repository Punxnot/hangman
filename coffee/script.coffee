canvas = document.getElementById('gameCanvas')
ctx = canvas.getContext("2d")
ctx.font = "30px Arial"
wordList = ["apple", "pear", "pineapple", "orange", "apricot", "peach", "raspberry", "strawberry"]
alpha = "abcdefghijklmnopqrstuvwxyz"
startX = 20
startY = 250
myWord = "apple" # To do: add random choice
guessed = []
clicked = []
lives = 7
message = ""
lineStart = 50
rect = canvas.getBoundingClientRect()
canvasLeftEdge = rect.left
canvasRightEdge = rect.right
canvasBottomEdge = rect.bottom
canvasTopEdge = rect.top
ballRadius = 17
lineHeight = 35
lettersInLine = 13

drawHiddenWord = ->
  for i in [1..myWord.length]
    ctx.moveTo(lineStart*i, 100)
    ctx.lineTo(lineStart*i+20, 100)
    ctx.stroke()

drawAlphabet = ->
  x = startX
  y = startY
  for letter in alpha
    ctx.beginPath()
    ctx.arc(x + 7, y - 7, ballRadius, 0, Math.PI*2)
    ctx.fillStyle = "black"
    ctx.stroke()
    ctx.closePath()
    ctx.fillText(letter,x,y)
    if letter in clicked
      ctx.beginPath()
      ctx.arc(x + 7, y - 7, ballRadius, 0, Math.PI*2)
      ctx.fillStyle = "silver"
      ctx.fill()
      ctx.closePath()
    x += lineHeight
    if x >= 460
      y += 50
      x = 20

draw = ->
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawHiddenWord()

# Listen to key press
document.addEventListener("click", (e)->
  pos = [e.clientX-canvasLeftEdge, e.clientY-canvasTopEdge]
  if lives > 0 and message != "YOU WIN!"
    for i in [0..alpha.length]
      if i <= lettersInLine
        if pos[0] in [(startX + lineHeight * i + 7 - ballRadius)..(startX + lineHeight * i + 7 + ballRadius)] and pos[1] in [(startY - 7 - ballRadius)..(startY - 7 + ballRadius)]
          clicked.push(alpha[i])
      else
        if pos[0] in [(startX + lineHeight * (i - lettersInLine) + 7 - ballRadius)..(startX + lineHeight * (i - lettersInLine) + 7 + ballRadius)] and pos[1] in [(startY + 50 - 7 - ballRadius)..(startY + 50 - 7 + ballRadius)]
          clicked.push(alpha[i])
    console.log clicked
, false)

# setInterval(draw, 10)
drawHiddenWord()
drawAlphabet()

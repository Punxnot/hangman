canvas = document.getElementById('gameCanvas')
ctx = canvas.getContext("2d")
ctx.font = "30px Arial"
wordList = ["sad", "surprised", "upset"]
alpha = "abcdefghijklmnopqrstuvwxyz"
myWord = wordList[Math.floor(Math.random()*wordList.length)]
guessed = []
clicked = []
lives = 7
message = "Guess emotion"
lineStart = 50
step = 25
textColor = "black"
fillColor = "silver"
messageColor = "#49ade9"
messageContainer = document.getElementById("message")
livesContainer = document.getElementById("lives")
imageContainer = document.getElementById("imgContainer")

showImage = ->
  imagePath = "img/#{myWord}.jpg"
  image = document.createElement("img")
  image.setAttribute("src", imagePath)
  imageContainer.appendChild(image)

drawHangman = (counter) ->
  if counter == 7
    ctx.beginPath()
    ctx.moveTo(595, 0)
    ctx.lineTo(595, canvas.height)
    ctx.lineWidth=10
    ctx.strokeStyle = "black"
    ctx.stroke()
    ctx.moveTo(530, canvas.height-5)
    ctx.lineTo(595, canvas.height-5)
    ctx.stroke()
    ctx.moveTo(500, 5)
    ctx.lineTo(595, 5)
    ctx.stroke()
    ctx.moveTo(500, 0)
    ctx.lineTo(500, 20)
    ctx.stroke()
    ctx.moveTo(565, 0)
    ctx.lineTo(595, 30)
    ctx.lineWidth = 5
    ctx.stroke()
  else if counter == 6
    ctx.beginPath()
    ctx.lineWidth = 1
    ctx.fillStyle = "black"
    ctx.arc(500, 80, 30, 0, Math.PI * 2, true)
    ctx.stroke()
  else if counter == 5
    ctx.beginPath()
    ctx.moveTo(500, 110)
    ctx.lineTo(500, 180)
    ctx.stroke()
  else if counter == 4
    ctx.beginPath()
    ctx.moveTo(500, 110)
    ctx.lineTo(450, 160)
    ctx.stroke()
  else if counter == 3
    ctx.beginPath()
    ctx.moveTo(500, 110)
    ctx.lineTo(550, 160)
    ctx.stroke()
  else if counter == 2
    ctx.beginPath()
    ctx.strokeStyle = "black"
    ctx.moveTo(500, 180)
    ctx.lineTo(450, 280)
    ctx.stroke()
  else if counter == 1
    ctx.beginPath()
    ctx.moveTo(500, 180)
    ctx.lineTo(550, 280)
    ctx.stroke()
  else if counter == 0
    ctx.beginPath()
    ctx.strokeStyle = "#dc4949"
    ctx.lineWidth = 4
    ctx.moveTo(500, 20)
    ctx.lineTo(500, 50)
    ctx.stroke()

# Create alphabet
drawAlphabet = ->
  letterContainer = document.getElementById("lettersContainer")
  for letter in alpha
    span = document.createElement("span")
    span.innerHTML = letter
    span.classList.add("letter")
    span.id = letter
    letterContainer.appendChild(span)

drawHiddenWord = ->
  ctx.beginPath()
  for i in [1..myWord.length]
    ctx.moveTo(lineStart*i, 100)
    ctx.lineTo(lineStart*i+20, 100)
    ctx.stroke()
  ctx.closePath()

drawLetters = ->
  copyWord = myWord
  for i in [1...myWord.length+1]
    if myWord[i-1] in guessed
      ctx.fillStyle = textColor
      ctx.fillText(myWord[i-1], step*2*(copyWord.indexOf(copyWord[i-1])+1), 85)
      copyWord = copyWord.replace(myWord[i-1], "0")

drawMessage = ->
  messageContainer.innerHTML = message
  messageContainer.style.color = messageColor

drawLives = ->
  livesContainer.innerHTML = lives
  livesContainer.style.color = messageColor

draw = ->
  drawLetters()
  drawMessage()
  drawLives()

clearCanvas = ->
  ctx.clearRect(0, 0, canvas.width, canvas.height)

# Helper method to count letter occurrences in string
count = (string, char) ->
  re = new RegExp(char, "gi")
  return string.match(re).length

# Listen to click
document.addEventListener("click", (e)->
  if e.target.classList.contains("letter") and message != "You win" and message != "You lose"
    clickedLetter = e.target.id
    if !(clickedLetter in clicked) and !(clickedLetter in myWord)
      lives -= 1
      drawHangman(lives)
      if lives == 0
        messageColor = "#dc4949"
        message = "You lose"
    else if !(clickedLetter in clicked) and (clickedLetter in myWord)
      for dummy_r in [0...count(myWord, clickedLetter)]
        guessed.push(clickedLetter)
        if guessed.length == myWord.length
          messageColor = "#2ecc71"
          message = "You win"
    clicked.push(clickedLetter)
    e.target.classList.add("disabled")
    draw()
  else if e.target.classList.contains("play-button")
    initialState()
, false)

initialState = ->
  clearCanvas()
  ctx.strokeStyle = "black"
  ctx.lineWidth = 1
  myWord = wordList[Math.floor(Math.random()*wordList.length)]
  guessed = []
  clicked = []
  lives = 7
  message = "Guess emotion"
  messageColor = "#49ade9"
  disabledLetters = document.querySelectorAll(".letter.disabled")
  for letter in disabledLetters
    letter.classList.remove("disabled")
  drawHiddenWord()
  drawHangman(lives)
  drawMessage()
  drawLives()
  imageContainer.innerHTML = ""
  showImage()

window.onload = ->
  drawAlphabet()
  draw()
  drawHiddenWord()
  drawHangman(lives)
  showImage()

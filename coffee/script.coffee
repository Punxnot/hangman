canvas = document.getElementById('gameCanvas')
ctx = canvas.getContext("2d")
ctx.font = "30px Arial"
wordList = ["apple", "pear", "pineapple", "go"]
alpha = "abcdefghijklmnopqrstuvwxyz"
myWord = wordList[Math.floor(Math.random()*wordList.length)]
guessed = []
clicked = []
lives = 7
message = "Guess word"
lineStart = 50
step = 25
textColor = "black"
fillColor = "silver"
messageColor = "#49ade9"
messageContainer = document.getElementById("message")
livesContainer = document.getElementById("lives")

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
  console.log "Draw"
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
  console.log e.target
  if e.target.classList.contains("letter") and message != "You win" and message != "You lose"
    clickedLetter = e.target.id
    if !(clickedLetter in clicked) and !(clickedLetter in myWord)
      lives -= 1
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
  myWord = wordList[Math.floor(Math.random()*wordList.length)]
  guessed = []
  clicked = []
  lives = 7
  message = "Guess word"
  messageColor = "#49ade9"
  disabledLetters = document.querySelectorAll(".letter.disabled")
  for letter in disabledLetters
    letter.classList.remove("disabled")
  drawHiddenWord()

window.onload = ->
  drawAlphabet()
  draw()
  drawHiddenWord()

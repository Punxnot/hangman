canvas = document.getElementById('gameCanvas')
ctx = canvas.getContext("2d")
ctx.font = "30px Arial"
wordList = ["sad", "annoyed", "angry", "anxious", "bored", "curious", "delighted", "determined", "disappointed", "disapproving", "discouraged", "disgusted", "enraged", "envious", "excited", "frightened", "furious", "hopeful", "hostile", "jealous", "joyful", "offended", "proud", "puzzled", "surprised", "suspicious", "terrified", "thoughtful", "undecided", "upset", "worried"]
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
wrong = new Audio('wrong.mp3')
correct = new Audio('correct.wav')
gameOver = new Audio('game_over.wav')
win = new Audio('win.wav')

showImage = ->
  imagePath = "img/#{myWord}.jpg"
  image = document.createElement("img")
  image.setAttribute("src", imagePath)
  imageContainer.appendChild(image)

drawHangman = (counter) ->
  if counter == 7
    ctx.beginPath()
    ctx.moveTo(795, 0)
    ctx.lineTo(795, canvas.height)
    ctx.lineWidth=10
    ctx.strokeStyle = "black"
    ctx.stroke()
    ctx.moveTo(730, canvas.height-5)
    ctx.lineTo(795, canvas.height-5)
    ctx.stroke()
    ctx.moveTo(700, 5)
    ctx.lineTo(795, 5)
    ctx.stroke()
    ctx.moveTo(700, 0)
    ctx.lineTo(700, 20)
    ctx.stroke()
    ctx.moveTo(765, 0)
    ctx.lineTo(795, 30)
    ctx.lineWidth = 5
    ctx.stroke()
  else if counter == 6
    ctx.beginPath()
    ctx.lineWidth = 1
    ctx.fillStyle = "black"
    ctx.arc(700, 80, 30, 0, Math.PI * 2, true)
    ctx.stroke()
  else if counter == 5
    ctx.beginPath()
    ctx.moveTo(700, 110)
    ctx.lineTo(700, 180)
    ctx.stroke()
  else if counter == 4
    ctx.beginPath()
    ctx.moveTo(700, 110)
    ctx.lineTo(650, 160)
    ctx.stroke()
  else if counter == 3
    ctx.beginPath()
    ctx.moveTo(700, 110)
    ctx.lineTo(750, 160)
    ctx.stroke()
  else if counter == 2
    ctx.beginPath()
    ctx.strokeStyle = "black"
    ctx.moveTo(700, 180)
    ctx.lineTo(650, 250)
    ctx.stroke()
  else if counter == 1
    ctx.beginPath()
    ctx.moveTo(700, 180)
    ctx.lineTo(750, 250)
    ctx.stroke()
  else if counter == 0
    ctx.beginPath()
    ctx.strokeStyle = "#dc4949"
    ctx.lineWidth = 4
    ctx.moveTo(700, 20)
    ctx.lineTo(700, 50)
    ctx.stroke()
    ctx.lineWidth = 3
    ctx.fillStyle = "black"
    ctx.strokeStyle = "black"
    ctx.moveTo(685, 70)
    ctx.lineTo(695, 80)
    ctx.stroke()
    ctx.moveTo(695, 70)
    ctx.lineTo(685, 80)
    ctx.stroke()
    ctx.moveTo(705, 70)
    ctx.lineTo(715, 80)
    ctx.stroke()
    ctx.moveTo(715, 70)
    ctx.lineTo(705, 80)
    ctx.stroke()
    ctx.lineWidth = 1
    ctx.fillStyle = "#8000FF"
    ctx.strokeStyle = "#8000FF"
    ctx.moveTo(690,90)
    ctx.bezierCurveTo(695, 130, 705, 130, 710, 90)
    ctx.fill()

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
      wrong.play()
      drawHangman(lives)
      if lives == 0
        messageColor = "#dc4949"
        message = "You lose"
        setTimeout(->
          gameOver.play()
        , 500)
    else if !(clickedLetter in clicked) and (clickedLetter in myWord)
      for dummy_r in [0...count(myWord, clickedLetter)]
        guessed.push(clickedLetter)
        correct.play()
        if guessed.length == myWord.length
          messageColor = "#2ecc71"
          message = "You win"
          win.play()
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

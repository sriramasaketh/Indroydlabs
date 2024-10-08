const express = require('express')
const http = require('http')
const {Server} = require('socket.io')
const cors = require('cors')

const app = express()
app.use(cors())

const server = http.createServer(app)
const io = new Server(server)

const questions = [
  {question: 'What is the capital of India?', answer: 'New Delhi'},
  {question: 'What is 2 + 2?', answer: '4'},
  {question: 'What is the largest planet?', answer: 'Jupiter'},
  {question: "What is 2 * 3'?", answer: '6'},
  {question: 'What is the boiling point of water?', answer: '100'},
]

let currentQuestionIndex = 0

io.on('connection', socket => {
  console.log('A user connected')

  socket.emit('question', questions[currentQuestionIndex])

  socket.on('answer', data => {
    const {name, answer} = data
    if (
      answer.toLowerCase() ===
      questions[currentQuestionIndex].answer.toLowerCase()
    ) {
      io.emit('correct', {name})
      currentQuestionIndex = (currentQuestionIndex + 1) % questions.length
      io.emit('question', questions[currentQuestionIndex])
    } else {
      socket.emit('wrong', 'Your answer is wrong. Try again!')
    }
  })

  socket.on('disconnect', () => {
    console.log('A user disconnected')
  })
})

server.listen(4000, () => {
  console.log('Server running on http://localhost:4000')
})

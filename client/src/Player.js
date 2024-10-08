import React, {useState, useEffect} from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:4000')

function Player() {
  const [name, setName] = useState('')
  const [answer, setAnswer] = useState('')
  const [message, setMessage] = useState('')
  const [question, setQuestion] = useState('')

  useEffect(() => {
    socket.on('question', data => {
      setQuestion(data.question)
      setMessage('')
    })

    socket.on('wrong', data => {
      setMessage(data)
    })

    return () => {
      socket.off('question')
      socket.off('wrong')
    }
  }, [])

  const submitAnswer = () => {
    if (name && answer) {
      socket.emit('answer', {name, answer})
      setAnswer('')
    }
  }

  return (
    <div className='player'>
      <h1>Join the KBC Game</h1>
      <p>Question: {question}</p>
      <input
        type='text'
        placeholder='Your Name'
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type='text'
        placeholder='Your Answer'
        value={answer}
        onChange={e => setAnswer(e.target.value)}
      />
      <button onClick={submitAnswer}>Submit Answer</button>
      {message && <p>{message}</p>}
    </div>
  )
}

export default Player

import React, {useState, useEffect} from 'react'
import io from 'socket.io-client'
import QRCode from 'qrcode.react'

const socket = io('http://localhost:4000')

function MainApp() {
  const [question, setQuestion] = useState('')
  const [winner, setWinner] = useState('')

  useEffect(() => {
    socket.on('question', data => {
      setQuestion(data.question)
      setWinner('')
    })

    socket.on('correct', data => {
      setWinner(`Congratulations ${data.name}, you answered correctly!`)
    })

    return () => {
      socket.off('question')
      socket.off('correct')
    }
  }, [])

  const qrCodeValue = 'http://localhost:3000/player'

  return (
    <div className='main-app'>
      <h1>KBC Game</h1>
      {question && <h2>Question: {question}</h2>}
      <QRCode value={qrCodeValue} />
      {winner && <h3>{winner}</h3>}
    </div>
  )
}

export default MainApp

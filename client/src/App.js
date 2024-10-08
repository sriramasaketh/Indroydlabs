import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import MainApp from './MainApp'
import Player from './Player'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainApp />} />
        <Route path='/player' element={<Player />} />
      </Routes>
    </Router>
  )
}

export default App

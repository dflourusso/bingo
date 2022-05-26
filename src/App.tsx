import React from 'react'

import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './screens/Home'
import Game from './screens/Game'

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/game/:uid" element={<Game />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

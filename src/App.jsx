import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Home from './pages/Home/Home'
import AgentsData from './pages/AgentsData/agentsData'

const App = () => {
  return (
  <Router>
  <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/agents' element={<AgentsData/>} />
  </Routes>
  </Router>

  )
}

export default App
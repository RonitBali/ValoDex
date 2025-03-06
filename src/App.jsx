import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Home from './pages/Home/Home'
import AgentsCard from './pages/AgentCard/agentCard'

const App = () => {
  return (
  <Router>
  <Routes>
    <Route path='/' element={<Home/>} />
    {/* <Route path='/' element={<AgentsCard/>} /> */}
    <Route path='/agents' element={<AgentsCard/>} />
  </Routes>
  </Router>

  )
}

export default App
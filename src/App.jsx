import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Home from './pages/Home/Home'
import AgentsCard from './pages/AgentCard/agentCard'
import { Analytics } from '@vercel/analytics/react';
import AbilitiesPage from './pages/Ability/ability';
import Map from './pages/Maps/Map';

const App = () => {
  return (
  <Router>
  <Routes>
    <Route path='/' element={<Home/>} />
    {/* <Route path='/' element={<AgentsCard/>} /> */}
    <Route path='/abilities' element={<AbilitiesPage/>} />
    <Route path='/maps' element={<Map/>} />
  </Routes>
  <Analytics/>
  </Router>

  )
}

export default App
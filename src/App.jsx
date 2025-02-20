import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Home from "./pages/Home/Home"
import Agents from "./pages/Agentspage/Agents"

function App() {

  return (
    <>
    <Agents/>
      {/* <Router>
        <Routes>
          <Route path = '/' element = {<Home/>}/>
          <Route path = '/agents' element = {<Agents/>}/>
        </Routes>
      </Router> */}
    </>
  )
}

export default App

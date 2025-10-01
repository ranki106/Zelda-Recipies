import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Echoes from './pages/EoW'
import Tears from './pages/TotK'
import Breath from './pages/BotW'
import Contact from './pages/Contact'
import Skyward from './pages/Skyward'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route 
          path="/"
          element={<Home />}
        />
        <Route
          path="/echoes"
          element={<Echoes />}
        />
        <Route
          path="/tears"
          element={<Tears />}
        />
        <Route
          path="/breath"
          element={<Breath />}
        />
        <Route
          path="/contact"
          element={<Contact />}
        />
        <Route
          path="/hyrule-warriors"
          element={<Contact />}
        />
        <Route
          path="/skyward-sword"
          element={<Skyward />}
        />
      </Routes>
    </Router>
  )
}

export default App

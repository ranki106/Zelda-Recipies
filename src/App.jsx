import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Echoes from './pages/EoW'
import Tears from './pages/TotK'
import Breath from './pages/BotW'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [count, setCount] = useState(0)

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
      </Routes>
    </Router>
  )
}

export default App

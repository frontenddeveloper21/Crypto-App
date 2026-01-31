import { useState } from 'react'
import './App.css'
import Navbar from './Pages/Navbar'
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import About from './Pages/About';

function App() {
  const [count, setCount] = useState(0)

  return (
    
  <div className='max-w-[1600px] container mx-auto'>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
  </div>
  
  )
}

export default App
import { useState } from 'react'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Home from './pages/Home.jsx'
import { Routes, Route } from 'react-router-dom'

import { Toaster } from "react-hot-toast"


function App() {

  return (
    <div className='p-4 h-screen flex items-center justify-center'>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

        </Routes>
        <Toaster />
    </div>
  )
}

export default App

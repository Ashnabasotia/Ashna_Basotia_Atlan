import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import HomePage from './Pages/HomePage/HomePage'
import Analytics from './Pages/Analytics/Analytics'


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/Analytics" element={<Analytics/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

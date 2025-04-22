import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import  Addblog from './Pages/Addblog'
import  Editblog from './Pages/Editblog'
import AdminLogin from './Pages/AdminLogin'
import AdminSignup from './Pages/AdminSignup'
import AdminPage from './Pages/AdminPage'


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add' element={<Addblog />} />
          <Route path='/edit' element={<Editblog />} />
          <Route path='/login' element={<AdminLogin />} />
          <Route path='/signup' element={<AdminSignup />} />
          <Route path='/adminpage' element={<AdminPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

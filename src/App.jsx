import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Signin from './Component/Signin'
import Signup from './Component/Signup'
import Navbar from './Component/Navbar'
import Home from './Component/Home'


function App() {


  return (
    <>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/signin' element={<Signin/>}></Route>
      </Routes>
        
    </>
  )
}

export default App

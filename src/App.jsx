import React from 'react'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Signin from './Component/Signin'
import Signup from './Component/Signup'
import Navbar from './Component/Navbar'
import Home from './Component/Home'
import Login from './Component/Signin'
// import ApplyForm from './Pages/ApplyForm'
import AdminDashboard from './Pages/AdminDashboard'
import Footer from './Component/Footer'
import ArmyPoliceTraining from './Pages/ArmyPoliceTraining'
import AdminSignup from './Component/AdminSignup'
import AdminSignin from './Component/AdminSignin'
import AdminPanel from './Component/AdminPanel'
import Registration from './Component/Registration'
import PhysicalFitness from './Pages/PhysicalFitness'
import ContactUs from './Component/ContactUs'


function App() {


  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/signin' element={<Signin/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Registration/>}></Route>
        <Route path='/contact' element={<ContactUs/>}></Route>
        {/* <Route path='/apply' element={<ApplyForm/>}></Route> */}
        <Route path='/admindashboard' element={<AdminDashboard/>}></Route>
        <Route path='/adminsignup' element={<AdminSignup/>}></Route>
        <Route path='/adminsignin' element={<AdminSignin/>}></Route>
        <Route path='/adminpanel' element={<AdminPanel/>}></Route>

        <Route path='/armypolice' element={<ArmyPoliceTraining/>}></Route>
        <Route path='/physicalFitness' element={<PhysicalFitness/>}></Route>
      </Routes>
        <Footer/>
    </>
  )
}

export default App

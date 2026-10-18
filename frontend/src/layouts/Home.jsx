import React from 'react'
import "./HomeStyle.css"
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import PopuarCourses from '../components/PopuarCourses'
import ContactUs from '../components/ContactUs'
import Feedback from '../components/Feedback'
import Footer from '../components/Footer'
import AdminLogin from '../components/AdminLogin'


const Home = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <PopuarCourses/>
      <ContactUs/>
      <Feedback/>
      <Footer/>
    </div>
  )
}

export default Home

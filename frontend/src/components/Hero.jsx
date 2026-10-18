import React from 'react'
import vid from "../assets/bg-content/video2.mp4"
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate();

  // Check karte hain ki student logged in hai ya nahi
  const isStudentLoggedIn = localStorage.getItem("isStudentLoggedIn") === "true";

  return (
    <div className='vid'>
      <video autoPlay muted loop playsInline width="100%">
        <source src={vid} type="video/mp4"/>
      </video>
      
      {/* Overlay ka color default (neela) hi rahega */}
      <div className="vid-overly"></div>

      <div className="vid-content">
        <h1>Knowledge Zone</h1>
        <span>Learn and Implements</span>

        {/* Agar logged in hai toh Profile button green color ke sath dikhega */}
        {isStudentLoggedIn ? (
          <button 
            className='btn' 
            style={{ backgroundColor: '#16a34a', boxShadow: '0 4px 15px rgba(22, 163, 74, 0.4)' }}
            onClick={() => navigate('/student/profile')}
          >
            Profile
          </button>
        ) : (
          <button className='btn' onClick={() => navigate('/student/signup')}>
            Get Started
          </button>
        )}
      </div>
    </div>
  )
}

export default Hero;
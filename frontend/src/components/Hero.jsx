import React from 'react'
import vid from "../assets/bg-content/video2.mp4"
import { useNavigate } from 'react-router-dom'
import {API_BASE_URL} from '../apiConfig'

const Hero = () => {
  const navigate = useNavigate();

  const isStudentLoggedIn = localStorage.getItem("isStudentLoggedIn") === "true";

  return (
    <div className='vid'>
      <video autoPlay muted loop playsInline width="100%">
        <source src={vid} type="video/mp4"/>
      </video>
      
      <div className="vid-overly"></div>

      <div className="vid-content">
        <h1>Knowledge Zone</h1>
        <span>Learn and Implements</span>

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
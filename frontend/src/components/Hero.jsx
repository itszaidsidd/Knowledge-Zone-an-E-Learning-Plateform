import React from 'react'

import vid from "../assets/bg-content/video2.mp4"

const Hero = () => {
  
  return (
    <div className='vid'>
      <video autoPlay muted loop playsInline width="100%">
        <source src={vid} type="video/mp4"/>
      </video>
      <div className="vid-overly">
      </div>
      <div className="vid-content">
        <h1>Knowledge Zone</h1>
        <span>Learn and Implemnts</span>
        <button className='btn'>Get Started</button>
      </div>
    </div>
  )
}

export default Hero

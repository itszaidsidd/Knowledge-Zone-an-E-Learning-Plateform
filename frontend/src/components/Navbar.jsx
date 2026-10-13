import React from 'react'

const Navbar = () => {
  return (
    <nav className=''>
      <div className="logo">
        <div className='title'>Knowledge Zone</div>
        <span className=''>Learn and Implements</span>
      </div>
      <ul className=''>
        <li><a href="/">Home</a></li>
        <li><a href="/">Courses</a></li>
        <li><a href="/">Payment Status</a></li>
        <li><a href="/">Login</a></li>
        <li><a href="/">Sign up</a></li>
        <li><a href="/">Feedback</a></li>
        <li><a href="/">Contact</a></li>
      </ul>
    </nav>
  )
}

export default Navbar

import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className=''>
      <div className="logo">
        <div className='title'>Knowledge Zone</div>
        <span className=''>Learn and Implements</span>
      </div>
      <ul className=''>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/">Courses</Link></li>
        <li><Link to="/">Payment Status</Link></li>
        <li><Link to="/">Login</Link></li>
        <li><Link to="/">Sign up</Link></li>
        <li><Link to="/">Feedback</Link></li>
        <li><Link to="/">Contact</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { HashLink } from 'react-router-hash-link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const isStudentLoggedIn = localStorage.getItem("isStudentLoggedIn") === "true";

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isStudentLoggedIn");
    localStorage.removeItem("studentId");
    localStorage.removeItem("studentUsername");
    localStorage.removeItem("studentName");
    navigate('/');
    window.location.reload(); 
  };

  return (
    <nav>
      <div className="logo">
        <div className='title' onClick={()=>{navigate('/')}}>Knowledge Zone</div>
        <span className='subtitle'>Learn and Implements</span>
      </div>

      <div className="menu-toggle" onClick={toggleMenu}>
        {isOpen ? <RiCloseLine /> : <RiMenu3Line />}
      </div>

      <ul className={isOpen ? "open" : ""}>
        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
        <li><Link to="/courses" onClick={closeMenu}>Courses</Link></li>
        <li><Link to="/payment-status" onClick={closeMenu}>Payment Status</Link></li>

        {isStudentLoggedIn ? (
          <>
            <li><Link to="/student/profile" onClick={closeMenu}>Profile</Link></li>
            <li><Link to="/student/profile" onClick={handleLogout}>Logout</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/student/login" onClick={closeMenu}>Login</Link></li>
            <li><Link to="/student/signup" onClick={closeMenu}>Sign up</Link></li>
          </>
        )}
        
        <li><HashLink smooth to="/#feedback" onClick={closeMenu}>Feedback</HashLink></li>
        <li><HashLink smooth to="/#contact-us" onClick={closeMenu}>Contact</HashLink></li>
      </ul>
    </nav>
  )
}

export default Navbar;
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Check karte hain ki student logged in hai ya nahi
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
    window.location.reload(); // Page refresh karke navbar state update karne ke liye
  };

  return (
    <nav>
      <div className="logo">
        <div className='title'>Knowledge Zone</div>
        <span className='subtitle'>Learn and Implements</span>
      </div>

      {/* Mobile Menu Toggle Icon */}
      <div className="menu-toggle" onClick={toggleMenu}>
        {isOpen ? <RiCloseLine /> : <RiMenu3Line />}
      </div>

      {/* Navigation Links */}
      <ul className={isOpen ? "open" : ""}>
        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
        <li><Link to="/" onClick={closeMenu}>Courses</Link></li>
        <li><Link to="/" onClick={closeMenu}>Payment Status</Link></li>

        {/* Agar Student Logged In hai toh Profile aur Logout dikhega, warna Login aur Sign up */}
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

        <li><Link to="/" onClick={closeMenu}>Feedback</Link></li>
        <li><Link to="/" onClick={closeMenu}>Contact</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar;
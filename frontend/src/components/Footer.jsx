import React from 'react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate=useNavigate()

  return (
    <div className='footer'>
        <p>Copyright &copy; 2025 || Designed By Zaid Siddiqui || <span onClick={()=>{navigate('/admin')}}>Admin Login</span></p>
    </div>
  )
}

export default Footer

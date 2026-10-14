import React from 'react'
import "./AdminStyle.css"

const Admin = () => {
  return (
    <div className='admin'>
       <header>
        <h1>Knowledge  Zone</h1>
        <h2>Admin Area</h2>
       </header>
       <div className="slider">
        <ul>
            <a href="/"><li>Dashboard</li></a>
            <a href="/"><li>Course</li></a>
            <a href="/"><li>Lessons</li></a>
            <a href="/"><li>Students</li></a>
            <a href="/"><li>Sell Report</li></a>
            <a href="/"><li>Payment Status</li></a>
            <a href="/"><li>Feedback</li></a>
            <a href="/"><li>Change Passowrd</li></a>
            <a href="/"><li>Logout</li></a>
        </ul>
       </div>
       <div className="container">
        
       </div>
    </div>
  )
}

export default Admin

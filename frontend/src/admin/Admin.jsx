import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Dashboard from './Dashboard'
import "./AdminStyle.css"
import Course from './Course'
import AddNewCourse from './AddNewCourse'

const Admin = () => {
  return (
    <div className='admin'>
       <header>
        <h1>Knowledge  Zone</h1>
        <h2>Admin Area</h2>
       </header>
       <main>

       <div className="slider">
        <ul>
            <Link to="/admin"><li>Dashboard</li></Link>
            <Link to="/admin/course"><li>Course</li></Link>
            <Link to="/admin"><li>Lessons</li></Link>
            <Link to="/admin"><li>Students</li></Link>
            <Link to="/admin"><li>Sell Report</li></Link>
            <Link to="/admin"><li>Payment Status</li></Link>
            <Link to="/admin"><li>Feedback</li></Link>
            <Link to="/admin"><li>Change Passowrd</li></Link>
            <Link to="/"><li>Logout</li></Link>
        </ul>
       </div>
       <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="course" element={<Course/>} />
          <Route path="addnewcourse" element={<AddNewCourse/>} />
        {/* <Dashboard/> */}
        {/* <Course/> */}
        {/* <AddNewCourse/> */}
        </Routes>
       </div>
       </main>
    </div>
  )
}

export default Admin

import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Dashboard from './Dashboard'
import "./AdminStyle.css"
import Course from './Course'
import AddNewCourse from './AddNewCourse'
import UpdateCourse from './UpdateCourse'
import AddNewLesson from './AddNewLesson'
import Lesson from './Lesson'
import UpdateLesson from './UpdateLesson'

import { MdDashboard, MdBook, MdVideoLibrary, MdPeople, MdAssessment, MdPayment, MdFeedback, MdLock, MdLogout } from "react-icons/md";

const Admin = () => {
  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
  };

  return (
    <div className='admin'>
       <header>
        <h1>Knowledge Zone</h1>
        <h2>Admin Area</h2>
       </header>
       <main>

       <div className="slider">
        <ul>
            <Link to="/admin"><li><MdDashboard style={{marginRight: '8px'}} /> Dashboard</li></Link>
            <Link to="/admin/course"><li><MdBook style={{marginRight: '8px'}} /> Course</li></Link>
            <Link to="/admin/lesson"><li><MdVideoLibrary style={{marginRight: '8px'}} /> Lessons</li></Link>
            <Link to="/admin"><li><MdPeople style={{marginRight: '8px'}} /> Students</li></Link>
            <Link to="/admin"><li><MdAssessment style={{marginRight: '8px'}} /> Sell Report</li></Link>
            <Link to="/admin"><li><MdPayment style={{marginRight: '8px'}} /> Payment Status</li></Link>
            <Link to="/admin"><li><MdFeedback style={{marginRight: '8px'}} /> Feedback</li></Link>
            <Link to="/admin"><li><MdLock style={{marginRight: '8px'}} /> Change Password</li></Link>
            <Link to="/" onClick={handleLogout}><li><MdLogout style={{marginRight: '8px'}} /> Logout</li></Link>
        </ul>
       </div>
       <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="course" element={<Course/>} />
          <Route path="addnewcourse" element={<AddNewCourse/>} />
          <Route path="course/edit/:id" element={<UpdateCourse/>} />
          <Route path="lesson" element={<Lesson/>} />
          <Route path="addnewlesson" element={<AddNewLesson/>} />
          <Route path="lesson/edit/:id" element={<UpdateLesson/>} />
        </Routes>
       </div>
       </main>
    </div>
  )
}

export default Admin
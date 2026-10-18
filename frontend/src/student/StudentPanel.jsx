import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { FaUser, FaBook, FaComments, FaKey, FaSignOutAlt } from "react-icons/fa";
import StudentProfile from './StudentProfile';
import StudentCourses from './StudentCourses';
import StudentLessons from './StudentLessons';
import StudentFeedback from './StudentFeedback';
import StudentChangePassword from './StudentChangePassword';
import './StudentPanelStyle.css';

const StudentPanel = () => {
  const [student, setStudent] = useState({ name: '', username: '', designation: '', profilePicUrl: '' });
  const studentId = localStorage.getItem("studentId");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchStudentDetails = async () => {
      if (studentId) {
        try {
          let response = await fetch(`http://localhost:8080/student/${studentId}`);
          if (response.ok) {
            let data = await response.json();
            setStudent(data);
          } else {
            console.error("Failed to fetch student details");
          }
        } catch (err) {
          console.error("Error fetching student:", err);
        }
      }
    };

    fetchStudentDetails();
  }, [studentId]);

  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="student-dashboard">
      {/* Sidebar Navigation */}
      <div className="student-sidebar">
        <div className="student-avatar-container">
          <img 
            src={student?.profilePicUrl ? `http://localhost:8080${student.profilePicUrl}` : "https://via.placeholder.com/120"} 
            alt="Profile" 
            className="student-avatar" 
          />
          <h3>{student?.name || 'Student'}</h3>
        </div>

        <div className="sidebar-menu">
          <button 
            className={`sidebar-item ${isActive('/profile') ? 'active' : ''}`} 
            onClick={() => navigate('/student/profile')}
          >
            <FaUser /> Profile
          </button>
          <button 
            className={`sidebar-item ${isActive('/courses') || isActive('/lessons') ? 'active' : ''}`} 
            onClick={() => navigate('/student/courses')}
          >
            <FaBook /> My Courses
          </button>
          <button 
            className={`sidebar-item ${isActive('/feedback') ? 'active' : ''}`} 
            onClick={() => navigate('/student/feedback')}
          >
            <FaComments /> Feedback
          </button>
          <button 
            className={`sidebar-item ${isActive('/change-password') ? 'active' : ''}`} 
            onClick={() => navigate('/student/change-password')}
          >
            <FaKey /> Change Password
          </button>
          <button 
            className="sidebar-item logout-btn-sidebar" 
            onClick={() => {
              // localStorage.clear();
              navigate('/');
              window.location.reload();
            }}
          >
            <FaSignOutAlt /> Logout / Back
          </button>
        </div>
      </div>

      {/* Dynamic Nested Content Area */}
      <div className="student-content">
        <Routes>
          <Route path="profile" element={<StudentProfile student={student} />} />
          <Route path="courses" element={<StudentCourses />} />
          <Route path="lessons/:courseId" element={<StudentLessons />} />
          <Route path="feedback" element={<StudentFeedback />} />
          <Route path="change-password" element={<StudentChangePassword />} />
        </Routes>
      </div>
    </div>
  );
};

export default StudentPanel;
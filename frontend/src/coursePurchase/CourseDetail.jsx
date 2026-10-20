import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CoursePurchaseStyle.css';
import Navbar from "../components/Navbar"
import Footer from '../components/Footer'
import {API_BASE_URL} from '../apiConfig'

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        let courseRes = await fetch(`${API_BASE_URL}/course`);
        if (courseRes.ok) {
          let courses = await courseRes.json();
          let found = courses.find(c => c.id == courseId);
          if (found) setCourse(found);
        }

        let lessonRes = await fetch(`${API_BASE_URL}/lesson/course/${courseId}`);
        if (lessonRes.ok) {
          let lessonData = await lessonRes.json();
          setLessons(lessonData);
        }
      } catch (err) {
        console.error("Error fetching course details:", err);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const handleBuyNow = () => {
    const studentId = localStorage.getItem("studentId");
    const studentEmail = localStorage.getItem("studentUsername");

    if (!studentId || !studentEmail) {
      alert("Please login first to purchase the course!");
      navigate('/student/login');
    } else {
      navigate(`/checkout/${courseId}`, { state: { course } });
    }
  };

  if (!course) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading course details...</div>;

  return (
    <div>
      <Navbar />
      <div className="course-detail-container">
        <div className="course-detail-card">
          <img
            src={course.imgUrl ? course.imgUrl : "https://via.placeholder.com/250"}
            alt="Course"
            className="course-detail-img"
          />
          <div className="course-detail-info" style={{ flex: 1 }}>
            <h2>Course Name : {course.title}</h2>
            <p><strong>Description :</strong> {course.description}</p>
            <p><strong>Duration :</strong> {course.duration}</p>
            <p><strong>Price :</strong> <span style={{ textDecoration: 'line-through', color: '#94a3b8' }}>₹{course.originalPrice || 1700}</span> <span style={{ color: '#1e40af', fontWeight: 'bold' }}>₹{course.sellingPrice}</span></p>
            <button onClick={handleBuyNow} className="btn-buy-now">
              Buy Now
            </button>
          </div>
        </div>

        <div className="lessons-table-box">
          <table className="lessons-table">
            <thead>
              <tr>
                <th style={{ width: '120px' }}>Lesson No.</th>
                <th>Lesson Name</th>
              </tr>
            </thead>
            <tbody>
              {lessons.length > 0 ? (
                lessons.map((lesson, index) => (
                  <tr key={lesson.id}>
                    <td>{index + 1}</td>
                    <td className="lesson-title-cell">{lesson.title}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" style={{ textAlign: 'center', color: '#64748b' }}>No lessons available for this course.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default CourseDetail;
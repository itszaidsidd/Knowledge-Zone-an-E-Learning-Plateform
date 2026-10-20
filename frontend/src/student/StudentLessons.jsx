import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {API_BASE_URL} from '../apiConfig'


const StudentLessons = () => {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [courseTitle, setCourseTitle] = useState('');
  const [currentVideo, setCurrentVideo] = useState('');
  const navigate = useNavigate();

  

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        let lessonRes = await fetch(`${API_BASE_URL}/lesson/course/${courseId}`);
        if (lessonRes.ok) {
          let lessonData = await lessonRes.json();
          setLessons(lessonData);
          if (lessonData.length > 0 && lessonData[0].videoUrl) {
            setCurrentVideo(lessonData[0].videoUrl);
          }
        }

        let courseRes = await fetch(`${API_BASE_URL}/course`);
        if (courseRes.ok) {
          let courseData = await courseRes.json();
          const found = courseData.find(c => c.id == courseId);
          if (found) {
            setCourseTitle(found.title);
          }
        }
      } catch (err) {
        console.error("Error fetching lesson or course data:", err);
      }
    };

    fetchCourseData();
  }, [courseId]);

  return (
    <div className="content-box" style={{ maxWidth: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>{courseTitle ? `${courseTitle} - Lessons` : 'Course Lessons'}</h2>
        <button className="btn-primary-student" onClick={() => navigate('/student/courses')} style={{ background: '#64748b' }}>
          Back to Courses
        </button>
      </div>
      
      <div className="lesson-layout">
        <div className="lesson-sidebar">
          <h3>Lessons List</h3>
          {lessons.map(lesson => (
            <div 
              key={lesson.id} 
              className="lesson-item" 
              onClick={() => {
                if (lesson.videoUrl) {
                  setCurrentVideo(lesson.videoUrl);
                }
              }}
            >
              {lesson.title}
            </div>
          ))}
        </div>
        <div className="lesson-video-player">
          {currentVideo ? (
            <video controls src={currentVideo} key={currentVideo} autoPlay style={{ width: '100%', maxHeight: '500px' }} />
          ) : (
            <p style={{ color: '#fff' }}>No video available for this lesson</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentLessons;
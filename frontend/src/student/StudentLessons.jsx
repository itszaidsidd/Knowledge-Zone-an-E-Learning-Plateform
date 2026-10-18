import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const StudentLessons = () => {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [courseTitle, setCourseTitle] = useState('');
  const [currentVideo, setCurrentVideo] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // Fetch lessons for the course
        let lessonRes = await fetch(`http://localhost:8080/lesson/course/${courseId}`);
        if (lessonRes.ok) {
          let lessonData = await lessonRes.json();
          setLessons(lessonData);
          if (lessonData.length > 0) {
            setCurrentVideo(`http://localhost:8080${lessonData[0].videoUrl}`);
          }
        }

        // Fetch course details for the title
        let courseRes = await fetch(`http://localhost:8080/course`);
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
              onClick={() => setCurrentVideo(`http://localhost:8080${lesson.videoUrl}`)}
            >
              {lesson.title}
            </div>
          ))}
        </div>
        <div className="lesson-video-player">
          {currentVideo ? (
            <video controls src={currentVideo} key={currentVideo} autoPlay />
          ) : (
            <p style={{ color: '#fff' }}>No video available for this lesson</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentLessons;
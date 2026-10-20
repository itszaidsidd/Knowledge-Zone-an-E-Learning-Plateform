import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TiDocumentAdd } from "react-icons/ti";
import { MdEdit, MdDelete } from "react-icons/md";
import {API_BASE_URL} from '../apiConfig'

const Lesson = () => {
  const [lessons, setLessons] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        let res = await fetch(`${API_BASE_URL}/course`);
        let data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        let url = `${API_BASE_URL}/lesson`;
        if (selectedCourseId) {
          url = `${API_BASE_URL}/lesson/course/${selectedCourseId}`;
        }
        let response = await fetch(url);
        let result = await response.json();
        setLessons(result);
      } catch (error) {
        console.error('Error fetching lessons:', error);
      }
    };
    fetchLessons();
  }, [selectedCourseId]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      try {
        let response = await fetch(`${API_BASE_URL}/lesson/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setLessons(lessons.filter(item => item.id !== id));
        } else {
          console.error("Failed to delete lesson");
        }
      } catch (error) {
        console.error("Error deleting lesson:", error);
      }
    }
  };

  return (
    <div>
      <div className="course-filter-dropdown">
        <label>Filter by Course:</label>
        <select 
          value={selectedCourseId} 
          onChange={(e) => setSelectedCourseId(e.target.value)}
          style={{ padding: '8px 12px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '1rem', minWidth: '250px' }}
        >
          <option value="">-- All Courses (Show All Lessons) --</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      <table className='course-detail-table'>
        <caption>
          List of Lessons
        </caption>
        <tbody>
          <tr>
            <th>Lesson Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
          {
            lessons.length > 0 ? (
              lessons.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>
                      <button 
                        onClick={() => navigate(`/admin/lesson/edit/${item.id}`)}
                        title="Update"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#0284c7', marginRight: '10px' }}
                      >
                        <MdEdit />
                      </button>

                      <button 
                        onClick={() => handleDelete(item.id)} 
                        title="Delete"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#dc2626' }}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                  No lessons found for this course.
                </td>
              </tr>
            )
          }
        </tbody>
      </table>

      <div className="add-course">
        <Link to="/admin/addnewlesson" title="Add New Lesson">
          <TiDocumentAdd />
        </Link>
      </div>
    </div>
  );
};

export default Lesson;
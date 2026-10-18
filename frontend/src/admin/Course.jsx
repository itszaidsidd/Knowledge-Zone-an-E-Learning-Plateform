import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TiDocumentAdd } from "react-icons/ti";
import { MdEdit, MdDelete } from "react-icons/md";

const Course = () => {
  const [course, setCourse] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let fetchCourses = async () => {
      try {
        let result = await fetch('http://localhost:8080/course', {
          method: 'get'
        });
        result = await result.json();
        setCourse(result);
      } catch (error) {
        console.error('Error during find ', error);
      }
    };
    fetchCourses();
  }, []);

  // Delete course function
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        let response = await fetch(`http://localhost:8080/course/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          //Remove from UI
          setCourse(course.filter(item => item.id !== id));
        } else {
          console.error("Failed to delete course");
        }
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  return (
    <div>
      <table className='course-detail-table'>
        <caption>
          List of Courses
        </caption>
        <tbody>
          <tr>
            <th>Course Id</th>
            <th>Name</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
          {
            course.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.author}</td>
                  <td>
                    {/* Update Icon Button */}
                    
                    <button 
                      onClick={() => navigate(`/admin/course/edit/${item.id}`)}
                      title="Update"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#0284c7', marginRight: '10px' }}
                    >
                      <MdEdit />
                    </button>

                    {/* Delete Icon Button */}
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
          }
        </tbody>
      </table>
      <div className="add-course">
        <Link to="/admin/addnewcourse" title="Add New Course">
          <TiDocumentAdd />
        </Link>
      </div>
    </div>
  );
};

export default Course;
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TiDocumentAdd } from "react-icons/ti";
import { MdEdit, MdDelete } from "react-icons/md";

const Student = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let fetchStudents = async () => {
      try {
        let result = await fetch('http://localhost:8080/student/all', {
          method: 'GET'
        });
        result = await result.json();
        setStudents(result);
      } catch (error) {
        console.error('Error during fetching students:', error);
      }
    };
    fetchStudents();
  }, []);

  // Delete student function
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        let response = await fetch(`http://localhost:8080/student/delete/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          // Remove from UI
          setStudents(students.filter(item => item.id !== id));
        } else {
          console.error("Failed to delete student");
        }
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  return (
    <div>
      <table className='course-detail-table'>
        <caption>
          List of Students
        </caption>
        <tbody>
          <tr>
            <th>Student Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
          {
            students.length > 0 ? (
              students.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name || item.username}</td>
                    <td>{item.email || item.username}</td>
                    <td>
                      {/* Update Icon Button */}
                      <button 
                        onClick={() => navigate(`/admin/student/edit/${item.id}`)}
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
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>
                  No students found.
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
      <div className="add-course">
        <Link to="/admin/addnewstudent" title="Add New Student">
          <TiDocumentAdd />
        </Link>
      </div>
    </div>
  );
};

export default Student;
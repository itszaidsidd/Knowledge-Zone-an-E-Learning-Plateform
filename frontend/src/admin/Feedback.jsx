import React, { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        let response = await fetch('http://localhost:8080/feedback/all', {
          method: 'GET'
        });
        if (response.ok) {
          let result = await response.json();
          setFeedbacks(result);
        } else {
          console.error("Failed to fetch feedbacks");
        }
      } catch (error) {
        console.error('Error during fetching feedbacks:', error);
        setError("Failed to load feedbacks.");
      }
    };
    fetchFeedbacks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      try {
        let response = await fetch(`http://localhost:8080/feedback/delete/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setFeedbacks(feedbacks.filter(item => item.id !== id));
        } else {
          let errText = await response.text();
          console.error("Failed to delete feedback:", errText);
        }
      } catch (error) {
        console.error("Error deleting feedback:", error);
      }
    }
  };

  return (
    <div>
      {error && <p style={{ color: '#dc2626', marginBottom: '15px' }}>{error}</p>}
      
      <table className='course-detail-table'>
        <caption>
          Student Feedbacks
        </caption>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Student Name</th>
            <th>Email / Username</th>
            <th>Designation</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
          {
            feedbacks.length > 0 ? (
              feedbacks.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.student ? item.student.name : "N/A"}</td>
                    <td>{item.student ? item.student.username : "N/A"}</td>
                    <td>{item.student ? item.student.designation : "N/A"}</td>
                    <td>{item.message}</td>
                    <td>
                      <button 
                        onClick={() => handleDelete(item.id)} 
                        title="Delete Feedback"
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
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>
                  No feedbacks found.
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
};

export default Feedback;
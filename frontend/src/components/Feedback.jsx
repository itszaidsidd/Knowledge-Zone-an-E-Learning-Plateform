import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState('');

  // Backend database se feedbacks fetch karna
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        let response = await fetch('http://localhost:8080/feedback/all', {
          method: 'GET'
        });
        
        if (response.ok) {
          let data = await response.json();
          setFeedbacks(data);
        } else {
          setError("Failed to load student feedbacks.");
        }
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
        setError("Something went wrong while loading feedbacks.");
      }
    };

    fetchFeedbacks();
  }, []);

  // Carousel Next/Prev handlers (Fixed typos and logic)
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? feedbacks.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === feedbacks.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className='feedback-section' id="feedback">
      <h2 className="feedback-main-title">Student's Feedback</h2>
      
      {error && <div className='error-alert'>{error}</div>}

      <div className="feedback-carousel-container">
        {
          feedbacks.length > 0 ? (
            <>
              <div className="feedback-cards-wrapper">
                {feedbacks.map((item, index) => {
                  const studentName = item.studentName || item.name || item.student?.name || "Student";
                  const designation = item.designation || item.role || item.student?.designation || "Student";
                  const message = item.feedbackText || item.message || item.comment || "";
                  
                  const imgUrl =  `http://localhost:8080${item.student.profilePicUrl}`;

                  return (
                    <div 
                      className={`feedback-card ${index === currentIndex ? 'active' : ''}`} 
                      key={item.id || index}
                    >
                      <div className="feedback-message-box">
                        <p>{message}</p>
                      </div>
                      
                      <div className="feedback-student-info">
                        <div className="student-avatar">
                          {imgUrl ? (
                            <img src={imgUrl} alt={studentName} />
                          ) : (
                            <div className="avatar-placeholder">{studentName.charAt(0)}</div>
                          )}
                        </div>
                        <h3 className="student-name">{studentName}</h3>
                        <p className="student-designation">{designation}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Carousel Navigation Buttons */}
              {feedbacks.length > 1 && (
                <div className="feedback-nav-buttons">
                  <button onClick={handlePrev} className="nav-arrow-btn">
                    <FaChevronLeft />
                  </button>
                  <button onClick={handleNext} className="nav-arrow-btn">
                    <FaChevronRight />
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="no-feedback-text">No feedbacks available yet.</p>
          )
        }
      </div>
    </div>
  );
};

export default Feedback;
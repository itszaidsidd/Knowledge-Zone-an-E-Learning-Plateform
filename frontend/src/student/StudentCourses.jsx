import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const StudentCourses = () => {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const navigate = useNavigate();
  const { register, watch } = useForm({ defaultValues: { searchQuery: '' } });
  
  const searchQuery = watch("searchQuery");
  const studentEmail = localStorage.getItem("studentUsername");

  useEffect(() => {
    const fetchStudentCourses = async () => {
      console.log("Logged-in Student Username from localStorage:", studentEmail);
      
      if (!studentEmail) {
        console.warn("Student username/email not found in localStorage!");
        return;
      }

      try {
        // 1. Fetch student orders by username/email
        let orderRes = await fetch(`http://localhost:8080/order/student-orders/${studentEmail}`);
        if (!orderRes.ok) {
          console.error("Failed to fetch student orders");
          return;
        }
        let orders = await orderRes.json();
        console.log("Fetched Orders for student:", orders);
        
        // Extract purchased course IDs (String/Number safe conversion)
        let purchasedCourseIds = orders.map(order => Number(order.courseId));
        console.log("Purchased Course IDs:", purchasedCourseIds);

        // 2. Fetch all courses
        let courseRes = await fetch(`http://localhost:8080/course`);
        if (!courseRes.ok) {
          console.error("Failed to fetch all courses");
          return;
        }
        let allCourses = await courseRes.json();
        console.log("All Courses from server:", allCourses);

        // 3. Filter only purchased courses
        let myCourses = allCourses.filter(course => purchasedCourseIds.includes(Number(course.id)));
        console.log("Matched Purchased Courses:", myCourses);
        
        setPurchasedCourses(myCourses);

      } catch (err) {
        console.error("Error fetching purchased courses:", err);
      }
    };

    fetchStudentCourses();
  }, [studentEmail]);

  // Search filter logic
  const filteredCourses = purchasedCourses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="content-box" style={{ maxWidth: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>My Purchased Courses</h2>
        
        {/* React Hook Form Search Input */}
        <input 
          type="text" 
          placeholder="Search my courses..." 
          {...register("searchQuery")}
          style={{ padding: '8px 12px', width: '250px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
        />
      </div>

      {filteredCourses.length > 0 ? (
        filteredCourses.map(course => (
          <div key={course.id} className="course-card-item">
            <img src={course.imgUrl ? `http://localhost:8080${course.imgUrl}` : ""} alt="Course" />
            <div className="course-info" style={{ flex: 1 }}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <p><strong>Duration:</strong> {course.duration} | <strong>Price:</strong> ₹{course.sellingPrice}</p>
            </div>
            <button className="btn-primary-student" onClick={() => navigate(`/student/lessons/${course.id}`)}>
              Watch Course
            </button>
          </div>
        ))
      ) : (
        <p style={{ color: '#64748b', textAlign: 'center', padding: '20px' }}>You have not purchased any courses yet.</p>
      )}
    </div>
  );
};

export default StudentCourses;
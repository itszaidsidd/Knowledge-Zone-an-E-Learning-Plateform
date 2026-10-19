import React, { useEffect, useState } from 'react';
import Card from './Card';
import { FaBookReader, FaChalkboardTeacher, FaInfinity, FaShieldAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const PopularCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate=useNavigate()

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        let response = await fetch('http://localhost:8080/course');
        if (response.ok) {
          let data = await response.json();
          setCourses(data);
        }
      } catch (error) {
        console.error("Error fetching popular courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const displayedCourses = courses.slice(0, 8);

  return (
    <div className='popular-courses'>
      <div className="tag-line">
        <ul>
          <li><FaBookReader className="tag-icon" /> 100+ Online Courses</li>
          <li><FaChalkboardTeacher className="tag-icon" /> Expert Instructions</li>
          <li><FaInfinity className="tag-icon" /> Lifetime Access</li>
          <li><FaShieldAlt className="tag-icon" /> Money Back Guaranteed</li>
        </ul>
      </div>
      
      <h1>Popular Courses</h1>
      
      <div className="cards">
        {
          displayedCourses.length > 0 ? (
            displayedCourses.map((course) => (
              <Card 
                key={course.id}
                id={course.id}
                title={course.title} 
                content={course.description} 
                cardImg={course.imgUrl ? `http://localhost:8080${course.imgUrl}` : ""} 
                price={course.sellingPrice} 
                originalPrice={course.originalPrice}
              />
            ))
          ) : (
            <p className="no-courses-text">No courses available right now.</p>
          )
        }
      </div>
      
      <button className="btn-view" onClick={()=>{navigate('/courses')}}>View All Courses</button>
    </div>
  )
}

export default PopularCourses;
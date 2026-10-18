import React, { useEffect, useState } from 'react'
import Card from './Card'

const PopuarCourses = () => {
  const [courses, setCourses] = useState([]);

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
            <li>100+ Online Courses</li>
            <li>Expert Instructions</li>
            <li>Lifetime Access</li>
            <li>Money Back Guarted</li>
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
            <p style={{ textAlign: 'center', width: '100%', color: '#64748b' }}>No courses available right now.</p>
          )
        }
      </div>
      
      <button className="btn-view">View All Courses</button>
    </div>
  )
}

export default PopuarCourses;
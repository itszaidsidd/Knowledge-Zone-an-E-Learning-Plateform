import React, { useEffect, useState } from 'react';
// import Card from './Card';
import Card from '../components/Card'
import { FaBookReader, FaChalkboardTeacher, FaInfinity, FaShieldAlt } from "react-icons/fa";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Courses = () => {
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

      const displayedCourses = courses.slice();

    return (
        <>
            <Navbar />
            <div className='popular-courses' style={{marginTop:"100px"}}>

                <h1>All Courses</h1>

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

            </div>
            <Footer />
        </>
    )
}

export default Courses;
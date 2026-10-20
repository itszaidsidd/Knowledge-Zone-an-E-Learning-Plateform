import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {API_BASE_URL} from '../apiConfig'

const AddNewLesson = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting},
  } = useForm();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        let res = await fetch(`${API_BASE_URL}/course`);
        let data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const onSubmit = async (data) => {
    const lessonData = {
      title: data.title,
      description: data.description,
      videoUrl: "", 
      courseId: Number(data.courseId)
    };

    console.log("Sending Lesson Data:", lessonData);

    try {
      let response = await fetch(`${API_BASE_URL}/lesson`, {
        method: 'POST',
        body: JSON.stringify(lessonData),
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        console.error("Lesson saving failed!");
        return;
      }

      let savedLesson = await response.json();
      let lessonId = savedLesson.id;
      console.log("Lesson saved successfully with ID:", lessonId);

      if (data.videoFile && data.videoFile[0]) {
        const formData = new FormData();
        formData.append("file", data.videoFile[0]);

        let videoResponse = await fetch(`${API_BASE_URL}/lesson/${lessonId}/upload-video`, {
          method: 'POST',
          body: formData 
        });

        let videoResultText = await videoResponse.text();
        console.log(videoResultText);
      }

      navigate('/admin/lesson'); 

    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  return (
    <div className='add-new-course'>
      <h1>Add New Lesson</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        
        Select Course
        <select {...register('courseId', { required: true })} required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
          <option value="">-- Choose Course --</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>

        Lesson Title
        <input type="text" {...register('title', { required: true })} required placeholder="Enter lesson title" />
        
        Lesson Description
        <textarea {...register('description', { required: true })} required placeholder="Enter lesson description"></textarea>
        
        Video File
        <input type="file" {...register('videoFile', { required: true })} required accept="video/*" />
        
        <div className="btns">
          <button type="submit" className='submit' disabled={isSubmitting}>
            {isSubmitting?'Uploading':'Submit'}
            </button>
          <button type="button" className='close' disabled={isSubmitting} onClick={() => navigate("/admin/lesson")}>Close</button>
        </div>
      </form>
    </div>
  )
}

export default AddNewLesson;
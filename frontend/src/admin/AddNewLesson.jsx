import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const AddNewLesson = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // 1. Courses ki list fetch karna dropdown ke liye
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        let res = await fetch('http://localhost:8080/course');
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
      videoUrl: "", // Shuru me empty rahega, upload hone ke baad update hoga
      courseId: Number(data.courseId)
    };

    console.log("Sending Lesson Data:", lessonData);

    try {
      // Step 2: Pehle Lesson ka JSON data save karein aur ID prapt karein
      let response = await fetch('http://localhost:8080/lesson', {
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

      // Step 3: Agar video file select ki gayi hai, toh use upload-video par bhejein
      if (data.videoFile && data.videoFile[0]) {
        const formData = new FormData();
        formData.append("file", data.videoFile[0]);

        let videoResponse = await fetch(`http://localhost:8080/lesson/${lessonId}/upload-video`, {
          method: 'POST',
          body: formData 
        });

        let videoResultText = await videoResponse.text();
        console.log(videoResultText);
      }

      // Complete hone ke baad lessons list page par redirect karein
      navigate('/admin/lesson'); // Agar aapka route /admin/lessons hai

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
          <button type="submit" className='submit'>Submit</button>
          <button type="button" className='close' onClick={() => navigate("/admin/lessons")}>Close</button>
        </div>
      </form>
    </div>
  )
}

export default AddNewLesson;
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateLesson = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Lesson ka purana data fetch karke form me reset karna
  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        let response = await fetch(`http://localhost:8080/lesson/${id}`);
        if (response.ok) {
          let lesson = await response.json();
          reset({
            title: lesson.title,
            description: lesson.description,
            courseId: lesson.courseId,
          });
        }
      } catch (error) {
        console.error("Error fetching lesson data:", error);
      }
    };

    fetchLessonData();
  }, [id, reset]);

  const onSubmit = async (data) => {
    const updatedLessonData = {
      title: data.title,
      description: data.description,
      courseId: Number(data.courseId),
    };

    console.log("Updating Lesson Data:", updatedLessonData);

    try {
      // Step 1: Lesson ka text/JSON data update karein
      let response = await fetch(`http://localhost:8080/lesson/${id}`, {
        method: 'PUT', 
        body: JSON.stringify(updatedLessonData),
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        console.error("Lesson update failed!");
        return;
      }

      // Step 2: Agar user ne nayi video file select ki hai, toh use upload-video par bhejein
      if (data.videoFile && data.videoFile[0]) {
        const formData = new FormData();
        formData.append("file", data.videoFile[0]);

        let videoResponse = await fetch(`http://localhost:8080/lesson/${id}/upload-video`, {
          method: 'POST',
          body: formData 
        });

        let videoResultText = await videoResponse.text();
        console.log(videoResultText);
      }

      navigate('/admin/lesson'); // Ya apne lessons list page ka route yahan dein

    } catch (error) {
      console.error("Error during update:", error);
    }
  }

  return (
    <div className='add-new-course'>
      <h1>Update Lesson</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        
        {/* Note: Agar aap courseId change nahi karne dena chahte, toh ise readonly ya hidden bhi rakh sakte hain */}
        Course ID
        <input type="number" {...register('courseId', { required: true })} required readOnly style={{ backgroundColor: '#e5e7eb', cursor: 'not-allowed' }} />
        
        Lesson Title
        <input type="text" {...register('title', { required: true })} required placeholder="Enter lesson title" />
        
        Lesson Description
        <textarea {...register('description', { required: true })} required placeholder="Enter lesson description"></textarea>
        
        Video File (New Video upload if want to change)
        <input type="file" {...register('videoFile')} accept="video/*" />
        
        <div className="btns">
          <button type="submit" className='submit'>Update</button>
          <button type="button" className='close' onClick={() => navigate("/admin/lessons")}>Close</button>
        </div>
      </form>
    </div>
  )
}

export default UpdateLesson;
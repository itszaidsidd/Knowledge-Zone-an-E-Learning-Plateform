import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import {API_BASE_URL} from '../apiConfig'

const UpdateLesson = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors,isSubmitting },
  } = useForm();

  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        let response = await fetch(`${API_BASE_URL}/lesson/${id}`);
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
      let response = await fetch(`${API_BASE_URL}/lesson/${id}`, {
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

      if (data.videoFile && data.videoFile[0]) {
        const formData = new FormData();
        formData.append("file", data.videoFile[0]);

        let videoResponse = await fetch(`${API_BASE_URL}/lesson/${id}/upload-video`, {
          method: 'POST',
          body: formData 
        });

        let videoResultText = await videoResponse.text();
        console.log(videoResultText);
      }

      navigate('/admin/lesson'); 

    } catch (error) {
      console.error("Error during update:", error);
    }
  }

  return (
    <div className='add-new-course'>
      <h1>Update Lesson</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        
        Course ID
        <input type="number" {...register('courseId', { required: true })} required readOnly style={{ backgroundColor: '#e5e7eb', cursor: 'not-allowed' }} />
        
        Lesson Title
        <input type="text" {...register('title', { required: true })} required placeholder="Enter lesson title" />
        
        Lesson Description
        <textarea {...register('description', { required: true })} required placeholder="Enter lesson description"></textarea>
        
        Video File (New Video upload if want to change)
        <input type="file" {...register('videoFile')} accept="video/*" />
        
        <div className="btns">
          <button type="submit" className='submit' disabled={isSubmitting}>
            {isSubmitting?'Uploading':'Update'}
            </button>
          <button type="button" className='close' disabled={isSubmitting} onClick={() => navigate("/admin/lesson")}>Close</button>
        </div>
      </form>
    </div>
  )
}

export default UpdateLesson;
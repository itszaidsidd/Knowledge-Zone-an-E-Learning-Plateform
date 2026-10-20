import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import {API_BASE_URL} from '../apiConfig'

const UpdateCourse = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    console.log(id)
    const fetchCourseData = async () => {
      try {
        let response = await fetch(`${API_BASE_URL}/course/${id}`);
        if (response.ok) {
          let course = await response.json();
          reset({
            title: course.title,
            description: course.description,
            author: course.author,
            duration: course.duration,
            originalPrice: course.originalPrice,
            sellingPrice: course.sellingPrice,
          });
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, [id, reset]);

  const onSubmit = async (data) => {
    const updatedCourseData = {
      title: data.title,
      description: data.description,
      author: data.author,
      duration: data.duration,
      originalPrice: Number(data.originalPrice),
      sellingPrice: Number(data.sellingPrice),
    };

    console.log("Updating Course Data:", updatedCourseData);

    try {
      let response = await fetch(`${API_BASE_URL}/course/${id}`, {
        method: 'PUT', 
        body: JSON.stringify(updatedCourseData),
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        console.error("Course update failed!");
        return;
      }

      if (data.imgUrl && data.imgUrl[0]) {
        const formData = new FormData();
        formData.append("file", data.imgUrl[0]);

        let imageResponse = await fetch(`${API_BASE_URL}/course/${id}/upload-image`, {
          method: 'POST',
          body: formData 
        });

        let imageResultText = await imageResponse.text();
        console.log(imageResultText);
      }

      navigate('/admin/course');

    } catch (error) {
      console.error("Error during update:", error);
    }
  }

  return (
    
    <div className='add-new-course'>
      <h1>Update Course</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        Course Name
        <input type="text" {...register('title', { required: true })} required />
        
        Course Description
        <textarea {...register('description', { required: true })} id="" required></textarea>
        
        <table>
          <tbody>
            <tr>
              <td>Author</td>
              <td>Course Duration</td>
            </tr>
            <tr>
              <td><input type="text" {...register('author')} /></td>
              <td><input type="text" {...register('duration', { required: true })} required /></td>
            </tr>
            <tr>
              <td>Course Original Price</td>
              <td>Course Selling Price</td>
            </tr>
            <tr>
              <td><input type="number" {...register('originalPrice', { required: true })} required /></td>
              <td><input type="number" {...register('sellingPrice', { required: true })} required /></td>
            </tr>
          </tbody>
        </table>
        
        Course Image (New Image upload if want to change)
        <input type="file" {...register('imgUrl')} />
        
        <div className="btns">
          <button type="submit" className='submit' disabled={isSubmitting}>
            {isSubmitting?'Uploading':'Update'}
            </button>
          <button type="button" className='close' disabled={isSubmitting} onClick={() => navigate("/admin/course")}>Close</button>
        </div>
      </form>
    </div>
  )
}

export default UpdateCourse;
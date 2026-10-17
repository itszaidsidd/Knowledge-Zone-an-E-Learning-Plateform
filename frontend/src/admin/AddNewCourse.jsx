import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

const AddNewCourse = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    const courseData = {
      title: data.title,
      description: data.description,
      author: data.author,
      duration: data.duration,
      originalPrice: Number(data.originalPrice),
      sellingPrice: Number(data.sellingPrice),
      imgUrl: "" 
    };

    console.log("Sending Course Data:", courseData);

    try {
      let response = await fetch('http://localhost:8080/course', {
        method: 'POST',
        body: JSON.stringify(courseData),
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        console.error("Course saving failed!");
        return;
      }

      let savedCourse = await response.json();
      let courseId = savedCourse.id;
      console.log("Course saved successfully with ID:", courseId);

      if (data.imgUrl && data.imgUrl[0]) {
        const formData = new FormData();
        formData.append("file", data.imgUrl[0]);

        let imageResponse = await fetch(`http://localhost:8080/course/${courseId}/upload-image`, {
          method: 'POST',
          body: formData 
        });

        let imageResultText = await imageResponse.text();
        console.log(imageResultText);
      }

      navigate('/admin/course');

    } catch (error) {
      console.error("Error during submission:", error);
    }
  }

  return (
    <div className='add-new-course'>
      <h1>Add New Course</h1>
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
        Course Image
        <input type="file" {...register('imgUrl', { required: true })} required />
        <div className="btns">
          <button type="submit" className='submit'>Submit</button>
          <button type="button" className='close' onClick={() => navigate("/admin/course")}>Close</button>
        </div>
      </form>
    </div>
  )
}

export default AddNewCourse

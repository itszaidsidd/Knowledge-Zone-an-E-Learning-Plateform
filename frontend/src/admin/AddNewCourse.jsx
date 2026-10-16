import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

const AddNewCourse = () => {
    const navigate=useNavigate();
    
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit=async(data)=>{
    const courseData = {
    title: data.title,
    description: data.description,
    author: data.author,
    duration: data.duration,
    originalPrice: Number(data.originalPrice), 
    sellingPrice: Number(data.sellingPrice),
    imgUrl: data.imgUrl && data.imgUrl[0] ? data.imgUrl[0].name : "" 
  };

  console.log("Sending Data:", courseData);
    let result = await fetch('http://localhost:8080/course',{
      method:'post',
      body:JSON.stringify(courseData),
      headers:{
        'Content-Type':'application/json'
      },
    })
    result = await result.text();
    console.log(result);
    navigate('/admin/course')
  }

  return (
    <div className='add-new-course'>
      <h1>Add New Course</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        Course Name
        <input type="text" {...register('title',{required:true})} required/>
        Course Description
        <textarea {...register('description',{required:true})} id="" required></textarea>
        <table>
            <tbody>
            <tr>
                <td>Author</td>
                <td>Course Duration</td>
            </tr>
            <tr>
                <td><input type="text" {...register('author')} /></td>
                
                <td><input type="text" {...register('duration',{required:true})} required /></td>
            </tr>
            <tr>
                <td>Course Original Price</td>
                <td>Course Selling Price</td>
            </tr>
            <tr>
                <td><input type="number" {...register('originalPrice',{required:true})} required /></td>
                <td><input type="number" {...register('sellingPrice',{required:true})} required /></td>
            </tr>
            </tbody>
        </table>
        Course Image
        <input type="file" {...register('imgUrl',{required:true})} required />
        <div className="btns">
            <button type="submit" className='submit'>Submit</button>
            <button type="button" className='close' onClick={()=>navigate("/admin/course")}>Close</button>
        </div>
      </form>
    </div>
  )
}

export default AddNewCourse

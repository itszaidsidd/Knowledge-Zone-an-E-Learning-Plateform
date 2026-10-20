import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {API_BASE_URL} from '../apiConfig'

const StudentProfile = ({ student: initialStudent }) => {
  const { register, 
    handleSubmit,
     setValue ,
     formState:{isSubmitting}
    } = useForm({
    defaultValues: {
      id: initialStudent?.id || '',
      username: initialStudent?.username || '',
      name: initialStudent?.name || '',
      designation: initialStudent?.designation || ''
    }
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    if (initialStudent) {
      setValue("id", initialStudent.id);
      setValue("username", initialStudent.username);
      setValue("name", initialStudent.name);
      setValue("designation", initialStudent.designation);
    }
  }, [initialStudent, setValue]);

  const onSubmit = async (data) => {
    try {
      let response = await fetch(`${API_BASE_URL}/student/update/${studentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: data.name, 
          designation: data.designation 
        })
      });

      if (response.ok) {
        if (selectedFile) {
          const formData = new FormData();
          formData.append("file", selectedFile);
          
          let picResponse = await fetch(`${API_BASE_URL}/student/upload-pic/${studentId}`, {
            method: 'POST',
            body: formData
          });

          if (!picResponse.ok) {
            console.error("Failed to upload profile picture");
          }
        }
        alert("Profile updated successfully!");
        window.location.reload();
      } else {
        alert("Failed to update profile");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="content-box">
      <h2>Student Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form-grid">
        <div className="form-group-student">
          <label>Student Id</label>
          <input type="text" {...register("id")} disabled />
        </div>

        <div className="form-group-student">
          <label>E-mail / Username</label>
          <input type="text" {...register("username")} disabled />
        </div>

        <div className="form-group-student">
          <label>Name</label>
          <input 
            type="text" 
            {...register("name", { required: "Name is required" })} 
          />
        </div>

        <div className="form-group-student">
          <label>Occupation / Designation</label>
          <input 
            type="text" 
            {...register("designation")} 
          />
        </div>

        <div className="form-group-student">
          <label>Profile Picture</label>
          <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
        </div>

        <button type="submit" disabled={isSubmitting} style={{background:isSubmitting?'gray':'blue'}} className="btn-primary-student">Update</button>
      </form>
    </div>
  );
};

export default StudentProfile;
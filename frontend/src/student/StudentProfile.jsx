import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const StudentProfile = ({ student: initialStudent }) => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      id: initialStudent?.id || '',
      username: initialStudent?.username || '',
      name: initialStudent?.name || '',
      designation: initialStudent?.designation || ''
    }
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const studentId = localStorage.getItem("studentId");

  // Jab initialStudent props update ho toh form values bhi sync ho jayein
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
      let response = await fetch(`http://localhost:8080/student/update/${studentId}`, {
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
          
          let picResponse = await fetch(`http://localhost:8080/student/upload-pic/${studentId}`, {
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

        <button type="submit" className="btn-primary-student">Update</button>
      </form>
    </div>
  );
};

export default StudentProfile;
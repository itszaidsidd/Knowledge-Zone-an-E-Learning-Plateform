import React from 'react';
import { useForm } from 'react-hook-form';
import {API_BASE_URL} from '../apiConfig'

const StudentChangePassword = () => {
  const { register, handleSubmit, reset } = useForm();
  const studentId = localStorage.getItem("studentId");

  const onSubmit = async (data) => {
    try {
      let res = await fetch(`${API_BASE_URL}/student/change-password/${studentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          oldPassword: data.oldPassword, 
          newPassword: data.newPassword 
        })
      });

      if (res.ok) {
        alert("Password changed successfully!");
        reset();
      } else {
        let msg = await res.text();
        alert(msg || "Incorrect old password");
      }
    } catch (err) {
      console.error("Error changing password:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="content-box">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form-grid">
        <div className="form-group-student">
          <label>Old Password</label>
          <input 
            type="password" 
            maxLength={8} 
            {...register("oldPassword", { required: "Old password is required", maxLength: 8 })} 
          />
        </div>

        <div className="form-group-student">
          <label>New Password (Max 8 chars)</label>
          <input 
            type="password" 
            maxLength={8} 
            {...register("newPassword", { required: "New password is required", maxLength: 8 })} 
          />
        </div>

        <button type="submit" className="btn-primary-student">Change Password</button>
      </form>
    </div>
  );
};

export default StudentChangePassword;
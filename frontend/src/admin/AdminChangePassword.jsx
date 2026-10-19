import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const AdminChangePassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Confirm password match karne ke liye new password watch karna
  const newPassword = watch("newPassword");

  const onSubmit = async (data) => {
    setError('');
    setSuccess('');

    const adminUsername = localStorage.getItem('adminUsername');

    if (!adminUsername) {
      setError("Admin session not found. Please login again.");
      return;
    }

    const passwordData = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };

    console.log("Changing password for Admin Username:", adminUsername);

    try {
      let response = await fetch(`http://localhost:8080/admin/change-password/${adminUsername}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(passwordData),
      });

      let resultText = await response.text();

      if (response.ok) {
        setSuccess(resultText || "Password changed successfully!");
        setTimeout(() => {
          navigate('/admin');
        }, 1500);
      } else {
        setError(resultText || "Failed to change password.");
      }

    } catch (err) {
      console.error("Error changing password:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className='add-new-course'>
      <h1>Change Admin Password</h1>
      
      {error && <div className='error-alert'>{error}</div>}
      {success && <div className='success-alert'>{success}</div>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Old Password</label>
          <input 
            type="password" 
            {...register('oldPassword', { required: "Old password is required" })} 
            required 
          />
          {errors.oldPassword && <span className="input-error">{errors.oldPassword.message}</span>}
        </div>

        <div>
          <label>New Password</label>
          <input 
            type="password" 
            {...register('newPassword', { 
              required: "New password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" }
            })} 
            required 
          />
          {errors.newPassword && <span className="input-error">{errors.newPassword.message}</span>}
        </div>

        <div>
          <label>Confirm New Password</label>
          <input 
            type="password" 
            {...register('confirmPassword', { 
              required: "Please confirm your password",
              validate: (value) => value === newPassword || "Passwords do not match"
            })} 
            required 
          />
          {errors.confirmPassword && <span className="input-error">{errors.confirmPassword.message}</span>}
        </div>

        <div className="btns">
          <button type="submit" className='submit'>Update Password</button>
          <button type="button" className='close' onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AdminChangePassword;
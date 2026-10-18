import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { IoArrowBack } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import './StudentAuth.css';

const StudentSignup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setError('');
    try {
      let response = await fetch('http://localhost:8080/student/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: data.name, 
          username: data.username, 
          password: data.password, 
          designation: data.designation 
        })
      });

      if (response.ok) {
        alert("Signup Successful! Please login.");
        navigate('/student/login');
      } else {
        let errMessage = await response.text();
        setError(errMessage || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="student-auth-container">
      <form onSubmit={handleSubmit(onSubmit)} className="student-auth-form">
        <button 
          type="button" 
          className="back-btn" 
          onClick={() => navigate('/')}
        >
          <IoArrowBack /> Back to Home
        </button>

        <h2>Student Signup</h2>
        
        {error && <p className="auth-error">{error}</p>}
        
        <div className="form-group">
          <label>Full Name</label>
          <input 
            type="text" 
            {...register("name", { required: "Name is required" })} 
          />
          {errors.name && <span style={{ color: '#f87171', fontSize: '12px' }}>{errors.name.message}</span>}
        </div>

        <div className="form-group">
          <label>Username / Email</label>
          <input 
            type="text" 
            {...register("username", { required: "Username is required" })} 
          />
          {errors.username && <span style={{ color: '#f87171', fontSize: '12px' }}>{errors.username.message}</span>}
        </div>

        <div className="form-group">
          <label>Designation (e.g. Student / Developer)</label>
          <input 
            type="text" 
            {...register("designation")} 
          />
        </div>

        <div className="form-group">
          <label>Password (Max 8 chars)</label>
          <div className="input-wrapper">
            <input 
              type={showPassword ? "text" : "password"} 
              maxLength={8}
              {...register("password", { 
                required: "Password is required", 
                maxLength: { value: 8, message: "Maximum length is 8 characters" } 
              })} 
            />
            <button 
              type="button" 
              className="password-toggle-btn" 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && <span style={{ color: '#f87171', fontSize: '12px' }}>{errors.password.message}</span>}
        </div>

        <button type="submit" className="auth-btn">Register</button>

        <p className="auth-redirect">
          Already have an account? <Link to="/student/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default StudentSignup;
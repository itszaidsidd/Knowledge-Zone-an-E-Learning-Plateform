import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {API_BASE_URL} from '../apiConfig'

const AdminLogin = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (response.ok) {
        localStorage.setItem("isAdminLoggedIn", "true");
        localStorage.setItem("adminUsername", data.username);
        
        navigate('/admin'); 
      } else {
        let errorText = await response.text();
        setErrorMessage(errorText || "Login failed! Check credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Server error. Please try again later.");
    }
  };

  return (
    <div className='admin-login'>
      <div>
        <h1>Admin Login</h1>
        
        {errorMessage && (
          <div className='error-alert'>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          Username / Email
          <input type="text" {...register('username', { required: true })} required placeholder="Enter admin email" />
          
          Password
          <div style={{ position: 'relative', width: '100%' }}>
            <input 
              type={showPassword ? "text" : "password"} 
              {...register('password', { required: true })} 
              required 
              placeholder="Enter password" 
              style={{ width: '100%', paddingRight: '40px' }}
            />
            <span 
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                color: '#64748b',
                fontSize: '18px'
              }}
              title={showPassword ? "Hide Password" : "Show Password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          
          <div className="btns" style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button type="submit" className='submit' style={{ width: '100%' }}>Login</button>
            
            <Link 
              to="/" 
              style={{ 
                textAlign: 'center', 
                textDecoration: 'none', 
                color: '#225470', 
                fontWeight: 'bold', 
                marginTop: '5px',
                fontSize: '15px' 
              }}
            >
              ← Back to Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
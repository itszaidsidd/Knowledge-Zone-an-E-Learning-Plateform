import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {API_BASE_URL} from '../apiConfig'

const AddNewStudent = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors,isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        setError('');
        const studentData = {
            name: data.name,
            username: data.username,
            password: data.password,
        };

        console.log("Sending Student Data:", studentData);

        try {
            let response = await fetch(`${API_BASE_URL}/student/signup`, {
                method: 'POST',
                body: JSON.stringify(studentData),
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok) {
                let resText = await response.text();
                console.log("Student saved successfully:", resText);
                navigate('/admin/student');
            } else {
                let errMessage = await response.text();
                console.error("Student saving failed:", errMessage);
                setError(errMessage || "Failed to add student.");
            }

        } catch (error) {
            console.error("Error during submission:", error);
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className='add-new-course'>
            <h1>Add New Student</h1>
            {error && <p style={{ color: '#dc2626', marginBottom: '15px', fontWeight: 'bold' }}>{error}</p>}
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Student Name</label>
                    <input type="text" {...register('name', { required: true })} required />
                </div>

                <div>
                    <label>Student Email / Username</label>
                    <input type="email" {...register('username', { required: true })} required />
                </div>

                <div>
                    <label>Password</label>
                    <input type="password" {...register('password', { required: true, maxLength: 8 })} maxLength={8} required />
                </div>

                <div className="btns">
                    <button type="submit" className='submit' disabled={isSubmitting}>
                        {isSubmitting?'Uploading':'Submit'}
                        </button>
                    <button type="button" className='close' disabled={isSubmitting} onClick={() => navigate("/admin/student")}>Close</button>
                </div>
            </form>
        </div>
    );
};

export default AddNewStudent;
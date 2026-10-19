import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateStudent = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        console.log("Student ID to update:", id);
        const fetchStudentData = async () => {
            try {
                let response = await fetch(`http://localhost:8080/student/${id}`);
                if (response.ok) {
                    let student = await response.json();
                    reset({
                        name: student.name,
                        username: student.username,
                        password: student.password,
                    });
                }
            } catch (error) {
                console.error("Error fetching student data:", error);
            }
        };

        fetchStudentData();
    }, [id, reset]);

    const onSubmit = async (data) => {
        setError('');
        const updatedStudentData = {
            name: data.name,
            username: data.username,
            password: data.password,
        };

        console.log("Updating Student Data:", updatedStudentData);

        try {
            let response = await fetch(`http://localhost:8080/student/update/${id}`, {
                method: 'PUT',
                body: JSON.stringify(updatedStudentData),
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok) {
                let resText = await response.text();
                console.log("Student updated successfully:", resText);
                navigate('/admin/student');
            } else {
                let errMessage = await response.text();
                console.error("Student update failed:", errMessage);
                setError(errMessage || "Failed to update student.");
            }

        } catch (error) {
            console.error("Error during student update:", error);
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className='add-new-course'>
            <h1>Update Student</h1>
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
                    <button type="submit" className='submit'>Update</button>
                    <button type="button" className='close' onClick={() => navigate("/admin/student")}>Close</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateStudent;
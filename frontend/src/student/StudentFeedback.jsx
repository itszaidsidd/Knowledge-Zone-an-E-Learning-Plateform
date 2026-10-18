import React from 'react';
import { useForm } from 'react-hook-form';

const StudentFeedback = () => {
  const { register, handleSubmit, reset } = useForm();
  const studentId = localStorage.getItem("studentId");

  const onSubmit = async (data) => {
    try {
      let res = await fetch(`http://localhost:8080/feedback/add/${studentId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: data.message })
      });

      if (res.ok) {
        alert("Feedback submitted successfully!");
        reset();
      } else {
        let errorMsg = await res.text();
        alert(errorMsg || "Failed to submit feedback");
      }
    } catch (err) {
      console.error("Error submitting feedback:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="content-box">
      <h2>Give Feedback</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form-grid">
        <div className="form-group-student">
          <label>Your Message / Feedback</label>
          <textarea 
            rows="5" 
            placeholder="Write your feedback here..." 
            {...register("message", { required: "Feedback message is required" })}
          ></textarea>
        </div>
        <button type="submit" className="btn-primary-student">Submit Feedback</button>
      </form>
    </div>
  );
};

export default StudentFeedback;
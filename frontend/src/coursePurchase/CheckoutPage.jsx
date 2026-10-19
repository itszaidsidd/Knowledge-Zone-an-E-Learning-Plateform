import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import './CoursePurchaseStyle.css';

const CheckoutPage = () => {
  const { register, handleSubmit, setValue } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course;
  
  const studentEmail = localStorage.getItem("studentUsername") || "user@gmail.com";
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrderId = async () => {
      try {
        let res = await fetch(`http://localhost:8080/order/generate-order-id`);
        if (res.ok) {
          let orderId = await res.text();
          setValue("orderId", orderId);
        }
      } catch (err) {
        console.error("Error generating order id:", err);
      }
    };

    fetchOrderId();
    setValue("studentEmail", studentEmail);
    setValue("amount", course?.sellingPrice || 700);
  }, [course, studentEmail, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // FIX: 'courseId' ki jagah 'course: { id: course?.id }' pass kiya hai
      let orderPayload = {
        orderId: data.orderId,
        studentEmail: data.studentEmail,
        amount: parseFloat(data.amount),
        course: {
          id: course?.id
        }
      };

      let res = await fetch(`http://localhost:8080/order/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      if (res.ok) {
        navigate('/student/courses');
      } else {
        alert("Failed to process payment order.");
      }
    } catch (err) {
      console.error("Error saving order:", err);
      alert("Something went wrong during checkout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-wrapper">
      <div className="checkout-box">
        <h2>Welcome to E-Learning Payment Page</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="checkout-form-grid">
          <div className="checkout-form-group">
            <label>Order Id</label>
            <input type="text" {...register("orderId")} disabled />
          </div>

          <div className="checkout-form-group">
            <label>Student Email</label>
            <input type="text" {...register("studentEmail")} disabled />
          </div>

          <div className="checkout-form-group">
            <label>Amount</label>
            <input type="text" {...register("amount")} disabled />
          </div>

          <div className="checkout-btn-group">
            <button type="submit" disabled={loading} className="btn-checkout-submit">
              {loading ? "Processing..." : "Chekcout"}
            </button>
            <button type="button" onClick={() => navigate(-1)} className="btn-checkout-cancel">
              Cancel
            </button>
          </div>

          <p style={{ fontSize: '0.8rem', color: '#475569', textAlign: 'center', marginTop: '10px' }}>
            Note: Complete Payment by Checking by Checkout Button
          </p>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
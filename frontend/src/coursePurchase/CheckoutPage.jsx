import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import './CoursePurchaseStyle.css';
import { API_BASE_URL } from '../apiConfig';

const CheckoutPage = () => {
  const { register, handleSubmit, setValue } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course;
  
  const studentEmail = localStorage.getItem("studentUsername") || "user@gmail.com";
  const [loading, setLoading] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState(""); 

  useEffect(() => {
    const fetchOrderId = async () => {
      try {
        let res = await fetch(`${API_BASE_URL}/order/generate-order-id`);
        if (res.ok) {
          let orderId = await res.text();
          setGeneratedOrderId(orderId); 
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
      let orderPayload = {
        orderId: generatedOrderId, 
        studentEmail: studentEmail,
        amount: parseFloat(course?.sellingPrice || 700),
        course: {
          id: course?.id
        }
      };

      let res = await fetch(`${API_BASE_URL}/order/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      if (res.ok) {
        navigate('/payment-status', { 
          state: { 
            orderId: generatedOrderId, 
            amount: course?.sellingPrice || 700, 
            course: course,
            studentEmail: studentEmail 
          } 
        });
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
            <input type="text" {...register("orderId")} readOnly />
          </div>

          <div className="checkout-form-group">
            <label>Student Email</label>
            <input type="text" {...register("studentEmail")} readOnly />
          </div>

          <div className="checkout-form-group">
            <label>Amount</label>
            <input type="text" {...register("amount")} readOnly />
          </div>

          <div className="checkout-btn-group">
            <button type="submit" disabled={loading} className="btn-checkout-submit">
              {loading ? "Processing..." : "Checkout"}
            </button>
            <button type="button" onClick={() => navigate(-1)} className="btn-checkout-cancel">
              Cancel
            </button>
          </div>

          <p style={{ fontSize: '0.8rem', color: '#475569', textAlign: 'center', marginTop: '10px' }}>
            Note: Complete Payment by Clicking Checkout Button
          </p>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
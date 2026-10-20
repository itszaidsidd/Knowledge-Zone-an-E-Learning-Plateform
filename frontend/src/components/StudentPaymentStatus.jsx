import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './StudentPaymentStatusStyle.css';
import { MdSearch, MdPrint } from "react-icons/md";
import { API_BASE_URL } from '../apiConfig';
import { useLocation } from 'react-router-dom';

const StudentPaymentStatus = () => {
  const [orderIdInput, setOrderIdInput] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const passedOrderId = location.state?.orderId;
    if (passedOrderId) {
      setOrderIdInput(passedOrderId);
      fetchOrderDetailsDirectly(passedOrderId);
    }
  }, [location.state]);

  const fetchOrderDetailsDirectly = async (targetOrderId) => {
    setLoading(true);
    setError('');
    try {
      let response = await fetch(`${API_BASE_URL}/order`);
      if (response.ok) {
        let orders = await response.json();
        const foundOrder = orders.find(
          (item) => (item.orderId || '').toLowerCase() === targetOrderId.trim().toLowerCase() || item.id == targetOrderId.trim()
        );

        if (foundOrder) {
          setOrderDetails(foundOrder);
        } else {
          setError("No payment record found with this Order ID.");
        }
      } else {
        setError("Failed to fetch payment details.");
      }
    } catch (err) {
      console.error("Error fetching order:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchOrder = async (e) => {
    e.preventDefault();
    if (!orderIdInput.trim()) {
      setError("Please enter a valid Order ID.");
      return;
    }
    fetchOrderDetailsDirectly(orderIdInput);
  };

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const dateObj = new Date(dateString);
      if (!isNaN(dateObj.getTime())) {
        return dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      }
      return dateString.substring(0, 10);
    } catch (e) {
      return dateString.substring(0, 10);
    }
  };

  return (
    <div className="student-payment-page">
      <div className="no-print">
        <Navbar />
      </div>

      <div className="payment-status-content">
        <div className="payment-search-card no-print">
          <h2>Check Your Payment Status & Bill</h2>
          <p>Enter your unique Order ID below to view complete transaction details and download your bill.</p>
          
          <form onSubmit={handleSearchOrder} className="payment-search-form">
            <div className="input-icon-wrapper">
              <MdSearch className="search-input-icon" />
              <input 
                type="text" 
                placeholder="e.g. ORDS25012001" 
                value={orderIdInput}
                onChange={(e) => setOrderIdInput(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-search-order">
              {loading ? "Searching..." : "Check Status"}
            </button>
          </form>

          {error && <div className="error-alert-msg">{error}</div>}
        </div>

        {orderDetails && (
          <div className="invoice-container">
            <div className="invoice-header">
              <div className="invoice-company">
                <h2>Knowledge Zone</h2>
                <p>Learn and Implement</p>
              </div>
              <div className="invoice-title-box">
                <h3>PAYMENT RECEIPT</h3>
                <p><strong>Status:</strong> <span className="badge-success">SUCCESS</span></p>
              </div>
            </div>

            <div className="invoice-details-grid">
              <div>
                <p><strong>Order ID:</strong> {orderDetails.orderId || orderDetails.id}</p>
                <p><strong>Student Email:</strong> {orderDetails.studentEmail || orderDetails.student?.username || "N/A"}</p>
              </div>
              <div className="text-right">
                <p><strong>Date:</strong> {formatDate(orderDetails.createdAt || orderDetails.orderDate)}</p>
                <p><strong>Payment Gateway:</strong> Online Secure</p>
              </div>
            </div>

            <table className="invoice-table">
              <thead>
                <tr>
                  <th>Description / Course Item</th>
                  <th>Transaction Type</th>
                  <th>Amount Paid</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{orderDetails.courseTitle || orderDetails.courseName || orderDetails.course?.title || `Course ID: ${orderDetails.course?.id || orderDetails.courseId}`}</td>
                  <td>E-Learning Course Purchase</td>
                  <td>₹{orderDetails.price || orderDetails.sellingPrice || orderDetails.amount || 0}</td>
                </tr>
              </tbody>
            </table>

            <div className="invoice-total-section">
              <p><strong>Total Paid: ₹{orderDetails.price || orderDetails.sellingPrice || orderDetails.amount || 0}</strong></p>
            </div>

            <div className="invoice-footer-note">
              <p>This is a computer-generated receipt and does not require a physical signature.</p>
            </div>

            <div className="invoice-actions no-print">
              <button onClick={handlePrint} className="btn-print-bill">
                <MdPrint style={{ marginRight: '6px' }} /> Print / Download Bill
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="no-print">
        <Footer />
      </div>
    </div>
  );
};

export default StudentPaymentStatus;
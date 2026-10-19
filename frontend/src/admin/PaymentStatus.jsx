import React, { useEffect, useState } from 'react';
import { MdDelete, MdSearch } from "react-icons/md";

const PaymentStatus = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        let response = await fetch('http://localhost:8080/order', {
          method: 'GET'
        });
        
        if (response.ok) {
          let result = await response.json();
          setPayments(result);
          setFilteredPayments(result);
        } else {
          setError("Failed to fetch payment records.");
        }
      } catch (err) {
        console.error("Error fetching payment data:", err);
        setError("Something went wrong while loading payment status.");
      }
    };

    fetchPayments();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === '') {
      setFilteredPayments(payments);
    } else {
      const filtered = payments.filter((item) => {
        const orderId = (item.orderId || '').toLowerCase();
        const email = (item.studentEmail || '').toLowerCase();
        return orderId.includes(term) || email.includes(term);
      });
      setFilteredPayments(filtered);
    }
  };

  const handleDeletePayment = async (id) => {
    if (window.confirm("Are you sure you want to delete this payment record?")) {
      try {
        let response = await fetch(`http://localhost:8080/order/delete/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          const updatedPayments = payments.filter(item => item.id !== id);
          setPayments(updatedPayments);
          setFilteredPayments(updatedPayments);
        } else {
          console.error("Failed to delete payment record");
        }
      } catch (error) {
        console.error("Error deleting payment:", error);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const dateObj = new Date(dateString);
      if (!isNaN(dateObj.getTime())) {
        return dateObj.toLocaleDateString('en-CA');
      }
      return dateString.substring(0, 10);
    } catch (e) {
      return dateString.substring(0, 10);
    }
  };

  return (
    <div className="payment-status-container">
      {error && <div className='error-alert'>{error}</div>}

      <div className="payment-header-section">
        <h2>Payment Status & Transactions</h2>
        
        <div className="payment-search-box">
          <MdSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by Order ID or Email..." 
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      <table className='course-detail-table'>
        <caption>
          All Payment Transactions
        </caption>
        <tbody>
          <tr>
            <th>Order ID</th>
            <th>Course ID / Name</th>
            <th>Student Email</th>
            <th>Amount Paid</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          {
            filteredPayments.length > 0 ? (
              filteredPayments.map((item) => {
                const courseName = item.courseTitle || item.courseName || item.course?.title || (item.courseId ? `ID: ${item.courseId}` : "N/A");
                const studentMail = item.studentEmail || item.student?.username || "N/A";
                const paidAmount = item.price || item.sellingPrice || item.amount || 0;
                const orderDate = item.createdAt || item.orderDate;

                return (
                  <tr key={item.id}>
                    <td>{item.orderId || item.id}</td>
                    <td>{courseName}</td>
                    <td>{studentMail}</td>
                    <td>₹{paidAmount}</td>
                    <td>{formatDate(orderDate)}</td>
                    <td>
                      <span className="success-badge">
                        Success
                      </span>
                    </td>
                    <td>
                      <button 
                        onClick={() => handleDeletePayment(item.id)} 
                        title="Delete Record"
                        className="delete-action-btn"
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan="7" className="no-records-cell">
                  No payment records found.
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
};

export default PaymentStatus;
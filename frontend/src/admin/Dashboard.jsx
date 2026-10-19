import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalSold: 0
  });
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const courseRes = await fetch('http://localhost:8080/course');
        if (courseRes.ok) {
          const courses = await courseRes.json();
          setStats(prev => ({ ...prev, totalCourses: courses.length }));
        }

        const studentRes = await fetch('http://localhost:8080/student/all'); 
        if (studentRes.ok) {
          const students = await studentRes.json();
          setStats(prev => ({ ...prev, totalStudents: students.length }));
        }

        const orderRes = await fetch('http://localhost:8080/order'); 
        if (orderRes.ok) {
          const orderData = await orderRes.json();
          setOrders(orderData);
          setStats(prev => ({ ...prev, totalSold: orderData.length }));
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchDashboardData();
  }, []);

  // Order delete karne ka function
  const handleDeleteOrder = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        let response = await fetch(`http://localhost:8080/order/delete/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // UI se order remove karna aur stats (totalSold) update karna
          const updatedOrders = orders.filter(order => order.id !== id);
          setOrders(updatedOrders);
          setStats(prev => ({ ...prev, totalSold: updatedOrders.length }));
        } else {
          let errText = await response.text();
          console.error("Failed to delete order:", errText);
        }
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    }
  };

  return (
    <div className='dashboard'>
      <div className="cards">
        <div className="course-card">
          <div className="title">Course</div>
          <h1>{stats.totalCourses}</h1>
          <Link to="/admin/course">View</Link>
        </div>
        <div className="student-card">
          <div className="title">Students</div>
          <h1>{stats.totalStudents}</h1>
          <Link to="/admin/student">View</Link>
        </div>
        <div className="sold-card">
          <div className="title">Sold</div>
          <h1>{stats.totalSold}</h1>
          <Link to="/admin/sellreport">View</Link>
        </div>
      </div>
      
      <table className='order-detail-table'>
        <caption>
          Course Ordered
        </caption>
        <tbody>
          <tr>
            <th>Order Id</th>
            <th>Course Id</th>
            <th>Student Email</th>
            <th>Order Date</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id || order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.courseId}</td>
                <td>{order.studentEmail}</td>
                <td>{order.orderDate ? new Date(order.orderDate).toLocaleDateString() : 'N/A'}</td>
                <td>₹{order.amount}</td>
                <td>
                  {/* Delete Icon / Button */}
                  <button 
                    onClick={() => handleDeleteOrder(order.id)} 
                    title="Delete Order"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#dc2626' }}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
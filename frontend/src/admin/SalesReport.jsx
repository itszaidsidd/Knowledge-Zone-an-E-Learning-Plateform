import React, { useEffect, useState } from 'react';

const SalesReport = () => {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        let response = await fetch('http://localhost:8080/order', {
          method: 'GET'
        });
        
        if (response.ok) {
          let result = await response.json();
          setSales(result);
          setFilteredSales(result);

          // Total revenue calculate karna
          calculateRevenue(result);
        } else {
          setError("Failed to fetch sales report.");
        }
      } catch (err) {
        console.error("Error fetching sales data:", err);
        setError("Something went wrong while loading sales report.");
      }
    };

    fetchSalesData();
  }, []);

  // Revenue calculate karne ka helper function
  const calculateRevenue = (data) => {
    let revenue = data.reduce((sum, item) => sum + (item.price || item.sellingPrice || item.amount || 0), 0);
    setTotalRevenue(revenue);
  };

  // Date Range Filter handle karne ka function
  const handleFilter = (start, end, currentSales) => {
    const listToFilter = currentSales || sales;
    
    if (!start && !end) {
      setFilteredSales(listToFilter);
      calculateRevenue(listToFilter);
      return;
    }

    const filtered = listToFilter.filter((item) => {
      const dateStr = item.createdAt || item.orderDate || '';
      if (!dateStr) return false;
      const itemDate = dateStr.substring(0, 10); // YYYY-MM-DD

      if (start && end) {
        return itemDate >= start && itemDate <= end;
      } else if (start) {
        return itemDate >= start;
      } else if (end) {
        return itemDate <= end;
      }
      return true;
    });

    setFilteredSales(filtered);
    calculateRevenue(filtered);
  };

  const handleStartDateChange = (e) => {
    const val = e.target.value;
    setStartDate(val);
    handleFilter(val, endDate, sales);
  };

  const handleEndDateChange = (e) => {
    const val = e.target.value;
    setEndDate(val);
    handleFilter(startDate, val, sales);
  };

  // Filter Reset karne ke liye function
  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    setFilteredSales(sales);
    calculateRevenue(sales);
  };

  // Date ko clean format (YYYY-MM-DD) mein dikhane ke liye function
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
    <div>
      {error && <div className='error-alert'>{error}</div>}

      {/* Header, Total Revenue & Date Range Filter */}
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <h2>Total Sales & Revenue: ₹{totalRevenue.toLocaleString()}</h2>
        
        {/* Date Range Inputs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <label style={{ fontWeight: 'bold', color: '#225470', fontSize: '14px' }}>From:</label>
            <input 
              type="date" 
              value={startDate} 
              onChange={handleStartDateChange}
              style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none', background: '#fff' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <label style={{ fontWeight: 'bold', color: '#225470', fontSize: '14px' }}>To:</label>
            <input 
              type="date" 
              value={endDate} 
              onChange={handleEndDateChange}
              style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none', background: '#fff' }}
            />
          </div>

          {(startDate || endDate) && (
            <button 
              onClick={handleReset}
              style={{ padding: '7px 12px', background: '#6b7280', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}
            >
              Reset
            </button>
          )}
        </div>
      </div>

      <table className='course-detail-table'>
        <caption>
          Sales Report / Course Orders
        </caption>
        <tbody>
          <tr>
            <th>Order ID</th>
            <th>Course Name</th>
            <th>Student Email</th>
            <th>Amount Paid</th>
            <th>Date</th>
          </tr>
          {
            filteredSales.length > 0 ? (
              filteredSales.map((item) => {
                const courseName = item.courseTitle || item.courseName || item.course?.title || item.title || (item.courseId ? `Course ID: ${item.courseId}` : "N/A");
                const studentMail = item.studentEmail || item.studentUsername || item.student?.username || item.username || "N/A";
                const paidAmount = item.price || item.sellingPrice || item.amount || 0;
                const orderDate = item.createdAt || item.orderDate;

                return (
                  <tr key={item.id}>
                    <td>{item.orderId || item.id}</td>
                    <td>{courseName}</td>
                    <td>{studentMail}</td>
                    <td>₹{paidAmount}</td>
                    <td>{formatDate(orderDate)}</td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>
                  No sales records found for the selected date range.
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
};

export default SalesReport;
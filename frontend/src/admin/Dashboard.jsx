import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <div className="cards">
        <div className="course-card">
          <div className="title">Course</div>
          <h1>9</h1>
          <Link href="/">View</Link>
        </div>
        <div className="student-card">
          <div className="title">Students</div>
          <h1>9</h1>
          <Link href="/">View</Link>
        </div>
        <div className="sold-card">
          <div className="title">Sold</div>
          <h1>9</h1>
          <Link href="/">View</Link>
        </div>
      </div>
      <table className='order-detail-table'>
        <caption>
          Course Orderd
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
        <tr>
          <td>ORDS2501200101</td>
          <td>3</td>
          <td>itszaidsidd@gamil.com</td>
          <td>25-01-20026</td>
          <td>200</td>
          <td>Action</td>
        </tr>
        <tr>
          <td>ORDS2501200101</td>
          <td>3</td>
          <td>itszaidsidd@gamil.com</td>
          <td>25-01-20026</td>
          <td>200</td>
          <td>Action</td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Dashboard

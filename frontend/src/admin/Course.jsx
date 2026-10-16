import React from 'react'
import { Link } from 'react-router-dom'
// import { TiDocumentAdd } from "react-icons/ti";

const Course = () => {
  return (
    <div>
      <table className='course-detail-table'>
        <caption>
          List of Courses
        </caption>
        <tbody>

        <tr>
          <th>Course Id</th>
          <th>Name</th>
          <th>Auther</th>
          <th>Action</th>
        </tr>
        <tr>
          <td>3</td>
          <td>Learn Python A-Z</td>
          <td>Zaid</td>
          <td>Action</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Learn react</td>
          <td>Ayan</td>
          <td>Action</td>
        </tr>
        </tbody>
      </table>
      <div className="add-course">
        {/* <TiDocumentAdd/> */}
        <Link to="/admin/addnewcourse">
        +
        </Link>
      </div>
    </div>
  )
}

export default Course

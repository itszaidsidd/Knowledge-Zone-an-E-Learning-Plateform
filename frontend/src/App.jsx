import { Route, Routes, Navigate } from 'react-router-dom'
import Admin from './admin/Admin'
import AdminLogin from './components/AdminLogin'
import './App.css'
import Home from './layouts/Home'
import StudentLogin from './components/StudentLogin'
import StudentSignup from './components/StudentSignup'
import StudentPanel from './student/StudentPanel'
import CheckoutPage from './coursePurchase/CheckoutPage'
import CourseDetail from './coursePurchase/CourseDetail'

// Protected Route component jo check karega ki admin logged in hai ya nahi
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/admin/login" />;
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/signup" element={<StudentSignup />} />
        <Route path="/student/*" element={<StudentPanel />} />
        <Route path="/course-detail/:courseId" element={<CourseDetail />} />
        <Route path="/checkout/:courseId" element={<CheckoutPage />} />
        

        {/* Protected Admin Routes */}
        <Route path="/admin/*" element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App



import { Route, Routes } from 'react-router-dom'
import Admin from './admin/Admin'
import './App.css'
import Home from './layouts/Home'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/admin/*" element={<Admin/>}/>

      {/* <Home/> */}
      </Routes>
      {/* <Admin/> */}
    </>
  )
}

export default App

import React from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import Home from './pages/student/Home'
import CoursesList from './pages/student/CoursesList'
import CourseDetails from './pages/student/CourseDetails'
import MyEnrollment from './pages/student/MyEnrollment'
import Player from './pages/student/Player'
import Loading from './component/student/Loading'
import Educator from './pages/educator/Educator'
import Dashboard from './pages/educator/Dashboard'
import Addcourse from './pages/educator/Addcourse'
import Mycourses from './pages/educator/Mycourses'
import StudentsEnrolled from './pages/educator/StudentsEnrolled'
import Navbar from './component/student/Navbar'
import "quill/dist/quill.snow.css";
 import { ToastContainer } from 'react-toastify';

const App = () => {
  const isEducatorPage=useMatch('/educator/*');
  return (

    <div className='text-default min-h-screen bg-white'>
      <ToastContainer/>
      {!isEducatorPage && <Navbar/>}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/course-list' element={<CoursesList/>} />
        <Route path='/course-list/:input' element={<CoursesList/>} />
        <Route path='/course/:id' element={<CourseDetails/>} />
        <Route path='/my-enrollment' element={<MyEnrollment/>} />
        <Route path='/player/:courseId' element={<Player/>} />
        <Route path='/loading/:path' element={<Loading/>} />

        <Route path='/educator' element={<Educator/>}>
            <Route path='/educator' element={<Dashboard/>}/>
            <Route path='add-course' element={<Addcourse/>}/>
            <Route path='my-course' element={<Mycourses/>}/>
            <Route path='student-enrolled' element={<StudentsEnrolled/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App

import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Searchbar from '../../component/student/Searchbar';
import { useParams } from 'react-router-dom';
import CorseCard from '../../component/student/CorseCard';
import { assets } from '../../assets/assets';
import Footer from '../../component/student/Footer';

const CoursesList = () => {

  const {navigate,allCourse}=useContext(AppContext);

  const {input}=useParams();
  
  const [filteredCourse,setFilteredCourse]=useState([]);

  useEffect(()=>{
    if(allCourse&&allCourse.length>0){
      const tempCourses=allCourse.slice()
      input?
        setFilteredCourse(
          tempCourses.filter(item=>(
            item.courseTitle.toLowerCase().includes(input.toLowerCase())
          ))
        )
        : setFilteredCourse(tempCourses)
    }
  },[allCourse,input])

  return (
    <>
      <div className='relative md:px-36 px-8 pt-20 text-left'>
        <div className='flex md:flex-row flex-col gap-6 items-center justify-between w-full'>
          <div>
            <h1 className='text-4xl font-semibold text-gray-800'>
              Course List
            </h1>
            <p className='text-gray-500'>
              <span className='text-blue-600 cursor-pointer' onClick={()=>{navigate("/")}}>Home</span>/
              <span>Course List</span>
            </p>
          </div>
          <Searchbar data={input}/>
        </div>
        {input && <div className='inline-flex items-center gap-4 px-4 py-2 border mt-8 -md-8 text-gray-600'>
            <p>{input}</p>
            <img src={assets.cross_icon} alt="" className='cursor-pointer' onClick={()=>{navigate("/course-list")}}/>
          </div>}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16
        gap-3 px-2 md:p-0'>
          {filteredCourse.map((course,index)=><CorseCard key={index} course={course}/>)}
        </div>
      </div>
      <Footer/>

    </>
  )
}

export default CoursesList

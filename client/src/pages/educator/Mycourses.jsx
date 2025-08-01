import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Loading from '../../component/student/Loading';
import axios from 'axios';
import { toast } from 'react-toastify';

const Mycourses = () => {

  const { currency, backendUrl,isEducator,getToken } = useContext(AppContext);

  const [courses, setCourses] = useState(null);

  const fetchAllCourses =async () => {
    try {
      const token =await getToken();
      const { data } = await axios.get(backendUrl+'/api/educator/courses',{ headers: { Authorization: `Bearer ${token}` } })

      if(data.success){
        setCourses(data.courses)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if(isEducator){
      fetchAllCourses();
    }
  }, [isEducator])

  return courses ? (
    <div className='h-screen flex flex-col items-center justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <div className='w-full'>
        <h2 className='pb-4 text-lg font-medium'>My Course</h2>
        <div className='flex flex-col items-center max-w-4xl w-full bg-white border border-gray-500/20 overflow-hidden rounded-md'>

          <table className='md:table-auto table-fixed w-full overflow-hidden'>
            <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left'>
              <tr>
                <th className='px-4 py-3 font-semibold truncate'>All Courses</th>
                <th className='px-4 py-3 font-semibold truncate'>Earnings</th>
                <th className='px-4 py-3 font-semibold truncate'>Students</th>
                <th className='px-4 py-3 font-semibold truncate'>Published On</th>
              </tr>
            </thead>
            <tbody className='text-sm text-gray-500'>
              {courses.map((course)=>(
                <tr key={course._id} className='border-b border-gray-500/20'>
                  <td className='md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate'>
                    <img src={course.courseThumbnail} alt="course image" className='w-16'/>
                    <span className='truncate hidden md:block'>{course.courseTitle}</span>
                  </td>

                  <td className='px-4 py-3'>{currency} {Math.floor(course.enrolledStudents.length*(course.coursePrice - course.discount * course.coursePrice / 100))}
                  </td>

                  <td className='px-4 py-3'>
                    {course.enrolledStudents.length}
                  </td>
                  <td className='px-4 py-3'>
                    {new Date(course.createdAt).toLocaleDateString()}
                  </td>

                </tr>
              
              ))}

            </tbody>
           
          </table>
        </div>
      </div>
      
    </div>
  ) :
    <Loading />
}

export default Mycourses

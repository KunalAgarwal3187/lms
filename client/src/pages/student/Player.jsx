import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import { Link, useParams } from 'react-router-dom';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';
import YouTube from 'react-youtube';
import Footer from '../../component/student/Footer';
import Rating from '../../component/student/Rating';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../../component/student/Loading';

const Player = () => {

  const [courseData, setCourseData] = useState(null);

  const [openSections, setOpenSections] = useState({});

  const [playerData, setPlayerData] = useState(null);

  const [progressData, setProgressData] = useState(null)

  const [initialRating, setInitialRating] = useState(0)

  const { calculateChapterTime, enrolledCourses, backendUrl, getToken, userData, userEnrolledCourses } = useContext(AppContext);

  const { courseId } = useParams()

  const fetchCourseData = () => {
    const findCourse = enrolledCourses.find((item) => item._id === courseId)
    setCourseData(findCourse);
    findCourse.courseRatings.map((item) => {
      if (item.userId === userData._id) {
        setInitialRating(item.rating)
      }
    })
  }

  const markLectureComleted = async (lectureId) => {
    try {
      const token = await getToken()
      const { data } = await axios.post(backendUrl + "/api/user/update-course-progress", { courseId, lectureId }, { headers: { Authorization: `Bearer ${token}` } })

      if (data.success) {
        toast.success(data.message)
        getCourseProgress();
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const getCourseProgress = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.post(backendUrl + "/api/user/get-course-progress", { courseId }, { headers: { Authorization: `Bearer ${token}` } })

      if (data.success) {
        setProgressData(data.progressData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleRating = async (rating) => {
    try {
      const token = await getToken()
      const { data } = await axios.post(backendUrl + "/api/user/add-rating", { courseId, rating }, { headers: { Authorization: `Bearer ${token}` } })

      if (data.success) {
        toast.success(data.message)
        userEnrolledCourses()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const toggleSection = (index) => {
    setOpenSections((prev) => (
      {
        ...prev,
        [index]: !prev[index],
      }
    ));
  };

  useEffect(() => {
    if (enrolledCourses.length > 0) {
      fetchCourseData();
    }
  }, [enrolledCourses])


  useEffect(() => {
    getCourseProgress()
  }, [])

  return courseData ? (
    <>
      <div className='p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36'>
        {/*left colum*/}
        <div className='text-gray-800'>
          <h2 className='text-xl font-semibold'>Course Structure</h2>

          <div className='pt-5'>
            {courseData && courseData.courseContent.map((chapter, index) => (
              <div key={index} className='border border-gray-300 bg-white mb-2 rounded'>
                <div className='flex items-center justify-between px-4 py-3 cursor-pointer select-none' onClick={() => toggleSection(index)}>
                  <div className='flex items-center gap-2 '>
                    <img src={assets.down_arrow_icon} alt="arrow_icon" className={`transform transition-transform ${openSections[index] ? "rotate-180" : ""}`} />
                    <p className='font-medium md:text-base text-sm'>{chapter.chapterTitle}</p>
                  </div>
                  <p className='text-sm md:text-default'>{chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}</p>
                </div>

                <div className={`overflow-hidden transition-all duration-300 ${openSections[index] ? "max-h-96" : "max-h-0"}`}>
                  <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300'>
                    {chapter.chapterContent.map((lecture, i) => (
                      <li key={i} className='flex items-start gap-2 py-1'>
                        <img src={progressData && progressData.lectureCompleted.includes(lecture.lectureId) ? assets.blue_tick_icon : assets.play_icon} alt="play_icon" className='w-4 m-4 mt-1' />
                        <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-default'>
                          <p>{lecture.lectureTitle}</p>
                          <div className='flex gap-2'>
                            {lecture.lectureUrl && <p onClick={() => {
                              setPlayerData({
                                ...lecture, chapter: index + 1, lecture: i + 1
                              })
                            }} className='text-blue-500 cursor-pointer'>Watch</p>}
                            <p>{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ["h", "m"] })}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

            ))}
          </div>

          {/* Certificate Section */}
          <div className='bg-gradient-to-b from-white to-gray-100 py-6 px-4 rounded shadow border border-gray-200 my-6'>
            <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
              <div>
                <h3 className='font-semibold text-lg'>Certificates</h3>
                <p className='text-gray-600 text-sm'>Get Edemy certificate by completing entire course</p>
              </div>

              {progressData?.completed ? (
                <Link
                  to={`/certificate-test/${courseId}`}
                  className="border border-black text-black font-semibold px-4 py-2 mt-2 md:mt-0 rounded hover:bg-black hover:text-white transition"
                >
                  🎓 Edemy Certificate
                </Link>
              ) : (
                <button
                  disabled
                  className="border border-gray-400 text-gray-500 font-semibold px-4 py-2 mt-2 md:mt-0 rounded cursor-not-allowed"
                >
                  Complete Course to Unlock
                </button>
              )}
            </div>
          </div>

          <div className='flex items-center gap-2 py-3 mt-10'>
            <h1 className='text-xl font-bold'>Rate this Course:</h1>
            <Rating initialRating={initialRating} onRate={handleRating} />
          </div>

        </div>
        {/*Right colum*/}
        <div>
          {playerData ? (
            <div className='md:mt-10'>
              <YouTube videoId={playerData.lectureUrl.split('/').pop()} opts={{ playerVars: { autoplay: 1 } }} iframeClassName='w-full aspact-video' />
              <div className='flex justify-between items-center mt-1'>
                <p>{playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}</p>
                <button onClick={() => { markLectureComleted(playerData.lectureId) }} className='text-blue-600'>{progressData && progressData.lectureCompleted.includes(playerData.lectureId) ? "Completed" : "Mark Completed"}</button>
              </div>
            </div>
          )
            : <img className="w-[564px] h-[340px] object-cover" src={courseData ? courseData.courseThumbnail : ''} alt="courseThumbnail" />
          }
        </div>
      </div>
      <Footer />
    </>
  ) : <Loading />
}

export default Player

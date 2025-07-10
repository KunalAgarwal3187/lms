import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';

const UpdateCourseGrid = () => {
    const [courses, setCourses] = useState([]);
    const { backendUrl, getToken } = useContext(AppContext)
    const navigate = useNavigate();

    const fetchCourses = async () => {
        const token = await getToken();
        const res = await axios.get(backendUrl+'/api/educator/courses',{ headers: { Authorization: `Bearer ${token}` } });
        setCourses(res.data.courses);
      };

    useEffect(() => {
        fetchCourses();
    },[]);

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
            {courses.map((course) => (
                <div
                    key={course._id}
                    onClick={() => navigate(`/educator/update-courses/${course._id}`)}
                    className="cursor-pointer hover:shadow-lg border rounded-lg overflow-hidden"
                >
                    <img src={course.courseThumbnail} className="h-32 w-full object-cover" />
                    <p className="p-2 text-center text-gray-800 font-semibold">{course.courseTitle}</p>
                </div>
            ))}
        </div>
    );
};

export default UpdateCourseGrid;

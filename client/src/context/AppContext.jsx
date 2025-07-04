import { createContext, useEffect, useState } from "react";
import React from 'react'
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from 'humanize-duration'
import {useAuth,useUser} from "@clerk/clerk-react"

export const AppContext=createContext();

export const AppContextProvider=(props)=>{

    const currency=import.meta.env.VITE_CURRENCY

    const  {getToken} = useAuth()
    const  {user} = useUser()

    //function to calculate avg. rating of a course
    const calculateRating=(course)=>{
        if(course.courseRatings.length===0){
            return 0;
        }
        let totalRating=0;
        course.courseRatings.forEach(rating=>{
            totalRating+=rating.rating;
        })
        return totalRating/course.courseRatings.length;
    }

    //Function to calculate course chapter time

    const calculateChapterTime=(chapter)=>{
        let time=0;
        chapter.chapterContent.map((lecture)=>{
            time+=lecture.lectureDuration;
        })
        return humanizeDuration(time*60*1000,{units:["h","m"]});
    }

    //Function to calculate Course Duration
    const calculateCourseDuration=(course)=>{
        let time=0;
        course.courseContent.map((chapter)=>{
            chapter.chapterContent.map((lecture)=>{
                time+=lecture.lectureDuration
            })
        })

        return humanizeDuration(time*60*1000,{units:["h","m"]});
    }

    // Function to calculate total number of Lecturs

    const calculateTotalLecture=(course)=>{
        let totalLecture=0;
        course.courseContent.forEach(chapter=>{
            if(Array.isArray(chapter.chapterContent))
            {
                totalLecture+=chapter.chapterContent.length;
            }
        });
        return totalLecture; 
    } 

    const navigate=useNavigate();

    const [allCourse,setAllCourses]=useState([]);

    const [isEducator,setIsEducator]=useState(true);

    const [enrolledCourses,setEnrolledCourses]=useState([]);

    const fetchAllCourses=async()=>{
        setAllCourses(dummyCourses)
    }

    //fetch user enrolled course
    const userEnrolledCourses=()=>{
        setEnrolledCourses(dummyCourses);
    }

    useEffect(()=>{
        fetchAllCourses();
        userEnrolledCourses();
    },[])

    const logToken=async ()=>{
        console.log("user is ",user);
        console.log(await getToken());
    }

    useEffect(()=>{
        if(user){
            logToken();
        }
    },[user])

    const value={
        currency,allCourse,navigate,calculateRating,isEducator,setIsEducator,calculateChapterTime,calculateCourseDuration,calculateTotalLecture,enrolledCourses
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
};
import mongoose from "mongoose"

// connect the MongoDB database

const connectDB = async ()=>{
    //.on('connect',.....)----> is a event listner 
    mongoose.connection.on('connected', ()=> console.log('Databse connected succesfully'))

    await mongoose.connect(`${process.env.MONGODB_URI}/lms`)
}
export default connectDB;
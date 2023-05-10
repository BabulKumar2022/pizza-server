const mongoose= require("mongoose");
require('colors')
 
const connectDB =  async() =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`DB is connected ${conn.connection.host}`)
    } catch (error) {
        console.log("DB is not connected")
    }
    }
module.exports = connectDB;


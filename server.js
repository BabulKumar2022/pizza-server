const express = require('express');
const dotenv =require('dotenv')
const cors =require('cors')
require('colors')
const morgan = require('morgan');
const connectDB = require('./config/db');


//config dotenv
   dotenv.config()

//connection
connectDB()

const app = express()

     
//middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(cors('cors'))
  
// route
app.use("/api/pizzas", require("./routes/pizzaRoute"))
app.use("/api/users", require("./routes/userRoute"))
app.use("/api/orders", require("./routes/orderRoute"))

app.get('/',(req, res)=>{
res.send('<h3> Node server Running </h3>')
})
const port = process.env.PORT || 8000
app.listen(port, ()=>{
    console.log('Server Running on port 8000')
})
const express = require ('express')
const app = express();
const dbConnect = require('./db')
const validator = require('validator')

const PORT = 3000;
dbConnect() // Call the Mongoose

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
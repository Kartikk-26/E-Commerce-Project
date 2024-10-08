//Required Monngose 
const mongoose =require('mongoose');
require('dotenv').config()

//Make a function to connect the mongoose with my backend 
const dbConnect = async()=>{
  try {
    
    const conn = await mongoose.connect(`${process.env.MONGODB_URI}`) 
    console.log("Successful");
    

  } catch (error) {
    console.log(error);
    
  }
}
module.exports = dbConnect;
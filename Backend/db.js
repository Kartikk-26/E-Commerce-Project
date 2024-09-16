//Required Monngose 
const mongoose =require('mongoose');

//Make a function to connect the mongoose with my backend 
const dbConnect = async()=>{
  try {
    
    const conn = await mongoose.connect('mongodb://localhost:27017/shoppingApp') 
    console.log("Successful");
    

  } catch (error) {
    console.log("Error");
    
  }
}
module.exports = dbConnect;
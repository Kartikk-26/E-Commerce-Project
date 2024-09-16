const User = require('../models/userModel')

exports.register = async(req,res)=>{
    //check if user already exist
    const User = await User.findOne({email:req.body.email})
        if(User){
            return res.status(400).json({message:'User already exist'})
        }
}
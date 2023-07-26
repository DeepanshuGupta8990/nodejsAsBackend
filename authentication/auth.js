const {user} = require("../models/user1.js");
const jwt = require("jsonwebtoken");

const authentication = async (req,res,next)=>{
    const {token} = req.cookies;
    if(token){
        const userId = jwt.verify(token, 'fsdsgbfsvcdfdsfggdfs');
        userProfile = await user.findOne({_id:userId._id});
        if(userProfile){
            req.user = userProfile;
            console.log("authentication is running");
            next()
        }
    }
    else{
           res.status(400);
        res.json({
          success: false,
          message: "Please looged in first"
        })
    }
}
module.exports = {authentication};
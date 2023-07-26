const {user}  = require("../models/user1")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const getAllUsers = async (req,res)=>{}

const login = async (req,res)=>{
  if(req.cookies.token){
    const userId = jwt.verify(req.cookies.token, 'fsdsgbfsvcdfdsfggdfs');
    console.log(userId)
    getUserFromDB = await user.findOne({_id:userId._id});
    console.log(getUserFromDB)
    res.status(200);
    res.json({
      succes:true,
      message: "User got entry by cookie"
    })
  }
  else{
   const {email,password} = req.body;
   const getUserFromDB = await user.findOne({email:email}).select("+password");
    if(getUserFromDB){
    const isMatch = await bcrypt.compare(password, getUserFromDB.password);
        if(isMatch){
          const token = jwt.sign({_id: getUserFromDB._id},'fsdsgbfsvcdfdsfggdfs')
          console.log("Token - "+token)
          console.log(process.env.NODE_ENV)
          res.cookie("token",token,{
            httpOnly:true,
            maxAge: 15*60*1000,
            sameSite: process.env.NODE_ENV==="Devlopment"?"lax":"none",
            secure: process.env.NODE_ENV==="Devlopment"?false:true
          });
          res.status(200);
          res.json({
            succes:true,
            message: "User exist and password matched"
          })
        }
        else{
          res.status(400);
          res.json({
            succes:false,
            message: "User exist but password does not match"
          })
        }
    }
    else{
    res.status(404);
          res.json({
            succes:false,
            message: "User does not exist"
          })
    }
  }
}

const getMyprofile = async (req,res)=>{
  try{
    const {token} = req.cookies;
    const userId = jwt.verify(token, 'fsdsgbfsvcdfdsfggdfs');
    userProfile = await user.findOne({_id:userId._id});
    res.status(200);
    res.json({
      success: true,
      userProfile
    })
  }catch(err){
    res.status(400);
    res.send("error")
  }
}

const register=async(req,res)=>{const{name,email,password}=req.body;const CheckPreExixtingUsers=await user.findOne({email:email});if(CheckPreExixtingUsers){res.status(404);res.json({success:false,message:"User already exist"})}else{const hashedPassword=await bcrypt.hash(password,10);let newUserCreated=await user.create({name:name,email:email,password:hashedPassword});if(newUserCreated){console.log('User created successfully:',newUserCreated);const token=jwt.sign({_id:newUserCreated._id},'fsdsgbfsvcdfdsfggdfs');res.status(201);res.cookie("token",token,{httpOnly:true,maxAge:15*60*1000, sameSite: process.env.NODE_ENV==="Devlopment"?"lax":'none',
secure: process.env.NODE_ENV==="Devlopment"?false:true});res.json({success:true,message:"Registered succesfully"})}else{console.log('Error creating user');res.status(404);res.json({succes:false,message:"Some error occured on server"})}}}

const logout = async(req,res)=>{
  res.clearCookie('token');
  res.status(200);
  res.json({
    success: true,
    message: "You are loggedout now"
  })
}


module.exports = {getAllUsers,login,register,getMyprofile,logout};
     





















// const register = async (req,res)=>{
//   const {name,email,password} = req.body
//   const CheckPreExixtingUsers = await user.findOne({email:email});
//   if(CheckPreExixtingUsers){
//     res.status(404);
//     res.json({
//         success:false,
//         message:"User already exist"
//     })
//   }
//   else{
//     const hashedPassword = await bcrypt.hash(password,10);
//     let newUserCreated = await user.create({
//         name:name,
//         email:email,
//         password:hashedPassword })
//     if(newUserCreated){
//         console.log('User created successfully:', newUserCreated);
        // const token = jwt.sign({_id: newUserCreated._id},'fsdsgbfsvcdfdsfggdfs')
        // res.status(201);
        // res.cookie("token",token,{
        //   httpOnly:true,
        //   maxAge: 15*60*1000
        // });
//         res.json({
//             success:true,
//             message:"Registered succesfully"
//         })
//     }
//     else {console.log('Error creating user');
//       res.status(404);
//       res.json({
//         succes:false,
//         message: "Some error occured on server"
//       })}
    
//   }
// }
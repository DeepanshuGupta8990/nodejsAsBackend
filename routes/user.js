const express = require("express");
const {user} = require("../models/user1");

const {getAllUsers,login,register,getMyprofile,logout} = require("../controls/user")

const router = express.Router();

router.get("/all",getAllUsers);

router.post('/new',register);

router.post('/login',login);

router.get('/me',getMyprofile);

router.get('/logout',logout);

module.exports = {router}















// router.get("/",(req,res)=>{
//   res.render("1");
// })

// router.get("/users/all", async (req,res)=>{
//   let users = await user.find();
//   console.log(users)
//   res.json({ success: true, data: users });
// })

// router.post("/users/all", async (req,res)=>{
//   // const lastDocument = await user.find().sort({_id: -1}).limit(1)
//   // let id1 = lastDocument[0].id;
//   //   id1 = id1+1;
//   //   const {name,email,age} = req.body;
//   //  console.log(name)
//   //   const newUser = user.create({
//   //       id: id1,
//   //   name: name,
//   //   email: email,
//   //   age: age
//   // }).then(()=>{
//   //   console.log("New user has been added");
//   // }).catch((err)=>{
//   //   console.log("Error has been arrived during adding new user to db")
//   // })

//   // let params = new URLSearchParams(req.url)
//   // console.log(params)
//   // console.log(params.get("age"))

//   const {name,age} = req.body;
//   console.log(1+" "+name,age);

//   const name1 = req.query.name;
//   const age1 = req.query.age;
//   console.log(2+" "+name1,age1)
//   const allDoc = await user.find().limit(5);
// //  if(allDoc){console.log("data sent")}
//   res.status(200);
//   res.setHeader('Content-Type', 'application/json');
//   res.json(allDoc)
// })


// router.get("/user/:id",async (req,res)=>{

//   let IdNeeded = req.params.id;
//   // try{
//     console.log(IdNeeded)
//     let userNeeded = await user.findById(IdNeeded);
//     console.log(userNeeded)
//   // }catch(err){
//   //   console.log('err arrived')
//   // }
 
//   res.status(200);
//   res.setHeader('Content-Type', 'application/json');
//   res.json(userNeeded)
// })

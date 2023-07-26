const {task} = require("../models/task");
const jwt = require("jsonwebtoken");

const newTask = async (req,res,next)=>{
  const {title,description} = req.body;
  await task.create({
    title: title,
    description: description,
    user: req.user
  })
console.log(req.user);
console.log("New task is registered")
  res.status(201);
  res.json({
    success:true,
    message: "Task added succesfully"
  })
}

const getMyTask = async (req,res)=>{
  console.log("getMyTask is running")
  const userID = req.user._id;
  const allTasksOfUser = await task.find({user:userID});
  res.status(200).json({
    success:true,
    task:allTasksOfUser
  })

}

const updateTask = async(req,res)=>{
  console.log("updateTask is running")
  try{
    const id = req.params.id
    const taskOfUser = await task.findById(id);
    taskOfUser.isCompleted = !taskOfUser.isCompleted;
    await taskOfUser.save();
    res.status(200).json({
      success:true,
      task:taskOfUser
    })
  }catch(err){
    console.log("Error message "+err.message)
  }

}

const deleteTask = async (req,res)=>{
  console.log("deleteTask is running")
  try{
    const id = req.params.id
    const taskOfUser = await task.findById(id);
    await taskOfUser.deleteOne();
    res.status(200).json({
      success:true,
      task:taskOfUser
    })
  }catch(err){
     console.log("Error arrived");
     console.log("error message :"+err.message)
     res.status(400).json({
      success:false,
       message: "Task has already been deleted"
     })
  }

}

module.exports = {newTask,getMyTask,updateTask,deleteTask};

// 6461e1f957996763bcd45ef1
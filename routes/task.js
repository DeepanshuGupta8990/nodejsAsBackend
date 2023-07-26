const express = require("express");
const {newTask,getMyTask,updateTask,deleteTask} = require("../controls/task.js")
const {authentication} = require("../authentication/auth.js");

const routerTask = express.Router();

routerTask.post("/new",authentication,newTask)

routerTask.get("/allTask",authentication,getMyTask)

routerTask.route("/:id").put(authentication,updateTask).delete(authentication,deleteTask)
module.exports = {routerTask};
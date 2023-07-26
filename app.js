const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const {router} = require('./routes/user.js')
const {routerTask} = require("./routes/task.js")
const cors = require('cors');
require('dotenv').config({ path: './config.env' });


mongoose.set("strictQuery",false);
mongoose.connect('mongodb://127.0.0.1:27017',{
    dbName:"backend"
}).then(()=>{console.log('Database connected')}).catch((e)=>{
    console.log(e)
})

const app = express();

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,

  };
// app.set("view engine","ejs");
// Use cookie-parser middleware
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions))
app.use(router);
app.use("/task",routerTask);



app.listen(4500,()=>{
    console.log("Server is listening on port:4500")
})


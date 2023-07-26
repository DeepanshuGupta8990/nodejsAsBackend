const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
     },
    isCompleted: {
        type: Boolean,
        default: false
    }
})
const task = mongoose.model("task",userSchema)

module.exports = {task}
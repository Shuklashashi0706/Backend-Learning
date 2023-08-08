import mongoose from "mongoose";
//creating schema
const schema = mongoose.Schema({
  title:{
    type:String,
    required:true,
  },
  description:{
    required:true,
    type:String,
  },
  isCompleted:{
    type:Boolean,
    deafult:false,
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Users",
    required:true,
  },
  createdAt:{
    required:true,
    type:Date,
    default:Date.now()
  }
});
//creating model
export const Task = mongoose.model("Task", schema);

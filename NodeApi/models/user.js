import mongoose from "mongoose";
//creating schema
const schema = mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  email:{
    required:true,
    type:String,
    unique:true,
  },
  password:{
    required:true,
    type:String,
    select:true,
  },
  createdAt:{
    required:true,
    type:Date,
    default:Date.now()
  }
});
//creating model
export const User = mongoose.model("Users", schema);

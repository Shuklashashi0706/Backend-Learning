import mongoose from "mongoose";
//creating schema
const schema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
//creating model
export const User = mongoose.model("Users", schema);

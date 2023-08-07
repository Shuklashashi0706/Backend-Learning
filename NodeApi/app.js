import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

const port = 8000;
const app = express();

//connecting database
mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbName: "backendapi",
  })
  .then(() => console.log("Database Connected"))
  .catch((e) => {
    console.log(e);
  });

//creating schema
const schema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const User = mongoose.model("Users", schema);
//setting middleware
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cookieParser);

app.get("/", (req, res) => {
  res.send("hi");
});
app.get("/users/all", async (req, res) => {
  const users = await User.find();
  console.log(req.query);
  const name=req.query.name;
  res.json({
    success:true,
    users,
  });
});

app.get("/userid/:id",async(req,res)=>{
    const {id}=req.params; 
    const user=await User.findById(id);
    res.json({
        success:true,
        user,    
    })
});

app.post("/users/new", async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  res.status(201).cookie("temp", "lol").json({
    success: "true",
    message: "Succesfully",
  });
});

app.listen(port, (req, res) => {
  console.log(`Listening at port no: ${port}`);
});

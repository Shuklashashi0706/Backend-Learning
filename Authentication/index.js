import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const app = express();
const port = 8000;

//connecting database
mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbName: "backend",
  })
  .then(() => console.log("Database Connected"))
  .catch((e) => {
    console.log(e);
  });

//creating schema
const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

//creating model
const User = mongoose.model("User", userSchema);

//middleware
const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const decode = jwt.verify(token, "aadgsfhdf");
    req.user = await User.findById(decode._id);
    next(); //used for paasing into next method handler
  } else {
    res.redirect("/login");
  }
};
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//setting up view engine
app.set("view engine", "ejs");
//get
app.get("/", isAuthenticated, (req, res) => {
  res.render("logout", { name: req.user.name });
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/logout", (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.redirect("/");
});
//post
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) return res.redirect("/register");
  const isMatch = await bcrypt.compare(password,user.password);
  if (!isMatch)
    return res.render("login", { email, mesaage: "Incorrect password" });
  const token = jwt.sign({ _id: user._id }, "aadgsfhdf");
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });
  res.redirect("/");
});

app.post("/register", async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    return res.redirect("/login");
  }
  const hashedPassword= await bcrypt.hash(password,10);
  user = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
  });
  const token = jwt.sign({ _id: user._id }, "aadgsfhdf");
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });
  res.redirect("/");
});

//listen
app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});

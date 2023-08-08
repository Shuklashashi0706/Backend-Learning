import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user)
    return res.status(404).json({
      success: false,
      message: "User not registered",
    });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(404).json({
      success: false,
      message: "Invalid email and password",
    });
  sendCookie(user, res, `Logged in successfully,${user.name}`, 200);
};

export const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user)
    return res.status(404).json({
      success: false,
      message: "User Already exist",
    });
  const hashedPassword = await bcrypt.hash(password, 10);
  user = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
  });
  sendCookie(user, res, "Registered successfully", 201);
};

export const getAllUsers = async (req, res) => {
  const users = User.find();
  res.status(200).json({
    success: true,
    message: "all users",
  });
};

export const getMyProfile = async (req, res) => {
  const id = "myid";
  const {token}= req.cookies;
  console.log(token);
  res.status(200).json({
    success: true, 
  });
};

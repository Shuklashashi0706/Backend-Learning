import { User } from "../models/user.js";
export const getAllUsers = async (req, res) => {
  const users = await User.find();
  console.log(req.query);
  const name = req.query.name;
  res.json({
    success: true,
    users,
  });
};

export const userRegister = async (req, res) => {
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
};

export const getUserbyId = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json({
    success: true,
    user,
  });
};
export const specialFunc = (req, res) => {
  res.json({
    success: true,
    message: "Just joking",
  });
};

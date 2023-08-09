import { User } from "../models/user.js";
export const getAllUsers = async (req, res) => {
    try {
      const users =await User.find();
      res.status(200).json({
        success: true,
        message:users,
      });
    } catch (error) {
      next(error);
    }
  };
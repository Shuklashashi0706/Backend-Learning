import express from "express";
import {
  getAllUsers,
  getUserbyId,
  specialFunc,
  userRegister,
} from "../controllers/user.js";
const router = express.Router();

router.post("/new", userRegister);
router.get("/all", getAllUsers);
router.get("/userid/:id", getUserbyId);
router.get("/userid/special", specialFunc);

export default router;

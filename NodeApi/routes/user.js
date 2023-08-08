import express from "express";
import { getAllUsers, userRegister,userLogin, getMyProfile } from "../controllers/user.js";
const router = express.Router();

router.post("/new", userRegister);
router.post("/login",userLogin);
router.get("/all", getAllUsers);
router.route("/me").get(getMyProfile);
export default router;

import express from "express";
import {userRegister,userLogin,userLogout, getMyProfile } from "../controllers/user.js";
import {isAuthenticated} from "../middlewares/auth.js"
const router = express.Router();


router.post("/new", userRegister);
router.post("/login",userLogin);
router.get("/logout",userLogout);
router.get("/me",isAuthenticated,getMyProfile);
export default router;

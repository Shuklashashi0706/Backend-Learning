import express from "express";
import { getAllUsers } from "../controllers/admin.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();
router.get("/all", isAuthenticated, getAllUsers);
export default router;

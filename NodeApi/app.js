import express from "express";
import userRouter from "./routes/user.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import taskRouter from "./routes/task.js";
import adminRouter from "./routes/admin.js";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";
export const app = express();

config({
  path: "./data/coonfig.env",
});
//setting middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    method: ["GET","PUT","POST","DELETE"],
    credentials:true, 
  })
);

//using routes
app.use("/users/api/v1", userRouter);
app.use("/task/api/v1", taskRouter);
app.use("/admin/api/v1", adminRouter);
app.get("/", (req, res) => {
  res.send("hi");
});
//using error middleware
app.use(errorMiddleware);

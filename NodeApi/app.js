import express from "express";
import userRouter from "./routes/user.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";

export const app = express();

config({
  path: "./data/coonfig.env",
});
//setting middleware
app.use(express.json());
app.use(cookieParser);

//using routes
app.use("/users/api/v1", userRouter);

app.get("/", (req, res) => {
  res.send("hi");
});

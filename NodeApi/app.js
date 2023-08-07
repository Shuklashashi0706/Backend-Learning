import express from "express";
import path from "path";
import userRouter from "./routes/user.js";
import { config } from "dotenv";

export const app = express();

config({
  path: "./data/coonfig.env",
});
//setting middleware
app.use("/users", userRouter);
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hi");
});

import express from "express";
import path from "path";
import mongoose from "mongoose";
const app = express();
const port = 8000;
const users = [];

//connecting database
mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbName: "backend",
  })
  .then(() => console.log("Database Connected"))
  .catch((e) => {
    console.log(e);
  });

//using middleware
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));

//Setting up view engine
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("index", { name: "Shukla" });
});
app.get("/add", (req, res) => {
  res.send("Nice");
});
app.get("/success", (req, res) => {
  res.render("success");
});

app.post("/contact", (req, res) => {
  users.push({ name: req.body.name, email: req.body.email });
  res.redirect("success");
});

app.get("/users", (req, res) => {
  res.json({ users });
});
app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});

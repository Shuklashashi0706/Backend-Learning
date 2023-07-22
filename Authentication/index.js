import express from "express";
import path from "path"

const app=express();
const port=8000;

app.use(express.static(path.join(path.resolve(),"public")));
app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.get("/login",(req,res)=>{
    res.render("login");
})
app.post("/login",(req,res)=>{
    res.cookie("token","iamin");
    res.redirect("/login");
})

app.listen(port,()=>{
    console.log(`Listening at port ${port}`);
})
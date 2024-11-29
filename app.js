const express=require("express");
const mongoose=require("mongoose");
const path=require("path")
const ejs=require("ejs");
const app=express();
mongoose.connect('mongodb://localhost/cleanblog-test-db');
const Post = require('./models/Post');
app.use(express.static("public"));
app.set("view engine","ejs")
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.get("/",async (req,res)=>{
    const posts= await Post.find({});
    res.render("index",{
        posts
      });
})
app.get("/posts/:id",async(req,res)=>{
    const post= await Post.findById(req.params.id)
    res.render("post",{
        post
    });
})

app.get("/about",(req,res)=>{
    res.render("about");
})
app.get("/add_post",(req,res)=>{
    res.render("add_post");
})
app.get("/post",(req,res)=>{
    res.render("post");
})
app.post("/newpost",async (req,res)=>{
    console.log(req.body);
   await Post.create(req.body);
    res.redirect("/");
})
const port=3000;

app.listen(port,()=>{
    console.log(`Sunucu ${port} portunda çalışıyor.`)
})
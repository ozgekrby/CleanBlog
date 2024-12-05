const express=require("express");
const mongoose=require("mongoose");
const path=require("path")
const ejs=require("ejs");
const app=express();
const methodOverride = require('method-override');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URL);
const Post = require('./models/Post');
const postController=require("./controllers/postControllers");
const { getAboutPage, getAddPostPage, getPostPage, getEditPage } = require("./controllers/pageControllers");
app.use(express.static("public"));
app.set("view engine","ejs")
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static("public"));

app.use(methodOverride('_method',{
    methods:["POST","GET"]
  }))
app.get("/",postController.getAllPost)
app.get("/posts/:id",postController.getPost)
app.put('/posts/:id',postController.updatePost);
app.delete('/posts/:id',postController.deletePost);
app.post("/newpost",postController.createPost)

app.get("/about",getAboutPage)
app.get("/add_post",getAddPostPage)
app.get("/post",getPostPage)
app.get('/posts/edit/:id',getEditPage);


const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Sunucu ${port} portunda çalışıyor.`)
})
require('dotenv').config()
const express = require("express")
const ejs = require("ejs")
const cloudinary=require("cloudinary").v2
const mongoose = require("mongoose")
const fileUpload = require("express-fileupload")
const expressSession = require("express-session")
const methodOverride=require("method-override")
const flash = require("connect-flash")
const connectMongo = require("connect-mongo")


const app = express()

mongoose.connect(
  process.env.MONGO_LOCAL_URI, {useNewUrlParser: true,useUnifiedTopology: true}
)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

const mongoStore = connectMongo(expressSession)


//Flash messaging middleware
app.use(flash());
// Global variables

cloudinary.config({
  api_key:process.env.API_KEY,
  api_secret:process.env.API_SECRET,
  cloud_name:process.env.CLOUD_NAME
})

app.use(expressSession({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new mongoStore({
    mongooseConnection: mongoose.connection
  })

}))

app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))
app.use(fileUpload())
app.use(express.static("public"))

app.use("*",(req,res,next)=>{
  res.locals.auth=req.session.userId
  next()
})

const createPostController = require("./controllers/createPost")
const storePostController = require("./controllers/storePost")
const homePageController = require("./controllers/homePage")
const userRegisterController = require("./controllers/userRegister")
const storeRegisterController = require("./controllers/storeRegister")
const userLoginController = require("./controllers/login")
const userLoginCheck = require("./controllers/logincheck")
const logOutController=require("./controllers/logout")

const singlePostController = require("./controllers/singlePost")
const myPostsController=require("./controllers/myPosts")
const deletePostController=require("./controllers/deletepost")
const editPostController=require("./controllers/editpost")
const saveEditChanges=require("./controllers/saveEditchanges")

const privateSinglePost=require("./controllers/privateSinglePost")
const privatePosts=require("./controllers/privatePosts")
const privateDeletePost=require("./controllers/privateDeletePost")
const privateEditPost=require("./controllers/privateEditPost")
const privateSaveEditChanges=require("./controllers/privateSaveEditChanges")


const deleteAccount=require("./controllers/deleteAcc")



//middlewares
const matchauth=require("./middlewares/matchauth")
const createPostMiddleware = require("./middlewares/createPostMiddleware")
const auth = require("./middlewares/auth")
const redirectIfAuth=require("./middlewares/redirectIfAuth")

app.get("/", homePageController)
app.get("/post/:id", singlePostController)
app.get("/users/logout",auth,logOutController)
app.get("/posts/new", auth, createPostController)
app.post("/posts/store", auth, createPostMiddleware, storePostController)

app.get("/ppost/:id",auth,privateSinglePost)
app.get("/users/privateposts",auth,privatePosts)
app.get("/pdelete/:id",auth,privateDeletePost)
app.get("/pedit/:id",auth,privateEditPost)
app.put("/peditpost/:id",auth,privateSaveEditChanges)

app.get("/users/login", redirectIfAuth,userLoginController)
app.post("/users/login",redirectIfAuth, userLoginCheck)
app.get("/users/register", redirectIfAuth,userRegisterController)
app.post("/users/registernew",redirectIfAuth, storeRegisterController)
app.get("/users/publicposts",auth,myPostsController)
app.get("/delete/:id",matchauth,deletePostController)
app.get("/edit/:id",matchauth,editPostController)
app.put("/editpost/:id",matchauth,saveEditChanges)
app.get("/account/delete",auth,deleteAccount)
app.use((req, res) => res.render('notfound'));


const port = process.env.PORT || 3000
app.listen(port, console.log("Server is running at " + port))

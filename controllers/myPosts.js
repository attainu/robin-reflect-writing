const User=require("../models/user")
const Post=require("../models/post")

module.exports=async (req,res)=>{
  const id=req.session.userId
  const posts=await Post.find({author:id})
  // res.render("myPosts.ejs")
  res.render("myPosts.ejs",{posts:posts})
}

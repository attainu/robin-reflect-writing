const User=require("../models/user")
const Article=require("../models/myarticle")

module.exports=async (req,res)=>{
  const id=req.session.userId
  const articles=await Article.find({author:id}).sort({createdAt:"desc"})
  // res.render("myPosts.ejs")
  res.render("privatePosts.ejs",{articles:articles})
}

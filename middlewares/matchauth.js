const User=require("../models/user")
const Post=require("../models/post")


module.exports=(req,res,next)=>{
  User.findById(req.session.userId,(err,foundUser)=>{
    Post.findOne({author:req.session.userId},(error,foundPost)=>{
      if(err || !foundUser || !foundPost || error){
        return res.redirect("/")
      }
      next()
    })

  })
}

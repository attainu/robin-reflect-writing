const Post=require("../models/post")

module.exports=async (req,res)=>{
  const id=req.params.id;
  const post=await Post.findOne({_id:id})
  res.render("editPost",{post:post})
}

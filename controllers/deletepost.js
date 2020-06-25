const Post=require("../models/post")
module.exports= async (req,res)=>{
  const postId=req.params.id;
  await Post.findByIdAndDelete(postId)
  res.redirect("/users/publicposts")
}

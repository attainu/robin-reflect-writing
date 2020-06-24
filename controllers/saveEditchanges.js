const Post=require("../models/post")

module.exports=async (req,res)=>{
  const updatepost=await Post.updateOne({_id:req.params.id},req.body)
  res.redirect("/")
}

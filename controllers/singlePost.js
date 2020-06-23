const User=require("../models/user")
const Post=require("../models/post")


module.exports=async (req,res)=>{
	const id=req.params.id;
	const post= await Post.findById(id)
	res.render("post.ejs",{post})
}
const User=require("../models/user")
const Post=require("../models/post")




module.exports=async(req,res)=>{
	const posts=await Post.find({})




	res.render("index.ejs",{posts});
}

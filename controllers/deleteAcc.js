const User=require("../models/user")
const Post=require("../models/post")

module.exports=async (req,res)=>{
	let Id=req.session.userId;
	const dpost=await Post.deleteMany({author:Id})
	const duser=await User.deleteOne({_id:Id})
	req.session.destroy(()=>{
    	res.redirect("/")
  })

}


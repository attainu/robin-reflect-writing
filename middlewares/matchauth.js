const User=require("../models/user")
const Post=require("../models/post")


module.exports=(req,res,next)=>{
	Post.findOne({_id:req.params.id},(err,foundPost)=>{
		if(err){
			res.redirect("/")
		}
		else{
			if(foundPost.author==req.session.userId){
				next()
			}
			else{
				res.redirect("/")
			}
		}
	})

}


const User=require("../models/user")
const Post=require("../models/post")


module.exports=(req,res,next)=>{
	Post.findOne({_id:req.params.id},(err,foundPost)=>{
		if(err){
			return res.redirect("/")
		}
		else{
			if(!req.session.userId){
				return res.redirect("/users/login")
			}
			else if(foundPost.author==req.session.userId){
				next()
			}

			else{
				User.findById(req.session.userId,(err,user)=>{
					if(err){
						return res.redirect("/users/login")
					}
					else {
						return res.render("trysmart",{user})
					}
				})
				

			}
		}
	})

}


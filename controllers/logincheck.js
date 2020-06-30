const User=require("../models/user")
const bcrypt=require("bcrypt")
module.exports=(req,res)=>{
	const {email,password}=req.body
	User.findOne({email},(err,foundUser)=>{
		if(foundUser){
			bcrypt.compare(password,foundUser.password,(err,result)=>{
				if(result){
					req.session.userId=foundUser._id
					res.redirect("/")
				}
				else{
					req.flash('error_msg',"Please Provide Correct Password")
					res.redirect("/users/login")
				}
			})
		}
		else{
			req.flash('error_msg',"No User Found")
			res.redirect("/users/login")
		}
	})

}

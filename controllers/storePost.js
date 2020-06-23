const Post=require("../models/post")
const fileUpload=require("express-fileupload")
const path=require("path")


module.exports=(req,res)=>{
	const {image} =req.files
	const myPath = path.resolve(__dirname,'..','public/uploads',image.name)
	image.mv(myPath,(error)=>{ 
		Post.create({
			...req.body,
			image:`/uploads/${image.name}`,
			author:req.session.userId
		},(err,post)=>{
		res.redirect("/")
	})
	})
	
}
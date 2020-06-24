const Post=require("../models/post")
const cloudinary=require("cloudinary").v2
const fileUpload=require("express-fileupload")
const path=require("path")


module.exports=(req,res)=>{
	const {image} =req.files
	const myPath = path.resolve(__dirname,'..','public/uploads',image.name)
	console.log(myPath)
	image.mv(myPath,(error)=>{
		cloudinary.uploader.upload(myPath,(err,result)=>{

			if(err){
				return res.redirect("/")
			}
				Post.create({
					...req.body,
					image:result.secure_url,
					author:req.session.userId
				},(err,post)=>{
					console.log(post)
				res.redirect("/")
			})

		})

	})

}

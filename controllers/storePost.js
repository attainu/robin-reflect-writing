const Post=require("../models/post")
const Article=require("../models/myarticle")
const cloudinary=require("cloudinary").v2
const fileUpload=require("express-fileupload")
const path=require("path")


module.exports=(req,res)=>{
	const {image} =req.files
	if( req.files.image.mimetype.includes("image")==false){
		req.flash("error_msg","Please Upload an Image")
		return res.redirect("/posts/new")
	}
	const myPath = path.resolve(__dirname,'..','public/uploads',image.name)
	image.mv(myPath,(error)=>{
		cloudinary.uploader.upload(myPath,(err,result)=>{

			if(err){
				return res.redirect("/")
			}
			else if(!req.body.saveType || req.body.saveType=="public"){

					Post.create({
						// ...req.body,
						title:req.body.title,
						subtitle:req.body.subtitle,
						content:req.body.content,
						image:result.secure_url,
						author:req.session.userId
					},(err,post)=>{
					res.redirect("/")
				})

			}
			else{
				Article.create({
					// ...req.body,
					title:req.body.title,
					subtitle:req.body.subtitle,
					content:req.body.content,
					image:result.secure_url,
					author:req.session.userId
				},(err,post)=>{
				res.redirect("/")
			})

			}




		})

	})

}

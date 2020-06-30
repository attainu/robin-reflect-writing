const User=require("../models/user")
const Article=require("../models/myarticle")


module.exports=async (req,res)=>{
	const id=req.params.id;
	const article= await Article.findById(id)
	const user=await User.findById(article.author)
	res.render("ppost.ejs",{article:article,user:user})
}

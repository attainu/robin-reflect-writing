const Article=require("../models/myarticle")

module.exports=async (req,res)=>{
  const id=req.params.id;
  const article=await Article.findOne({_id:id})
  res.render("privateEditPost",{article:article})
}

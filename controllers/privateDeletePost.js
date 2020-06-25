const Article=require("../models/myarticle")
module.exports= async (req,res)=>{
  const articleId=req.params.id;
  await Article.findByIdAndDelete(articleId)
  res.redirect("/users/privateposts")
}

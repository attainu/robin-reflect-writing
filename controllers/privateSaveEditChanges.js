const Article=require("../models/myarticle")

module.exports=async (req,res)=>{
  const updatearticle=await Article.updateOne({_id:req.params.id},req.body)
  res.redirect("/users/privatePosts")
}

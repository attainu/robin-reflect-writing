module.exports=(req,res)=>{
	if(req.session.userId){
		return res.render("create.ejs")
	}
	res.redirect("/users/login")

	
};
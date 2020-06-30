const User=require("../models/user")
const Post=require("../models/post")


module.exports=async(req,res)=>{
	let arr=[]
	let posts=await Post.find({}).sort({ createdAt: 'desc' })
	for (let i=0;i<posts.length;i++){
			const user=await User.findOne({_id:posts[i].author})
			let obj={}
			obj.authordetail=user
			obj.post=posts[i]
			// obj.post.authordetail=user
			arr.push(obj)
	}

	res.render("index.ejs",{arr:arr});
}

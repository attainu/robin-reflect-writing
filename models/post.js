const mongoose=require("mongoose")

const postSchema=new mongoose.Schema({
	title:{
		type:String,
		required:true
	},
	subtitle:{
		type:String,
		required:true
	},

	content:{
		type:String,
		required:true
	},

	author:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User',
		required:true
	},

	image:{
		type:String,
		required:true
	},

	createdAt:{
		type:Date,
		default:new Date()
	}

})



module.exports=mongoose.model("post",postSchema)

const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
mongoose.set('useCreateIndex', true);

const userSchema=new mongoose.Schema({
	username:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true,
		unique:true
	},
	password:{
		type:String,
		required:true
	}
})




module.exports=mongoose.model("user",userSchema)

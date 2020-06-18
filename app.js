const express=require("express")
const ejs=require("ejs")
const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const saltRounds=10;



const app=express()

app.use(express.static("public"))
app.use(express.urlencoded({extended:false}))





mongoose.connect("mongodb://localhost:27017/reflect",{
	useNewUrlParser:true,
	useUnifiedTopology:true

})

const userSchema=new mongoose.Schema({
	email:String,
	password:String,
	name:String
})


const User=mongoose.model("user",userSchema)


app.get("/",(req,res)=>{
	res.render("stylehome.ejs")
})

app.post("/",(req,res)=>{
	let name=req.body.username;
	let email=req.body.email
	let password=req.body.password

	bcrypt.hash(password, saltRounds, function(err, hash) {
    const newUser=new User({
    	name:name,
    	email:email,
    	password:hash
    })
    newUser.save()
    res.send("Successfully Saved")
})

})


app.get("/login",(req,res)=>{
	res.render("stylelogin.ejs")
})

app.post("/login",(req,res)=>{
	let email=req.body.email
	let password=req.body.password
	User.findOne({email:email},function(err,foundItem){
		if(!err){
			if(foundItem){
				bcrypt.compare(password, foundItem.password, function(err, result) {
   					if(result){
   						res.render("dashboard.ejs",{name:foundItem.name})
   					}
   					else{
   						res.send("Wrong password")

   					}
				})
			}
			else{
				res.send("No user  found..")
			}
		}

	})


})




app.listen(3000,
	console.log("Server is running.."))

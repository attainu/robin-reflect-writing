const User=require("../models/user")
module.exports=(req, res, next) => {
  //fetch user from database
  User.findById(req.session.userId, (error, foundUser) => {
    if (error || !foundUser) {
      return res.redirect("/users/login")
    }

    next()
  })
  //verify user
  //if user is valid permit user

}

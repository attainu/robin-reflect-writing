module.exports=(req, res, next) => {
  if (!req.body.title || !req.body.subtitle || !req.body.content  || !req.files) {
    return res.redirect("/posts/new")
  }
  next()
}

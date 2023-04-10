

const auth = (req, res, next) => {
  if (req.session.userId) return next()
  res.redirect('/login')
}


export default auth
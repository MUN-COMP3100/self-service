

const guest = (req, res, next) => {
  if (!req.session.userId) return next()
  res.redirect('/')
}


export default guest
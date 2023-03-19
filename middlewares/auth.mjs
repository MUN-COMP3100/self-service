

const auth = (req, res, next) => {
  if (req.session.userId) return next()
  res.status(402).send('Forbidden')
}


export default auth
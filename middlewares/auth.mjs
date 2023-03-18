

const auth = (req, res, next) => {
  console.log(req.session)
  if (req.session.userId) return next()
  res.status(402).send('Forbidden')
}


export default auth
import express, { json, urlencoded } from 'express'
import mongoose from 'mongoose'

const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/selfservice').then(() => {
  console.log("Connected to Database")
})

app.use(urlencoded({extended: true}))
app.use(json)


// * ROUTES
import routes from './routes/index.mjs'
app.use("/", routes)
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})
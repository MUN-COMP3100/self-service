import express, { json, urlencoded } from 'express'
import mongoose from 'mongoose'

const app = express()

import "./db/index.mjs"

app.use(urlencoded({extended: true}))
app.use(json())


// * ROUTES
import routes from './routes/index.mjs'
app.use("/", routes)


const PORT = 3000
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})
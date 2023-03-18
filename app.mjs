import express, { json, urlencoded } from 'express'
import MongoStore from 'connect-mongo'
import sessions from 'express-session'
import db from "./db/index.mjs"

const app = express()



app.use(urlencoded({extended: true}))
app.use(json())

// * Auth Sessions
app.use(sessions({
  secret: 'VERYSECTRET',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    clientPromise: Promise.resolve(db.getClient())
  })
}))


// * ROUTES
import routes from './routes/index.mjs'
app.use("/", routes)


const PORT = 3000
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})
import express, { json, urlencoded } from 'express'
import MongoStore from 'connect-mongo'
import sessions from 'express-session'
import db from "./db/index.mjs"
import cors from 'cors'
const app = express()



app.use(urlencoded({extended: true}))
app.use(json())

// * CORS
app.use(cors({credentials: true}))

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
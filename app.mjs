import express, { json, urlencoded } from 'express'
import MongoStore from 'connect-mongo'
import sessions from 'express-session'
import db from "./db/index.mjs"
import cors from 'cors'
import { engine } from 'express-handlebars';

const app = express()

app.set('view engine', 'ejs');

app.use(urlencoded({extended: true}))
app.use(json())

// * CORS
app.use(cors({credentials: true}))

// * Serve Public Directory for CSS, Images, Javascript
app.use(express.static('public'))

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
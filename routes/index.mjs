import { Router } from "express"

const router = Router()


// * Public Routes ( No Need to Login )
router.get('/login', (req, res, next) => {
  res.render('pages/login')
})

router.get('/register', (req, res, next) => {
  res.render('login')
})

// * Protected Routes ( Must Login )
router.get('/', (req, res) => {
  res.render('pages/index')
})

router.get('/register_courses', (req, res) => {
  res.render('pages/register_courses')
})

router.get('/bulk', (req, res) => {
  res.render('pages/bulk')
})

router.get('/favorite', (req, res) => {
  res.render('pages/favorite')
})

router.get('/timetable', (req, res) => {
  res.render('pages/timetable')
})

router.get('/calculator', (req, res) => {
  res.render('pages/calculator')
})


//* Import Routes
import course from "./course.route.mjs"
import student from "./student.route.mjs"
import auth from "./auth.route.mjs"
import favorite from "./favorite.route.mjs"
import path, { dirname } from "path"

// * All Routes Goes Here
router.use("/courses", course)
router.use("/api/student", student)
router.use("/api/auth", auth)
router.use("/api/favorite", favorite)



// * Error Handler
router.use(function (err, req, res, next) {
  console.log(err)
  res.status(err.status || 500).send({
    error: true,
    messages: err.messages || ["Internal Server Error"],
  })
})

export default router

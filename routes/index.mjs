import { Router } from "express"
import Course from "../models/course.model.mjs";

const router = Router()

import authMiddleware from "../middlewares/auth.mjs";
import guestMiddleware from "../middlewares/guest.mjs";


// * Public Routes ( No Need to Login )
router.get('/login', guestMiddleware, (req, res, next) => {
  res.render('pages/login')
})

router.get('/register', guestMiddleware, (req, res, next) => {
  res.render('pages/register')
})

// * Protected Routes ( Must Login )
router.get('/', authMiddleware, (req, res) => {
  res.render('pages/index')
})

router.get('/courses', async (req, res, next) => {
  try {
    let courses = await Course.find({}).sort({subject:1})

    res.render('pages/courses', { courses })
  } catch (error) {
    next(new AppError(500, error))
  }
})

router.get('/bulk', authMiddleware, (req, res) => {
  res.render('pages/bulk')
})


//* Import Routes
import course from "./course.route.mjs"
import student from "./student.route.mjs"
import auth from "./auth.route.mjs"
import favorite from "./favorite.route.mjs"
import path, { dirname } from "path"

// * API Routes
router.use("/api/course", course)
router.use("/api/student", student)
router.use("/api/auth", auth)
router.use("/api/favorite", favorite)



// * Error Handler
router.use(function (err, req, res, next) {
  
  res.status(err.status || 500).send({
    error: true,
    messages: err.messages || ["Internal Server Error"],
  })
})

export default router

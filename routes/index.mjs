import { Router } from "express";

const router = Router()

//* Import Routes
import course from './course.route.mjs'
import student from './student.route.mjs'
import auth from './auth.route.mjs'


// * All Routes Goes Here
router.use('/course', course)
router.use('/student', student)
router.use('/auth', auth)

// * Error Handler
router.use(function (err, req, res, next) {
  res.status(err.status || 500).send({
    error: true,
    messages: err.messages || ['Internal Server Error']
  })
});

export default router;
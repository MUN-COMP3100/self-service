import AppError from "../errors/AppError.mjs"
import Student from "../models/student.model.mjs"
import Course from "../models/course.model.mjs"
import bcrypt from "bcryptjs"
import { ObjectId } from "mongodb"

// * Get Logged On Student
export const me = async (req, res, next) => {
  try {
    const studentId = req.session.userId
    const student = await Student.findOne({ _id: studentId }).populate('courses')
    if (!student) return next(new AppError(404, "Student does not exist"))

    res.status(200).send(student)
  } catch (error) {
    next(new AppError(500, error))
  }
}

// * Login
export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body

    if (!username) return next(new AppError(401, "Username is required"))
    if (!password) return next(new AppError(401, "Password is required"))

    // * Find student with username in database
    const student = await Student.findOne({ username })
    if (!student)
      return next(new AppError(401, "Username or password are incorrect."))

    // * Compare Password
    const match = bcrypt.compareSync(password, student.password)
    if (!match)
      return next(new AppError(401, "Username or password are incorrect."))

    req.session.userId = student.id

    res.sendStatus(200)
  } catch (error) {
    next(new AppError(500, error))
  }
}

// * Logout
export const logout = async (req, res, next) => {
  req.session.destroy()
  res.sendStatus(200)
}

// * Create Student
export const create = async (req, res, next) => {
  try {
    const { first_name, last_name, email, username, password } = req.body

    if (!email) return next(new AppError(401, "Email is required"))
    if (!username) return next(new AppError(401, "Username is required"))
    if (!password) return next(new AppError(401, "Password is required"))

    // * Encrypt Password
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const student = new Student({
      first_name,
      last_name,
      email,
      username,
      password: hash,
    })

    const saved = await student.save()

    res.status(200).send(saved)
  } catch (error) {
    if (error.code === 11000)
      return next(new AppError(409, "Username already exists"))
    next(new AppError(500, error))
  }
}

// * View Registered Courses
// export const registeredCourses = async (req, res, next) => {
//   try {
//     const student = await Student.findOne({ _id: req.session.userId })
//     if (!student) return next(new AppError(404, "Student does not exist"))

//   } catch (error) {
    
//   }
// }

// * Register course
export const register = async (req, res, next) => {
  try {
    const student = await Student.findOne({ _id: req.session.userId })
    if (!student) return next(new AppError(404, "Student does not exist"))
    const course = await Course.findOne({
      _id: req.params.id,
    })
    if (!course) return next(new AppError(404, "Course not found"))
    student.courses.push(course.id)
    const savedStudent = await student.save()
    res.status(200).send(savedStudent)
  } catch (error) {
    next(new AppError(500, error))
  }
}

// * Bulk register courses
export const bulk = async (req, res, next) => {
  try {
    const student = await Student.findOne({ _id: req.session.userId })
    if (!student) return next(new AppError(404, "Student does not exist"))
    crn_list = req.body.crn_list
    for (const crn of crn_list) {
      const course = await Course.findOne({ crn })
      if (!course) return next(new AppError(404, "Course not found"))
      student.courses.push(course.id)
    }
    const savedStudent = await student.save()
    res.status(200).send(savedStudent)
  } catch (error) {
    next(new AppError(500, error))
  }
}

// * Drop Course
export const drop = async (req, res, next) => {
  try {
    console.log("drop")
    const student = await Student.findOne({ _id: req.session.userId })
    if (!student) return next(new AppError(404, "Student does not exist"))
    const course = await Course.findOne({
      _id: req.params.id,
    })
    if (!course) return next(new AppError(404, "Course not found"))
    student.courses = student.courses.filter((x) => !x._id.equals(req.params.id))
    console.log(student.courses)
    const savedStudent = await student.save()
    
    res.status(200).send(savedStudent)
  } catch (error) {
    next(new AppError(500, error))
  }
}

// * Update Student
// export const update = async (req, res, next) => {

// }

// * Delete Student
// export const remove = async (req, res, next) => {

// }

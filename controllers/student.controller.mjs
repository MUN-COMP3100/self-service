import AppError from "../errors/AppError.mjs"
import Student from '../models/student.model.mjs'
import bcrypt from 'bcryptjs'

// * Get Logged On Student
export const me = async (req, res, next) => {
  try {
    
    const studentId = req.session.userId
    const student = await Student.findOne({ _id: studentId })
    if (!student) return next(new AppError(404, 'Student does not exist'))
   
    res.status(200).send(student)

  } catch (error) {
    next(new AppError(500, error))
  }
}

// * Login
export const login = async (req, res, next) => {
  try {
    const {username, password} = req.body

    if (!username) return next(new AppError(401, 'Username is required'))
    if (!password) return next(new AppError(401, 'Password is required'))

    // * Find student with username in database
    const student = await Student.findOne({ username })
    if (!student) return next(new AppError(401, 'Username or password are incorrect.'))

    // * Compare Password
    const match = bcrypt.compareSync(password, student.password)
    if (!match) return next(new AppError(401, 'Username or password are incorrect.'))

    req.session.userId = student.id
    res.sendStatus(200)

  } catch (error) {
    next(new AppError(500, error))
  }
}

// * Create Student
export const create = async (req, res, next) => {
  try {
    const {first_name, last_name, email, username, password} = req.body

    if (!email) return next(new AppError(401, 'Email is required'))
    if (!username) return next(new AppError(401, 'Username is required'))
    if (!password) return next(new AppError(401, 'Password is required'))

    // * Encrypt Password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt)

    const student = new Student({
      first_name,
      last_name,
      email,
      username,
      password: hash
    })

    const saved = await student.save()

    res.status(200).send(saved)
  } catch (error) {
    if (error.code === 11000) return next(new AppError(409, 'Username already exists'))
    next(new AppError(500, error))
  }
}

// * Update Student
// export const update = async (req, res, next) => {

// }
// * Delete Student
// export const remove = async (req, res, next) => {

// }
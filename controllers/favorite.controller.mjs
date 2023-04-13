import AppError from "../errors/AppError.mjs"
import Student from "../models/student.model.mjs"
import Course from "../models/course.model.mjs"

// * Add Favorite to Current Logged In User
export const add = async (req, res, next) => {
  try {
    const student = await Student.findOne({
      _id: req.session.userId,
    })

    if (!student) return next(new AppError(404, "Student not found"))

    // * Find course
    const course = await Course.findOne({
      _id: req.params.id,
    })

    if (!course) return next(new AppError(404, "Course not found"))

    student.favorites.push(course.id)

    const savedStudent = await student.save()

    res.status(200).send(savedStudent)
  } catch (error) {
    next(new AppError(500, error))
  }
}

// * Remove Favorite from Current Logged In User
export const remove = async (req, res, next) => {
  try {
    const student = await Student.findOne({
      _id: req.session.userId,
    })

    if (!student) return next(new AppError(404, "Student not found"))

    student.favorites = student.favorites.filter((x) => !x._id.equals(req.params.id))
    const savedStudent = await student.save()

    res.status(200).send(savedStudent)
  } catch (error) {
    next(new AppError(500, error))
  }
}

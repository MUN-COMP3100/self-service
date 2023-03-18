import AppError from "../errors/AppError.mjs"
import Course from "../models/course.model.mjs"

// * Get Courses
export const getAll = async (req, res, next) => {
  try {
    let objs = await Course.find({})
    res.status(200).send(objs)
  } catch (error) {
    next(new AppError(500, error))
  }
}

// * Find Course by ID
export const getById = async (req, res, next) => {
  try {
    let id = req.params.id
    let obj = await Course.findOne({ _id: id })
    res.status(200).send(obj)
  } catch (error) {
    next(new AppError(500, error))
  }
}
// * Create Course
export const create = async (req, res, next) => {
  try {
    let { subject, number, name, section, crn, slot, schedule } = req.body
    let newCourse = new Course({
      subject,
      number,
      name,
      section,
      crn,
      slot,
      schedule,
    })
    let saved = await newCourse.save()
    res.status(200).send(saved)
  } catch (error) {
    next(new AppError(500, error))
  }
}
// * Update Course
export const update = async (req, res, next) => {
  try {
    let { subject, number, name, section, crn, slot, schedule } = req.body
    let newCourse = new Course({
      subject,
      number,
      name,
      section,
      crn,
      slot,
      schedule,
    })
    let saved = newCourse.save()
    res.status(200).send(saved)
  } catch (error) {
    next(new AppError(500, error))
  }
}
// * Delete Course
export const remove = async (req, res, next) => {
  try {
    let id = req.params.id
    let deleted = await Course.findOneAndDelete({ _id: id })
    res.status(200).send(deleted)
  } catch (error) {
    next(new AppError(500, error))
  }
}

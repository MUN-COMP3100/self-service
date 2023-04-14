import AppError from "../errors/AppError.mjs"
import Course from "../models/course.model.mjs"

// * Get Courses
export const getAll = async (req, res, next) => {
  try {
    let courses = await Course.find({}).sort({subject:1})

    res.status(200).send(courses)
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

    const course = await Course.findOne({ _id: req.params.id })
    if (!course) return next(new AppError(404, "Course not found"))

    if (subject) course.subject = subject
    if (number) course.number = number
    if (name) course.name = name
    if (section) course.section = section
    if (crn) course.crn = crn
    if (slot) course.slot = slot
    if (schedule) course.schedule = schedule

    let saved = await course.save()
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

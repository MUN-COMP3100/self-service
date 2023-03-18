import AppError from "../errors/AppError.mjs"
import courseModel from "../models/course.model.mjs"
import Course from "../models/course.model.mjs"

// * Get Courses
export const getAll = async (req, res, next) => {
  try {
    let objs = await Course.find({})
    res.send(objs)
  } catch (error) {}
}

// * Find Course by ID
export const getById = async (req, res, next) => {
  try {
    let id = req.params.id
    let obj = await Course.findOne({ _id: id })
    console.log("obj :>> ", obj)
    res.send(obj)
  } catch (error) {
    console.log(error)
  }
}
// * Create Course
export const create = async (req, res, next) => {
  try {
    let newCourse = new Course({
      subject: req.body.subject,
      number: req.body.number,
      name: req.body.name,
      section: req.body.section,
      crn: req.body.crn,
      slot: req.body.slot,
      schedule: req.body.schedule,
      favorite: req.body.favorite,
    })

    newCourse.save()
  } catch (error) {
    console.log(error)
  }
}
// * Update Course
export const update = async (req, res, next) => {
  try {
    let newCourse = new Course({
      subject: req.body.subject,
      number: req.body.number,
      name: req.body.name,
      section: req.body.section,
      crn: req.body.crn,
      slot: req.body.slot,
      schedule: req.body.schedule,
      favorite: req.body.favorite,
    })
    newCourse.save()
  } catch (error) {
    console.log(error)
  }
}
// * Delete Course
export const remove = async (req, res, next) => {
  try {
    let id = req.params.id
    await Course.findOneAndDelete({ _id: id })
  } catch (error) {
    console.log(error)
  }
}

import fs from "fs"
import Course from "../models/course.model.mjs"
import mongoose from "mongoose"
const courses = []

mongoose.connect("mongodb://127.0.0.1:27017/selfservice").then(async () => {
  const file = fs.readFileSync("./seeders/courses.json", "utf-8")
  const data = await JSON.parse(file)

  data.forEach((course) => {
    const newCourse = new Course({
      subject: course.subject,
      number: parseInt(course.number),
      name: course.name,
      section: parseInt(course.section),
      crn: parseInt(course.crn),
      slot: course.slot,
      schedule: course.schedule,
    })

    newCourse.save()
  })
  console.log("Added all courses")
  // mongoose.disconnect()
})

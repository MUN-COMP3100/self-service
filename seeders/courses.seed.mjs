import fs from "fs"
import Course from "../models/course.model.mjs"

const file = fs.readFileSync("./seeders/courses.json", "utf-8")
const data = await JSON.parse(file)

const seed = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      for (const course of data) {
        const newCourse = new Course({
          subject: course.subject,
          number: parseInt(course.number),
          name: course.name,
          section: parseInt(course.section),
          crn: parseInt(course.crn),
          slot: course.slot,
          schedule: course.schedule,
        })

        await newCourse.save()
      }
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

seed().finally(async () => {
  Course.db.close()
})
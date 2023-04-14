import assert from "assert"
import Course from "../models/course.model.mjs"
import axios from "axios"
import { ObjectId } from "mongodb"

const create = axios.create

var url = `http://localhost:3000/api`

const instance = create({
  baseURL: url,
  timeout: 5000,
  headers: { "content-type": "application/json" },
})

describe("Course test", function () {
  describe("Test Read operation", function () {
    it("GET /course/:id with valid id", async function () {
      const courses = await Course.find()
      const course = courses[0]

      let res = await instance.get(`/course/${course.id}`)
      assert.equal(res.data.subject, course.subject)
    })
  })
  describe("Test Create operation", function () {
    it("POST /course with a new object", async function () {
      let newObj = new Course({
        subject: "TEST",
        number: 1515,
        name: "Test name",
        section: "4",
        crn: 80084,
        slot: "15",
        schedule: [],
      })
      let res = await instance.post("/course", newObj)
      let fetched = await instance.get(`/course/${res.data._id}`)

      assert.equal(fetched.data.number, 1515)
    })
  })
  describe("Test Update operation", function () {
    it("PUT /course:id with valid id", async function () {
      const courses = await Course.find()
      const course = courses[0]

      let res = await instance.put(`/course/${course.id}`, { slot: "69" })
      const courseToUpdate = await Course.findOne({
        _id: new ObjectId(course.id),
      })
      assert.equal(courseToUpdate.slot, res.data.slot)
    })
  })
  describe("Test Delete operation", function () {
    it("DELETE /course:id with valid id", async function () {
      const courses = await Course.find()
      const courseToDelete = courses[0]

      await instance.delete(`/course/${courseToDelete.id}`)

      const deletedCourse = await Course.findOne({ _id: courseToDelete.id })

      assert.equal(deletedCourse, undefined)
    })
  })
})

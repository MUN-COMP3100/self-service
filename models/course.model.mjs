import { model, Schema } from "mongoose";


const courseSchema = new Schema({
  subject: String,
  number: Number,
  name: String,
  section: String,
  crn: Number,
  room: String,
  type: String,
  slot: String,
  schedule: {}
})

export default model('Course', courseSchema)
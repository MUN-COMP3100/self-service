import { model, Schema } from "mongoose";


const courseSchema = new Schema({
  subject: String,
  number: Number,
  name: String,
  section: Number,
  crn: Number,
  room: String,
  type: String,
  slot: Number,
  schedule: {}
})

export default model('Course', courseSchema)
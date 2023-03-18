import { Schema } from "mongoose";
import db from '../db/index.mjs'

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

export default db.model('Course', courseSchema)
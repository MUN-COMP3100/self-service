import { Schema } from "mongoose"
import db from "../db/index.mjs"

const studentSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  username: String,
  password: String,
  favorites: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
})

export default db.model("Student", studentSchema)

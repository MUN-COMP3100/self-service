import { Schema } from "mongoose"
import db from "../db/index.mjs"

const studentSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  username: String,
  password: String,
  favorite: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
})

export default db.model("Student", studentSchema)

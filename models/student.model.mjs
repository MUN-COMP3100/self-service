import { Schema } from "mongoose";
import db from "../db/index.mjs"

const studentSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  username: String,
  password: String
})

export default db.model('Student', studentSchema)
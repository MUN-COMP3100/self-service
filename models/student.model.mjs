import { model, Schema } from "mongoose";


const studentSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  username: String,
  password: String
})

export default model('Student', studentSchema)
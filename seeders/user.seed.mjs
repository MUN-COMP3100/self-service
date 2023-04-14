import Student from "../models/student.model.mjs"
import bcrypt from 'bcryptjs'

const users = [
  {
    first_name: "test",
    last_name: "user",
    username: "user",
    password: "user123",
    email: "user@exmple.com"
  }
]

const seed = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      for (const user of users) {
        const { first_name, last_name, email, username, password } = user

        // * Encrypt Password
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const student = new Student({
          first_name,
          last_name,
          email,
          username,
          password: hash,
        })

        await student.save()

        console.log("User Created:")
        console.log(`Username: ${username}`)
        console.log(`Password: ${password}`)

      }
      resolve()
    } catch (error) {
      
      if (error.code === 11000) {
        console.log("User Seed Error => User already exists")
      } else {
        console.log(error)
      }
      reject(error)
    }
  })
}


seed().finally(() => {
  Student.db.close()
}).catch(err => {
  Student.db.close()
})
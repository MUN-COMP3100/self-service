import axios from 'axios'
import assert from 'assert'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
})

const user = `hamood` + Math.floor(Math.random() * 1000)


describe('Test Student Registeration', () => {
  it('should create a student user in database', async () => {
    const res = await axiosInstance.post('/student/', {
      username: user,
      password: '12345',
      email: "mbalfaqih@mun.ca"
    }, {withCredentials: true})

    assert.equal(res.data.username, user)
  })
  it('should throw an error because user already exist', async () => {

    try {
      await axiosInstance.post('/student/', {
        username: user,
        password: '12345',
        email: "mbalfaqih@mun.ca"
      }, {withCredentials: true})
    } catch (error) {
      assert.equal(error.response.status, 409)
    }
  })

})
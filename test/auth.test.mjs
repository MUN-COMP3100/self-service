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


describe('Authentication Login Test', () => {
  it('should create a session for logged on user', async () => {
    const loginRes = await axiosInstance.post('/auth/login', {
      username: 'hamood',
      password: '12345'
    }, {withCredentials: true})

    let cookies = loginRes.headers['set-cookie'].pop().split(';')[0]
    const res = await axiosInstance.get('/auth/me', {
      headers: {
        Cookie: cookies
      }
    })
    assert.equal(res.data.username, 'hamood')
  })
})
import axios from "axios"
import assert from "assert"

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

const username = `hamood` + Math.floor(Math.random() * 1000)
const password = "12345"
const email = "mbalfaqih@mun.ca"

describe("Authentication Login Test", () => {
  before(async () => {
    const res = await axiosInstance.post("/student/", {
      username,
      password,
      email,
    })
  })
  it("should create a session for logged on user", async () => {
    const loginRes = await axiosInstance.post(
      "/auth/login",
      {
        username,
        password,
      },
      { withCredentials: true }
    )

    let cookies = loginRes.headers["set-cookie"].pop().split(";")[0]
    const res = await axiosInstance.get("/auth/me", {
      headers: {
        Cookie: cookies,
      },
    })
    assert.equal(res.data.username, username)
  })
})

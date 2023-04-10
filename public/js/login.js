
const loginForms = document.getElementById('loginForm')
const errorBox = document.getElementById('error')

loginForms.addEventListener("submit", async (e) => {
  e.preventDefault()

  const usernameInput = document.getElementById('username')
  const passwordInput = document.getElementById('password')

  try {
    await axios.post('/api/auth/login', {
      username: usernameInput.value,
      password: passwordInput.value
    }, {
      withCredentials: true
    })

    window.location.replace('http://localhost:3000')
  } catch (error) {
    errorBox.classList.remove('hidden')
  }
})
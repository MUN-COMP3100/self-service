const registerForm = document.getElementById('registerForm')
const errorBox = document.getElementById('error')

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const data = {}

  data['first_name'] = document.getElementById('first_name').value
  data['last_name'] = document.getElementById('last_name').value
  data['email'] = document.getElementById('email').value
  data['username'] = document.getElementById('username').value
  data['password'] = document.getElementById('password').value

  try {
    await axios.post('/api/student', data)
    window.location.href = '/'
  } catch (error) {
    if (error.response.status === 409) {
      errorBox.classList.remove('hidden')
    }
  }
})
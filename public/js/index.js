const logoutBtn = document.getElementById('logoutBtn')

logoutBtn.addEventListener('click', async (e) => {
  try {
    await axios.post('/api/auth/logout')
    window.location.replace('http://localhost:3000/login')
  } catch (error) {
    
  }
})
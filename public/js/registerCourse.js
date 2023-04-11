
const coursesContainer = document.getElementById('courses')
const successMessage = document.getElementById('success')
const failedMessage = document.getElementById('fail')

coursesContainer.addEventListener("click", async (e) => {
  const isRegisterButton = e.target.nodeName === "BUTTON" && e.target.classList.contains('registerBtn')
  if (!isRegisterButton) return
  const id = e.target.dataset.course;
  
  try {
    const res = await axios.get('/api/auth/me')
    const student = res.data
    const found = student.courses.find(c => c.id === id)
    if (found) return showMessage(false, "You are already registered for this course.")
    await axios.post(`/api/student/course/${id}`)
    showMessage(true, "Registered for Course Successfully")
  } catch (error) {
    console.log(error)
    showMessage(false, "Failed to Register Course")
  }
})

const showMessage = (success, message) => {
  if (success) {
    failedMessage.classList.add('hidden')
    successMessage.innerHTML = message
    successMessage.classList.remove('hidden')
  } else {
    successMessage.classList.add('hidden')
    failedMessage.innerHTML = message
    failedMessage.classList.remove('hidden')
  }
 
}
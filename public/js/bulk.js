const inputsForm = document.getElementById('inputs')
const inputs = document.querySelectorAll('input')
const failedMessage = document.getElementById("error")
const successMessage = document.getElementById("success")

inputsForm.addEventListener("submit", async (e) => {
  e.preventDefault()
  const crns = []
  Array.from(inputsForm.elements).forEach(input => {
    const value = input.value
    if (value) {
      crns.push(value)
    }
  })
  if (crns.length < 1) return
  try {
    await axios.post("/api/student/bulk", {
      crn_list: crns
    })
    showMessage(true, "Registered for all courses succesfully")
  } catch (error) {
    if (error.response.status === 409 || error.response.status === 404) {
      showMessage(false, error.response.data.messages[0])
    } else {
      showMessage(false, "Unexpected error")
    }
    
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
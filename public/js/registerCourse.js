
const coursesContainer = document.getElementById('courses')
const successMessage = document.getElementById('success')
const failedMessage = document.getElementById('fail')

coursesContainer.addEventListener("click", async (e) => {
  const isRegisterButton = e.target.nodeName === "BUTTON" && e.target.classList.contains('registerBtn')
  const isViewScheduleButton = e.target.nodeName === "BUTTON" && e.target.classList.contains('scheduleBtn')
  const isFavoriteButton = e.target.nodeName === "BUTTON" && e.target.classList.contains('favoriteBtn')

  if (isRegisterButton) {
    const id = e.target.dataset.course;

    try {
      const res = await axios.get('/api/auth/me')
      const student = res.data
      
      const found = student.courses.find(c => c._id === id)
      if (found) return showMessage(false, "You are already registered for this course.")
      await axios.post(`/api/student/course/${id}`)
      showMessage(true, "Registered for Course Successfully")
    } catch (error) {
      if (error.response?.status === 409) {
        showMessage(false, error.response.data.messages[0] || "This course has a time conflict with another course")
      } else {
        showMessage(false, "Failed to Register Course")
      }

    }
  } else if (isViewScheduleButton) {
    const id = e.target.dataset.course;
    const modal = document.getElementById(`modal-${id}`)

    modal.addEventListener("click", (eModal) => {
      const isCloseBtn = eModal.target.nodeName === "BUTTON" && eModal.target.classList.contains('closeBtn')
      if (!isCloseBtn) return
      modal.classList.add('hidden')
    })
    modal.classList.remove('hidden')
  } else if (isFavoriteButton) {
    const id = e.target.dataset.course;

    try {
      const res = await axios.get('/api/auth/me')
      const student = res.data
      const found = student.favorites.find(c => c._id === id)
      
      if (found) {
        // delete favorite
        await axios.delete(`/api/favorite/${id}`)
        showMessage(true, "Removed from favorites")
      }else { 
        // add to favorite
        await axios.post(`/api/favorite/${id}`)
        showMessage(true, "Added to favorites")
      }
      
    } catch (error) {
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
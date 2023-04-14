

// * Stats
const courseCount = document.getElementById("courseCount")
const favoriteCount = document.getElementById("favoriteCount")
const registeredCourses = document.getElementById("courses")
const favoriteCourses = document.getElementById("favorite")

const successMessage = document.getElementById('success')
const failedMessage = document.getElementById('fail')

axios.get('/api/auth/me').then(res => {
  const data = res.data

  courseCount.innerHTML = data.courses.length + " Courses"
  favoriteCount.innerHTML = data.favorites.length + " Courses"

  data.courses.forEach((course, i) => {
    registeredCourses.innerHTML = registeredCourses.innerHTML + courseHTML(course, "reg", "deleteBtn")
  })

  data.favorites.forEach((course, i) => {
    favoriteCourses.innerHTML = favoriteCourses.innerHTML + courseHTML(course, "fav", "unfavBtn")
  })
})

// * Delete Course
registeredCourses.addEventListener("click", async (e) => {
  const isDeleteBtn = e.target.nodeName === "BUTTON" && e.target.classList.contains('deleteBtn')
  if (isDeleteBtn) {
    const id = e.target.dataset.course;
    const courseContainer = document.getElementById(`reg-${id}`)

    try {
      await axios.delete(`/api/student/course/${id}`)

      registeredCourses.removeChild(courseContainer)
      courseCount.innerHTML = registeredCourses.children.length + " Courses"

      showMessage(true, "Dropped Course Successfully")
    } catch (error) {
      showMessage(true, "Failed to Drop Course")
    }
  }
})

favoriteCourses.addEventListener("click", async (e) => {
  const isUnFavBtn = e.target.nodeName === "BUTTON" && e.target.classList.contains('unfavBtn')
  if (isUnFavBtn) {
    const id = e.target.dataset.course;
    const courseContainer = document.getElementById(`fav-${id}`)
    try {
      await axios.delete(`/api/favorite/${id}`)

      favoriteCourses.removeChild(courseContainer)
      favoriteCount.innerHTML = favoriteCourses.children.length + " Courses"

      showMessage(true, "Removed from favorites successfully")
    } catch (error) {
      console.log(error)
      showMessage(false, "Failed to remove from favorites")
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


const courseHTML = (course, type, btnName) => {
  return (`
  <li
            class="h-20 bg-white p-3 rounded-xl flex justify-between items-center"
            data-subject="${course.subject}"
            id="${type}-${course._id}"
            >
            <div>
              <span class="flex gap-1">
                <i data-feather="book"></i>
                ${course.subject} | ${course.number} 
              </span>
              <span class="text-sm text-gray-500 mt-4">
                 ${course.name} |
              </span>
              <span class="text-sm text-gray-500 mt-4">
                SEC: ${course.section} |
              </span>
              <span class="text-sm text-gray-500 mt-4">
                CRN: ${course.crn} 
              </span>
            </div>
            <div class="flex flex-col items-end gap-1">
              <div class="flex gap-2">
                <i data-feather="users" width="20px"></i>
                <span></span>
              </div>
              <button
                data-course="${course._id}"
                class="bg-red-500 text-white p-1 text-sm rounded-lg ${btnName}"
              >
                Remove
              </button>
            </div>
          </li>`)
}
const logoutBtn = document.getElementById('logoutBtn')

// * Logout
logoutBtn.addEventListener('click', async (e) => {
  try {
    await axios.post('/api/auth/logout')
    window.location.replace('http://localhost:3000/login')
  } catch (error) {

  }
})

// * Stats
const courseCount = document.getElementById("courseCount")
const favoriteCount = document.getElementById("favoriteCount")
const registeredCourses = document.getElementById("courses")

const successMessage = document.getElementById('success')
const failedMessage = document.getElementById('fail')

axios.get('/api/auth/me').then(res => {
  const data = res.data
  console.log(data)
  courseCount.innerHTML = data.courses.length + " Courses"
  favoriteCount.innerHTML = data.favorites.length + " Courses"

  data.courses.forEach((course, i) => {
    registeredCourses.innerHTML = registeredCourses.innerHTML + `
    <li
							class="h-20 bg-white p-3 rounded-xl flex justify-between items-center"
              data-subject="${course.subject}"
              id="${course._id}"
              >
							<div>
								<span class="flex gap-1">
									<i data-feather="book"></i>
									${course.subject} | ${course.number}
								</span>
								<span class="text-sm text-gray-500 mt-4">
									 ${course.name}
								</span>
							</div>
							<div class="flex flex-col items-end gap-1">
								<div class="flex gap-2">
									<i data-feather="users" width="20px"></i>
									<span></span>
								</div>
								<button
                  data-course="${course._id}"
									class="bg-red-500 text-white p-1 text-sm rounded-lg deleteBtn"
								>
									Delete Course
								</button>
							</div>
						</li>`
  })
})

// * Delete Course
registeredCourses.addEventListener("click", async (e) => {
  const isDeleteBtn = e.target.nodeName === "BUTTON" && e.target.classList.contains('deleteBtn')
  if (!isDeleteBtn) return

  const id = e.target.dataset.course;
  const courseContainer = document.getElementById(id)
  
  try {
    const res = await axios.delete(`/api/student/course/${id}`)
    
    registeredCourses.removeChild(courseContainer)
    
    showMessage(true, "Dropped Course Successfully")
  } catch (error) {
    showMessage(true, "Failed to Drop Course")
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
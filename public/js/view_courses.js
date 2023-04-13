
const selectSubject = document.getElementById('filter')
const coursesList = document.getElementById('courses')

selectSubject.addEventListener('change', e => {
  const selected = selectSubject.value

  const courses = coursesList.children
  

  for (let i = 0; i < courses.length; i++) {
    const course = courses[i];
    if (selected === 'all') {
      course.classList.remove('hidden')
    }
    else {
      if (course.dataset.subject === selected) {
        course.classList.remove('hidden')
      } else {
        course.classList.add('hidden')
      }
    }
  }

})
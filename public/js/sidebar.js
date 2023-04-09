

const hamburgerButton = document.getElementById("hamburger")
const sidebar = document.getElementById("sidebar")
hamburgerButton.addEventListener("click", () => {
  const isHidden = sidebar.classList.contains("hidden")
  if (isHidden) {
    sidebar.classList.add("flex")
    sidebar.classList.remove("hidden")
  } else {
    sidebar.classList.remove("flex")
    sidebar.classList.add("hidden")
  }
})
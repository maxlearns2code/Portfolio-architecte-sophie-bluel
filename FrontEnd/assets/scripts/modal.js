function showModification () {
    const modification = document.querySelector(".modal")
    modification.classList.add("active")
}

function showModal() {
    const modalBackground = document.querySelector(".modalBackground")
    modalBackground.classList.add("active")
}
function hideModal() {
    const modalBackground = document.querySelector(".modalBackground")
    modalBackground.classList.remove("active")
}

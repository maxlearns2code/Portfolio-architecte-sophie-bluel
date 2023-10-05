function showModal() {
    const modalBackground = document.querySelector(".modalBackground")
    modalBackground.classList.add("active")
}
function hideModal() {
    const modalBackground = document.querySelector(".modalBackground")
    modalBackground.classList.remove("active")
}


document.querySelectorAll(".js-modal")
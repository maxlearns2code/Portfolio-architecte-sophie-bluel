function showModification () {
    const modification = document.querySelector(".modification")
    const elementsModification = document.createElement(".div")
    elementsModification.innerHTML = `<img src=""./assets/icons/modifier.svg" alt="Modifier"><p>"Modifier"</p>`

    modification.appendChild(imgModification)
}

function showModal() {
    const modalBackground = document.querySelector(".modalBackground")
    modalBackground.classList.add("active")
}
function hideModal() {
    const modalBackground = document.querySelector(".modalBackground")
    modalBackground.classList.remove("active")
}

let projects = []

async function init() {
    await loadWorks()
    await loadCategories()
    resetFilter()
} 
init()

//add a function to load the works from the API
async function loadWorks() {
    const responseWorks = await fetch(`http://localhost:5678/api/works`);
    const works = await responseWorks.json();
    projects=works
    // show all projects by API
    works.forEach((work,id) => {
        showProjects(work)
        /*
        const imageElement = document.createElement("img");
        imageElement.src = detailsWorks.imageUrl;

        const titleElement = document.createElement("figcaption");
        titleElement.innerText = detailsWorks.title;
        */

        /*
        article.appendChild(imageElement);
        article.appendChild(titleElement);
        */  
    });
    const trashs = document.querySelectorAll(".trashBtn")
    trashs.forEach((trash) => {
        trash.addEventListener("click", (event) => {
            event.preventDefault()
            const workId = trash.dataset.id
            removeProjectById(workId)
            console.log(workId)
        })
    })
    
    /*
    for (let i = 0; i < works.length; i++) {
       //show the first project by API
        const detailsWorks = works[i];
    }
    */    
}

//add a function to load the categories from the API
async function loadCategories() {
    const responseCategories = await fetch(`http://localhost:5678/api/categories`);
    const categories = await responseCategories.json();
    // show all categories by API
    for (let i = 0; i < categories.length; i++) {
        const detailsCategories = categories[i];
    
        const showCategories = document.querySelector(".filters")
    
        const nameElement = document.createElement("button");
        nameElement.innerText = detailsCategories.name;
        
        //activate the buttons
        nameElement.addEventListener("click", () => {
            //add the filter method
            const projectsFiltered = projects.filter( (project) => {
                return project.category.id === detailsCategories.id
            })
            const showWorks = document.querySelector(".gallery")
            //reset HTML elements
            showWorks.innerHTML = ""
            //show the projects filtered
            projectsFiltered.forEach(work => {
                showProjects(work)
            });
        })       
    
        showCategories.appendChild(nameElement);        
     }    
}

//add a function to show the projects
function showProjects (work,filter=false) {
    const showWorks = document.querySelector(".gallery")

    const article = document.createElement("figure");
    article.innerHTML = `<img src="${work.imageUrl}" max-width="608" max-height="814" alt="${work.title}"><figcaption>${work.title}</figcaption>`
    showWorks.appendChild(article);

    const showWorksInModal = document.querySelector(".modal-projects")

    const articleInModal = document.createElement("figure");
    articleInModal.innerHTML = `<img src="${work.imageUrl}" width="77" height="103" alt="${work.title}"><button class="trashBtn" data-id="${work.id}"><img src="./assets/icons/trash.svg" alt="supprimer"></button>`
    showWorksInModal.appendChild(articleInModal);
    
    
}


//add a function to reset the filters
function resetFilter() {
    const btnAll = document.querySelector(".btnAll")
    //activate the btn All
    btnAll.addEventListener("click", () => {
        const showWorks = document.querySelector(".gallery")
        //reset HTML elements
        showWorks.innerHTML = ""
        loadWorks()
    })
}

if(window.localStorage.getItem("token") !== null) {
    const loginBtn = document.querySelector(".login")

    loginBtn.innerHTML = "logout";

    document.querySelector(".filters").style.display = "none";

    const portfolioHeader = document.querySelector(".portfolioHeader")

    const elementsEdit = document.createElement("div")
    elementsEdit.innerHTML =`<img src="./assets/icons/edit.svg" alt="Modifier"><p>Modifier</p>`
    portfolioHeader.appendChild(elementsEdit)
    
    loginBtn.addEventListener('click', (event) => {
        event.preventDefault();
        window.localStorage.removeItem('token');
        window.location = "index.html";
    }) 
}

const focusableSelector = "button, a, input, textarea"
let focusables = []

function openModal() {
    const openModal = document.querySelector(".portfolioHeader div")
    openModal.addEventListener("click", (event) => {
        event.preventDefault()
        const modal=document.querySelector("#modal")
        focusables = Array.from(modal.querySelectorAll(focusableSelector))
        modal.style.display = null
        modal.removeAttribute("aria-hidden")
        modal.setAttribute("aria-modal", true)
        console.log(openModal)
    })    
}
openModal()

function addProject() {
    const addPictureBtn = document.querySelector(".addPictureBtn")    
    addPictureBtn.addEventListener("click", (event) => {
        const projectInModal = document.querySelector(".projectInModal")
        projectInModal.style.display = "none"
        const formAddProject = document.querySelector(".formAddProject")
        formAddProject.style.display = null
        backToModalInProject()        
    })
}
addProject()

function backToModalInProject() {
    const arrowLeft = document.querySelector(".arrow-left")
    arrowLeft.addEventListener("click", (event) => {
        const projectInModal = document.querySelector(".projectInModal")
        projectInModal.style.display = null
        const formAddProject = document.querySelector(".formAddProject")
        formAddProject.style.display = "none"
    }) 
}

function closeModal() {
    const closeModals = document.querySelectorAll(".xmark")
    closeModals.forEach( (closeModal)=> {
        closeModal.addEventListener("click", (event) => {
            event.preventDefault()
            const modal=document.querySelector("#modal")
            modal.style.display = "none"
            modal.setAttribute("aria-hidden", true)
            modal.removeAttribute("aria-modal")
            const openModal = document.querySelector(".portfolioHeader div")
            openModal.removeEventListener("click", () => {    
            })
            console.log(closeModal)
        })  
    })    
}
closeModal()

const focusInModal = function (event) {
    event.preventDefault()
    let index = focusables.findIndex(f => f === modal.querySelector(":focus"))
    if (event.shiftKey === true) {
        index--
    }
    else {
        index++
    }        
    if (index >= focusables.length) {
        index = 0
    }
    if (index < 0 ) {
        index = focusables.length - 1
    }
    focusables[index].focus()
    console.log(index)

}

window.addEventListener("keydown", function (event) {
    if (event.key === "Escape" || event.key === "Esc") {
        closeModal(event)
    }
    if (event.key === "Tab" && modal !== null) {
        focusInModal(event)
    }
})

async function removeProjectById(id) {
    const token = localStorage.getItem("token")
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    if (response.ok) {
        const galleryProjects = document.querySelector(".gallery") 
        galleryProjects.innerHTML = "" 
        const modalProjects = document.querySelector(".modal-projects") 
        modalProjects.innerHTML = "" 
        loadWorks()
        console.log("Image supprimée avec succès");
    } else {
        alert("Erreur lors de la suppression de l'image");
    }
}

const input = document.getElementById('file-upload');
const previewPhoto = () => {
    const file = input.files;
    if (file) {
        const fileReader = new FileReader();
        const preview = document.getElementById('file-preview');
        fileReader.onload = function (event) {
            preview.setAttribute('src', event.target.result);
            const insertImgBtn = document.querySelector(".insert-imgBtn")
            insertImgBtn.style.display = "none"
            const insertImgText = document.querySelector(".insert-img p")
            insertImgText.style.display = "none"
        }
        fileReader.readAsDataURL(file[0]);
    }
}
input.addEventListener("change", previewPhoto);

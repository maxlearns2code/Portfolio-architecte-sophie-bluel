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
        trash.addEventListener("click", (e) => {
            e.preventDefault()
            const workId = trash.dataset.id
            removeProjectById(workId)
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

//redirection after login
if(window.localStorage.getItem("token") !== null) {
    const loginBtn = document.querySelector(".login")
    //add button logout
    loginBtn.innerHTML = "logout";
    //disabled the filters
    document.querySelector(".filters").style.display = "none";
    //create mofification element
    const portfolioHeader = document.querySelector(".portfolioHeader")
    const elementsEdit = document.createElement("div")
    elementsEdit.innerHTML =`<img src="./assets/icons/edit.svg" alt="Modifier"><p>Modifier</p>`
    portfolioHeader.appendChild(elementsEdit)
    const openModal = document.querySelector(".portfolioHeader div")
    openModal.addEventListener("click", showModal) 
    //redirection after logout
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.localStorage.removeItem('token');
        window.location = "index.html";
    }) 
}

/*try to create focusable selector
const focusableSelector = "button, a, input, textarea"
let focusables = []*/

//show modal 
function showModal() {    
    const modal=document.querySelector("#modal")
    // focusables = Array.from(modal.querySelectorAll(focusableSelector))
    modal.style.display = null
    modal.removeAttribute("aria-hidden")
    modal.setAttribute("aria-modal", true)   
}

//add new project in portfolio
const addPictureBtn = document.querySelector(".addPictureBtn")
addPictureBtn.addEventListener("click", (e) => {
    addProject()    
})
//function to add new project
function addProject() {    
    const projectInModal = document.querySelector(".projectInModal")
    projectInModal.style.display = "none"
    const formAddProject = document.querySelector(".formAddProject")
    formAddProject.style.display = null
}
// button to go back in modal
const arrowLeft = document.querySelector(".arrow-left")
arrowLeft.addEventListener("click", (e) => {
    backToModalInProject()
}) 
//function to go back
function backToModalInProject() {    
    const projectInModal = document.querySelector(".projectInModal")
    projectInModal.style.display = null
    const formAddProject = document.querySelector(".formAddProject")
    formAddProject.style.display = "none"   
}
// close modal by clicking on the cross mark or outside the modal
function closeModal() {
    const closeModals = document.querySelectorAll(".xmark")
    closeModals.forEach( (closeModal)=> {
        closeModal.addEventListener("click", (e) => {
            e.preventDefault()
            resetModal()
        })  
    })    
    const modal = document.querySelector(".modal")
    modal.addEventListener("click", (e) => {
        e.preventDefault()
        resetModal()
    })
    //stop the close modal propagation 
    const modalWrapper = document.querySelector(".modal-wrapper")
    modalWrapper.addEventListener("click", (e) => {
        e.stopPropagation()
    })
}
closeModal()
//function hide modal
function resetModal() {
    const modal=document.querySelector("#modal")
    modal.style.display = "none"
    modal.setAttribute("aria-hidden", true)
    modal.removeAttribute("aria-modal")
    const projectInModal = document.querySelector(".projectInModal")
    projectInModal.style.display = null
    const formAddProject = document.querySelector(".formAddProject")
    formAddProject.style.display = "none"
    const openModal = document.querySelector(".portfolioHeader div")
    openModal.removeEventListener("click", () => {    
    })
}
/*
const focusInModal = function (e) {
    e.preventDefault()
    let index = focusables.findIndex(f => f === modal.querySelector(":focus"))
    if (e.shiftKey === true) {
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
*/
//reset modal with escape touch
window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        resetModal(e)
    }
    /*
    if (e.key === "Tab" && modal !== null) {
        focusInModal(e)
    }
    */
})
//function to remove project
async function removeProjectById(id) {
    const token = localStorage.getItem("token")
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    if (response.ok) {
        reinitializeProjects()
        loadWorks()
        console.log("Image supprimée avec succès");
    } else {
        alert("Erreur lors de la suppression de l'image");
    }
}
//add preview picture in modal when we add a new project
const input = document.getElementById('file-upload');
const previewPhoto = () => {
    const file = input.files;
    if (file) {
        const fileReader = new FileReader();
        const preview = document.getElementById('file-preview');
        fileReader.onload = function (e) {
            preview.setAttribute('src', e.target.result);
            const insertImgBtn = document.querySelector(".insert-imgBtn")
            insertImgBtn.style.display = "none"
            const insertImgText = document.querySelector(".insert-img p")
            insertImgText.style.display = "none"
        }
        fileReader.readAsDataURL(file[0]);
    }
}
input.addEventListener("change", previewPhoto);
// add new project when the forms are complete
function addProjectModal() {
    const form = document.querySelector("#form2")
    form.addEventListener("submit", async (e) => {
        e.preventDefault()
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        console.log(data)
        let imageUrl = document.getElementById("file-upload").files[0];
        let title = document.getElementById("title").value;
        let categoryId = document.getElementById("category-select").value;
        if(imageUrl == null){
            alert("Veuillez choisir un image")
            return; 
        }
        if(title == ""){
            alert("Veuillez choisir un titre")
            return;
        }
        if(categoryId == ""){
            alert("Veuillez choisir une categorie")
            return;
        }        
        const token = localStorage.getItem("token")
        const response = await fetch("http://localhost:5678/api/works", {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        })
        if (response.ok) {
            reinitializeProjects()
            loadWorks()
            resetModal()
            console.log("projet ajouté avec succès");
        } else {
            alert("Erreur lors de l'ajout du projet");
        }
    })
}
addProjectModal()
//function to reinitialize projects
function reinitializeProjects() {
    const galleryProjects = document.querySelector(".gallery") 
    galleryProjects.innerHTML = "" 
    const modalProjects = document.querySelector(".modal-projects") 
    modalProjects.innerHTML = "" 
}
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
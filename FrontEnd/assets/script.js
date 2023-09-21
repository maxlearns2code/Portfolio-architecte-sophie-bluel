//add a function to load the works from the API
async function loadWorks() {
    const responseWorks = await fetch(`http://localhost:5678/api/works`);
    const works = await responseWorks.json();
    // show all projects by API
    for (let i = 0; i < works.length; i++) {
       //show the first project by API
        const detailsWorks = works[i]; 
        
        const showWorks = document.querySelector(".gallery")

        const article = document.createElement("figure");

        const imageElement = document.createElement("img");
        imageElement.src = detailsWorks.imageUrl;

        const titleElement = document.createElement("figcaption");
        titleElement.innerText = detailsWorks.title;

        showWorks.appendChild(article);
        article.appendChild(imageElement);
        article.appendChild(titleElement); 
    }
    
}
loadWorks()

//add a function to load the categories from the API
async function loadCategories() {
    const responseCategories = await fetch(`http://localhost:5678/api/categories`);
    const categories = await responseCategories.json();
    console.log(responseCategories)
    // show all categories by API
    for (let j = 0; j < categories.length; j++) {
        const detailsCategories = categories[j];
        console.log(detailsCategories)
    
        const showCategories = document.querySelector(".filters")
    
        const nameElement = document.createElement("button");
        nameElement.innerText = detailsCategories.name;    
    
        showCategories.appendChild(nameElement); 
     }
}
loadCategories()
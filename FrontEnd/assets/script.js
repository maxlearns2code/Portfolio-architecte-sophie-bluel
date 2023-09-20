//add a function to load the works from the API
async function loadWorks() {
    const responseWorks = await fetch(`http://localhost:5678/api/works`);
    const works = await responseWorks.json();
    
    //show the first project by API
    const detailsWorks = works[0];    

    const article = document.createElement("figure");

    const imageElement = document.createElement("img");
    imageElement.src = detailsWorks.imageUrl;

    const titleElement = document.createElement("figcaption");
    titleElement.innerText = detailsWorks.title;

    const showWorks = document.querySelector(".gallery")

    showWorks.appendChild(article);
    article.appendChild(imageElement);
    article.appendChild(titleElement);
}
loadWorks()
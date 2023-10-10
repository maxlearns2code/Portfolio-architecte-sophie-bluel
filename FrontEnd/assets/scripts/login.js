const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    // add the preventDefault() method
    event.preventDefault();
    redirection()    
});

// add function redirection by API
async function redirection() {
    let baliseEmail = document.getElementById("email")
    let emailValue = baliseEmail.value

    let baliseMdp = document.getElementById("pass")
    let passwordValue = baliseMdp.value

    // add fetch API to validate authentification
    const response = await fetch("http://localhost:5678/api/users/login", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: emailValue,
            password: passwordValue
        })
    })

    if ( response.statusText === "OK") {
        //save token
        const result = await response.json()
        window.localStorage.setItem("token", result.token)
        //redirection
        window.location = "index.html"
        
    }
    else {
        //alert
        const alert = document.querySelector(".alert")
        alert.style.display = null
        const alertBtn = document.querySelector(".alertBtn")
        alertBtn.addEventListener('click', (event) => {
            event.preventDefault();
            window.location = "login.html";
        })
    }  
}
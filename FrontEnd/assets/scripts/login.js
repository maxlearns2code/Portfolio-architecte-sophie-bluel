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

    console.log(emailValue, passwordValue)

    // add fetch API to validate authentification
    const response = fetch("http://localhost:5678/api/users/login", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: emailValue,
            password: passwordValue
        })
    })
    console.log(response)

    if ( (await response).statusText === "OK") {
        window.location.href="index.html"
    }
    else {
        alert("Erreur dans l’identifiant ou le mot de passe")
    }  
}
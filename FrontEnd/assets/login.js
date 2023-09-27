const form = document.querySelector('form');

form.addEventListener("submit", (event) => {
    // add the preventDefault() method
    event.preventDefault();

    redirection()
    
});
// add function redirection with test account
function redirection() {
    let baliseEmail = document.getElementById("email")
    let email = baliseEmail.value

    let baliseMdp = document.getElementById("pass")
    let pass = baliseMdp.value

    // the redirection works if the login is correct
    if (email === "sophie.bluel@test.tld" && pass === "S0phie") {
        window.location.href="index.html"
    }
    else {
        alert("Nom d'utilisateur ou mot de passe incorrect.")
    }
}
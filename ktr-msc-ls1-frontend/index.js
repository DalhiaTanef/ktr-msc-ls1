const baseUrl = "http://localhost:5000/api/v1/user"

const connexionSubmit = (e) => {
    e.preventDefault();
    fetch(baseUrl + "/login", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: document.getElementById("emailConnexion").value,
            password: document.getElementById("passwordConnexion").value
        }),
        mode: "cors",

    })
        .then((response) => response.json())
        .then(data => {
            window.localStorage.setItem("user", JSON.stringify(data))
            window.location="./dashboard.html"
        })
        .catch(err => {
            alert("Veuillez vérifier l'adresse mail et le mot de passe.")
            console.error(err)

        })
}

const registerSubmit = e => {
    e.preventDefault();
    fetch(baseUrl + "/register", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: document.getElementById("name").value,
            companyName: document.getElementById("companyName").value,
            phoneNumber: document.getElementById("phone").value,
            email: document.getElementById("emailRegister").value,
            password: document.getElementById("passwordRegister").value
        }),
        mode: "cors",

    })
        .then((response) => response.json())
        .then(data => {
            window.localStorage.setItem("user", data)
            window.location="./dashboard.html"
        })
        .catch(err => {
            alert("Erreur interne")
            console.error(err)
        })
}

const formConnexion = document.getElementById("connexionForm")
formConnexion.addEventListener("submit", connexionSubmit)

const formRegister = document.getElementById("registerForm")
formRegister.addEventListener("submit", registerSubmit)
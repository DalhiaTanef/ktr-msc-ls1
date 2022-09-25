const baseUrl = "http://localhost:5000/api/v1/user"

let user = window.localStorage.getItem("user")
if (!user) {
    window.location = "./index.html"
} else {
    user = JSON.parse(user)
}

const displayCards = () => {
    fetch(baseUrl + "/cards", {
        method: "PATCH", headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json'
        }, body: JSON.stringify({
            userId: user._id,
        }), mode: "cors",
    })
        .then(response => response.json())
        .then(cards => {
            console.log(cards)
            cards.forEach(card => {
                const cardElement = document.createElement("div");
                cardElement.classList.add("col-3","cardItem")
                const cardName = document.createElement("p")
                cardName.textContent = "Nom : " + card.name
                cardElement.appendChild(cardName)
                const cardCompanyName = document.createElement("p")
                cardCompanyName.textContent = "Company name : " + card.companyName
                cardElement.appendChild(cardCompanyName)
                const cardEmail = document.createElement("p")
                cardEmail.textContent = "Email : " + card.email
                cardElement.appendChild(cardEmail)
                const cardPhone = document.createElement("p")
                cardPhone.textContent = "Telephone : " + card.phoneNumber
                cardElement.appendChild(cardPhone)
                cardsList.appendChild(cardElement)
            })
        })

}

const addCards = (e) => {
    e.preventDefault();
    fetch(baseUrl + "/card", {
        method: "PATCH", headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json'
        }, body: JSON.stringify({
            userId: user._id,
            name: document.getElementById("name").value,
            companyName: document.getElementById("companyName").value,
            phoneNumber: document.getElementById("phone").value,
            email: document.getElementById("email").value,
        }), mode: "cors",
    })
        .then(response => response.json())
        .then(data => {
            window.localStorage.setItem("user", JSON.stringify(data))
            document.location.reload()
        })
        .catch(err => {
            alert("Erreur interne")
            console.error(err)
        })
}
console.log("Chargement de la page")
const cardsList = document.getElementById("cardsList")
const addCardForm = document.getElementById("addCardForm")
addCardForm.addEventListener("submit", addCards)
displayCards()
if(user.cards.length === 0)
    cardsList.textContent = "Aucune carte"
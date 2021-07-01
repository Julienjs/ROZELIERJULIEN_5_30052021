// // récupération du local storage 
// let recuperationPanier = JSON.parse(localStorage.getItem("produit"));
let panier = recuperationDuPanier();
// // affichage du panier
const sectionPanier = document.querySelector('#conteneurPanier');
const listeProduit = document.querySelector('#listeProduit');
const prixTotalElement = document.querySelector('#prixTotal');
// let structureProduitPanier = "";
// // si le panier est vide j'affiche
if (panier.length === 0) {
    listeProduit.style.display = "none";
    document.querySelector("#sousTotal").style.display = "none";
    conteneurPanier.style.height = "400px";
    formulaire.style.display = "none";
    document.querySelector(".viderLePanier").style.display = "none";

    listeProduitVide.innerHTML +=
        `<p class="panierVide">Votre panier est vide</p>
        <button class=" btn btnPanierVide" onclick="window.location.href ='index.html';">Voir les produits disponible</button> 
        `
} else {
    for (let produit of panier) {
        listeProduitVide.style.display = "none";
        listeProduit.innerHTML +=
            `
        <article class="articlePanier">
        <div class="articlePhotoPanier">           
           <img class="photoPeluche photoPeluchePanier" alt="photo de ours en peluche" src="${produit.imageUrl}" title="Ours en peluche"/>
           <p class="quantitePanier"><span class="gras">Quantité</span> : ${produit.quantite}</p>
           <p class="couleur"><span class="gras">Couleur</span>: ${produit.color}</p>
        </div>   
        <div class="descriptionPanier">
               <p class="descriptionArticle"><span class="gras">${produit.name}</span>, ${produit.description}</p>
               <h3 class="prix prixPanier">${produit.price / 100}€</h3>     
               <button class="btn btnSupprimer btnBlack" data-id="${produit._id}" data-color="${produit.color}">Supprimer
               </button>             
        </div>    
            <div class="popup">
            <div class="textePopup">
                <p>Article supprimer</p>
            </div>
        </div>                             
        </article > 
         
 `
    }

    // } if (i === panier.length) {
    //     sectionPanier.innerHTML = structureProduitPanier;
}
//supprimer un article du panierproduit
let btnSupprimer = document.querySelectorAll(".btnSupprimer");
for (let btn of btnSupprimer) {
    btn.addEventListener("click", (event) => {
        supprimerUnArticle({
            _id: event.target.dataset.id,
            color: event.target.dataset.color
        });
        event.target.closest(".articlePanier").remove();
        window.location.reload();
        afficherTotal();
        ouvrirPopUp();
    })
}

//Prix total du panier 
function afficherTotal() {
    prixTotalElement.innerHTML = ` ${prixTotal()}€`;
}
afficherTotal();
//insertion du bouton vider panier dans le HTML
document.querySelector(".viderLePanier").addEventListener("click", function () {
    viderPanier();
    window.location.reload();
});

document.querySelector("#coordoneesClient .btn").addEventListener("click", function (e) {
    e.preventDefault();
    if (document.querySelector("#coordoneesClient").reportValidity()) {

        let contact = {
            lastName: document.getElementById("nom").value,
            firstName: document.getElementById("prenom").value,
            address: document.getElementById("adresse").value,
            city: document.getElementById("ville").value,
            email: document.getElementById("email").value
        };
        let products = [];
        for (let produit of panier) {
            products.push(produit._id);
        }
        const commande = { contact, products };
        console.log(commande);
        const envoi = {
            method: "POST",
            body: JSON.stringify(commande),
            headers: {
                "Content-Type": "application/json"
            },
        };

        fetch('http://localhost:3000/api/teddies/order', envoi)
            .then(res => res.json())
            .then(res => {
                if (res.orderId) {
                    viderPanier();
                    let confirmation = {
                        lastName: res.contact.lastName,
                        firstName: res.contact.firstName,
                        address: res.contact.address,
                        city: res.contact.city,
                        orderId: res.orderId
                    }
                    localStorage.setItem("confirmation", JSON.stringify(confirmation));
                    window.location.assign(`/front-end/confirmation.html`);
                }
            })

    }
})









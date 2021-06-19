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
    sectionPanier.innerHTML +=
        `<p class="panierVide">Votre panier est vide</p>
    <button class="btn"><a href="index.html">Voir les produits disponible</a></button>
    `

} else {
    for (let produit of panier) {
        let prixProduit = produit.price / 100 * produit.quantite;
        listeProduit.innerHTML +=
            `
        <article class="articlePanier"> 
            <button class="btn btnSupprimer" data-id="${produit._id}" data-color="${produit.color}">
               <i class="far fa-trash-alt"></i>
            </button>  
        <img class="photoPeluchePanier" alt="photo de ours en peluche" src="${produit.imageUrl}" title="Ours en peluche"/>
            <div class="descriptionPanier">
               <p class="descriptionArticle"><span class="gras">${produit.name}</span>, ${produit.description}</p>
               <p class="quantitePanier"><span class="gras">Quantité</span> : ${produit.quantite}</p>
               <p class="couleur"><span class="gras">Couleur</span>: ${produit.color}</p>
               <h3 id="prix">${produit.price / 100}€</h3>                      
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
        afficherTotal();

    })
}

//Prix total du panier 
function afficherTotal() {
    prixTotalElement.innerHTML = ` ${prixTotal()}€`;
}
afficherTotal();
//insertion du bouton vider panier dans le HTML
const viderLePanier = `<button class=" btn ViderLePanier">vider le panier</button>`;
sectionPanier.insertAdjacentHTML("beforeend", viderLePanier);


//formulaire
function recuperationDuFormulaire() {
    let inputs = document.getElementsTagByName("input");
    let formulaire = localStorage.getItem("formulaire");
    for (let i = 0; i < inputs.length; i++) {
        if (!inputs[i].value) {
            erreur = "Veuillez renseigner tous les champs";
        }
    }
    if (erreur) {
        e.preventDefault();
        document.getElementById("erreur").innerHTML = erreur;
        return false;
    } else {
        alert('Coordonées envoyé !');
        return JSON.parse(formulaire);
    }
}
function ajoutCoordonnee(coordonees) {
    let formulaire = recuperationDuFormulaire();
    localStorage.setItem("formulaire", JSON.stringify(panier));
}

document.forms["coordoneesClient"].addEventListener("submit", function (e) {
    ajoutCoordonnee({


    })
});


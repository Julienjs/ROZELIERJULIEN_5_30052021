// // récupération du local storage 
// let recuperationPanier = JSON.parse(localStorage.getItem("produit"));
let panier = JSON.parse(localStorage.getItem("panier"));
// // affichage du panier
const sectionPanier = document.querySelector('#conteneurPanier');
let structureProduitPanier = "";
let prixTotal = [];
// // si le panier est vide j'affiche
if (panier === null || panier == 0) {
    sectionPanier.innerHTML +=
        `<p class="panierVide">Votre panier est vide</p>
    <button><a href="index.html">voir les produits disponible</a></button>
    `

} else {
    for (i = 0; i < panier.length; i++) {
        let prixProduit = panier[i].price / 100 * panier[i].quantite;
        prixTotal.push(prixProduit);
        structureProduitPanier = structureProduitPanier +
            `
        <article class="produit"> 
        <h2 id="titrePanier">Votre panier</h2>
            <img class="photoPeluche" alt="photo de ours en peluche" src="${panier[i].imageUrl}" title="Ours en peluche"/>
             <div class="description">
               <h3>${panier[i].name}</h3>
               <p class="descriptionArticle">${panier[i].description}</p>
               <h3 id="prix">${panier[i].price / 100}€</h3>
               </div>
               <select name="quantite" id="quantite">
                    <option value="">${panier[i].quantite}</option>
                </select> 
                <button class="btnSupprimer">
                <i class="fas fa-times"></i>
            </button>         
       </article >
 `
    }
} if (i === panier.length) {
    sectionPanier.innerHTML = structureProduitPanier;
}

//supprimer un article du panier 
let btnSupprimer = document.querySelectorAll(".btnSupprimer");

for (let i = 0; i < btnSupprimer.length; i++) {
    btnSupprimer[i].addEventListener("click", (event) => {
        event.preventDefault();
        let idSuppression = panier[i]._id;
        panier = panier.filter(produit => produit._id !== idSuppression);
        localStorage.setItem("panier", JSON.stringify(panier));
        alert(`l'article a bien été supprimer du panier`)
        document.location.reload();
    });
}

//vider le panier 
const viderLePanier = `<button id="ViderLePanier">vider le panier</button>`;
sectionPanier.insertAdjacentHTML("beforeend", viderLePanier);
// const ViderLePanier = document.getElementById("ViderLePanier");
//suppression de la key panier
document.getElementById("ViderLePanier").addEventListener("click", (event) => {
    localStorage.removeItem("panier");
    alert("le panier a été vidé");
    document.location.reload();

})

//Prix total du panier 
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const calculPrixPanier = prixTotal.reduce(reducer, 0);
let affichageTotalPrix = `<div id="prixTotal">Sous-Total: ${calculPrixPanier}€</div>`;
sectionPanier.insertAdjacentHTML("beforeend", affichageTotalPrix);

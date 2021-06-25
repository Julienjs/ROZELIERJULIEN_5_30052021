
function ajoutPanier(produit) {
    let panier = recuperationDuPanier();
    let produitTrouve = panier.find(p => p._id == produit._id && p.color == produit.color);
    if (produitTrouve == undefined) {
        panier.push(produit);
    } else {
        produitTrouve.quantite += produit.quantite;
    }
    enregistrerPanier(panier);

}

function recuperationDuPanier() {
    let panier = localStorage.getItem("panier");
    if (panier == null) {
        return [];
    } else {
        return JSON.parse(panier);
    }
}

function supprimerUnArticle(produit) {
    let panier = recuperationDuPanier();
    panier = panier.filter(p => p._id !== produit._id || p.color !== produit.color);
    enregistrerPanier(panier);
}

function enregistrerPanier(panier) {
    localStorage.setItem("panier", JSON.stringify(panier));

}
function viderPanier() {
    localStorage.removeItem("panier");

}

function prixTotal() {
    let panier = recuperationDuPanier();
    let total = 0;
    for (let produit of panier) {
        total += produit.price / 100 * produit.quantite;
    }
    return total;
}




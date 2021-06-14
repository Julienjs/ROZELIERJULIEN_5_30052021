


function ajoutPanier(produit) {
    let panier = recuperationDuPanier();
    let produitTrouve = panier.find(p => p._id == produit._id && p.color == produit.color);
    if (produitTrouve == undefined) {
        panier.push(produit);
    } else {
        produitTrouve.quantite += produit.quantite;
    }

    localStorage.setItem("panier", JSON.stringify(panier));
}

function recuperationDuPanier() {
    let panier = localStorage.getItem("panier");
    if (panier == null) {
        return [];
    } else {
        return JSON.parse(panier);
    }
}



//récuperation de la chaîne de requête dans l'url
const recuperationUrlId = window.location.search;//window.location=Récupère/définit l'emplacement, ou l'URL en cours, de l'objet de fenêtre.
//search est une propriéter qui récupère la partie de l'URL qui suit le symbole "?"


//extraire l'ID 
const extractionID = new URLSearchParams(recuperationUrlId);
//variable contenant le constructeur (URLSearchPparams) précédent de l'opérateur new avec la variable qui récupère mon URL

const ID = extractionID.get("id")
//La syntaxe get permet de lier une propriété d'un objet à une fonction qui sera appelée lorsqu'on accédera à la propriété.
const conteneurProduit = document.getElementById('conteneurProduit');
//récupération de tout les éléments de l'ID dans l'API
fetch(`http://localhost:3000/api/teddies/${ID}`)
    .then(res => {
        //then=methode + suivis d'une fonction flécher nommer res(response) qui me donne la réponse de l'API
        if (res.ok) {
            //ok est un booléaen statuant qu'il s'agit d'une réponse indiquant un succès
            res.json()
                //json transforme le format de mon API pour qu'il soit lisible par les différents navigateur
                .then(element => {
                    let colorElement = "";
                    element.colors.forEach(color => {
                        colorElement += `<option value="${color}">${color}</option>`;
                    })
                    //forEach permet de selectionner tout les articles de mon tableau et l'attribuer a ma fonction data
                    //création d'un élément section dans ma fonction élément
                    conteneurProduit.innerHTML +=
                        //innerHTML me permet d'écrire du code html en lui injectant les élément de mon API 
                        `
                        <article class="article articleProduit">      
                                 <div class=" description descriptionProduit">
                                 <img class="photoPeluche photoPelucheProduit" alt="photo de ours en peluche" src="${element.imageUrl}" title="Ours en peluche"/>
                                  <div class="descriptif"> 
                                 <h2>${element.name}</h2> <!-- $ permet d'ajouter ma variable suivis de l'element que l'on souhaite soustraire dans l'API--> 
                                   <p>${element.description}</p>  
                                     <div class="formulaireSelect">
                                       <form action="#">
                                          <label for="choixCouleur">Couleur:</label >  
                                              <select name="choixCouleur" id="choixCouleur">
                                                  ${colorElement}
                                              </select >    
                                       </form>
                                       <h3 class="prix prixProduit">${element.price / 100}€</h3>
                                       <form action="#">
                                          <label for="quantite">Quantité:</label>
                                            <select name="quantite" id="quantite">
                                               <option class="optQuantite" value="1">1</option>
                                               <option class="optQuantite" value="2">2</option>
                                               <option class="optQuantite" value="3">3</option>
                                               <option class="optQuantite" value="4">4</option>
                                               <option class="optQuantite" value="5">5</option>
                                               <option class="optQuantite" value="6">6</option>
                                               <option class="optQuantite" value="7">7</option>
                                               <option class="optQuantite" value="8">8</option>
                                               <option class="optQuantite" value="9">9</option>
                                               <option class="optQuantite" value="10">10</option>
                                            </select>
                                       </form> 
                                     </div>
                                       </div>   
                                 </div>      
                        </article >
                          <div class="bouton">        
                              <button id="ajoutPanier" class="btn btnBlack">Ajouter au panier</button>
                              <button class="btn" onclick="window.location.href ='index.html';">Continuer vos achats</button>
                              <button class="btn btnBlack" onclick="window.location.href ='panier.html';">Voir le panier</button>
                         </div>  
                        `

                    document.getElementById("ajoutPanier").addEventListener('click', function () {
                        ajoutPanier({
                            name: element.name,
                            price: element.price,
                            description: element.description,
                            imageUrl: element.imageUrl,
                            color: document.getElementById("choixCouleur").value,
                            quantite: parseInt(document.getElementById("quantite").value),
                            _id: element._id
                        });
                        ouvrirPopUp();
                    });
                });
        }
    });
function ouvrirPopUp() {
    let popUp = document.querySelector(".popup");
    popUp.classList.add('show');
    setTimeout(function () {
        popUp.classList.remove('show');
    }, 3000);

}








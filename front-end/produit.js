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
                        <article class="produit article"> 
                                <img class="photoPelucheProduit" alt="photo de ours en peluche" src="${element.imageUrl}" title="Ours en peluche"/>
                                 <div class="description">
                                   <h2>${element.name}</h2> <!-- $ permet d'ajouter ma variable suivis de l'element que l'on souhaite soustraire dans l'API--> 
                                   <p>${element.description}</p>  
                                     <div class="formulaire">
                                       <form action="">
                                          <label for="choixCouleur"></label >  
                                              <select name="choixCouleur" id="choixCouleur"  class="select">
                                                  ${colorElement}
                                              </select >    
                                       </form>
                                       <form action="">
                                          <label for="quantite"></label>
                                            <select name="quantite" id="quantite" class="select">
                                               <option class="optQuantite" value="1">1</option>
                                               <option class="optQuantite" value="2">2</option>
                                               <option class="optQuantite" value="3">3</option>
                                               <option class="optQuantite" value="4">4</option>
                                               <option class="optQuantite" value="5">5</option>
                                               <option class="optQuantite" value="6">6</option>
                                            </select>
                                       </form> 
                                     </div>   
                                        <h3 id="prix">${element.price / 100}€</h3>
                                 </div>      
                        </article >
                          <div class="bouton">        
                              <button id="ajoutPanier" class="btn btnPanier grdBtn">Ajouter au panier</button>
                              <button class="btn grdBtn" onclick="window.location.href ='panier.html';">Voir le panier</button>
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
                        alert(`l'article ${element.name} été ajouté au panier`)
                    });
                });
        }
    });







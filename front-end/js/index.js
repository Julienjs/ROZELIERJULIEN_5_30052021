//récupération de L'API et insérer les éléments dans ma page HTML
fetch('http://localhost:3000/api/teddies')
    //récupération de  l'URL de l'API avec fetch
    .then(res => {
        //then=promise + suivis d'un callback nommer res(response) qui me donne la réponse de l'API
        if (res.ok) {
            //si la reponse est ok alors ...
            //ok est un booléaen statuant qu'il s'agit d'une réponse indiquant un succès
            res.json()
                //json transforme le format de mon API pour qu'il soit lisible par les différents navigateur
                .then(data => {
                    //récupération de mon format json + callback nommer data pour récuperer tout mon tableau de mon api
                    data.forEach(element => {
                        //forEach permet de parcourir mon tableau data
                        conteneurArticlesIndex.innerHTML +=
                            //selection de ma section conteneurArticles et j'insère du code dans HTML(innerHTML+=)
                            `
                               <article class="articleIndex">
                                  <a href="../front-end/produit.html?id=${element._id}"> <!-- ? permet de selctionner l'ID d'un produit de l'API pour l'envoyer sur ma page produit-->
                                  <div class="description descriptionIndex "> 
                                  <img class="photoPeluche photoPelucheIndex" alt="photo de ours en peluche" src="${element.imageUrl}" title="Ours en peluche"/>                     
                                      <div class="descriptionDesktop"> 
                                         <h2>${element.name}</h2> <!-- $ permet d'ajouter ma variable suivis de l'element que l'on souhaite soustraire dans l'API-->
                                         <p>${element.description}</p>
                                         <p class="prix">${element.price / 100}€</p>
                                      </div> 
                                  </div>
                                  </a>
                               </article>
                           `
                    });
                });
        } else {
            throw new Error('Erreur de chargement !')
        }
    }).catch(function (erreur) {
        conteneurArticlesIndex.innerHTML = "<strong>Erreur de chargement !</strong>"
        console.log(erreur)
    }
    )








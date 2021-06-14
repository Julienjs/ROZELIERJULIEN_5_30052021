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
                        conteneurArticles.innerHTML +=
                            //selection de ma section conteneurArticles et j'insère du code dans HTML(innerHTML+=)
                            `
                               <article class="article">
                                  <a href="../front-end/produit.html?id=${element._id}"> <!-- ? permet de selctionner l'ID d'un produit de l'API pour l'envoyer sur ma page produit--> 
                                    <img class="photoPeluche" alt="photo de ours en peluche" src="${element.imageUrl}" title="Ours en peluche"/>
                                     <div class="flex">
                                       <h2>${element.name}</h2> <!-- $ permet d'ajouter ma variable suivis de l'element que l'on souhaite soustraire dans l'API-->
                                       <h3>${element.price / 100}<strong>€</strong></h3>
                                     </div>
                                    <p>${element.description}</p>
                                  </a>
                               </article>
                           `
                    });
                });
        } else {
            console.log(erreur);
        }
    });









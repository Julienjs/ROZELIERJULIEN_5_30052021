let confirmation = JSON.parse(localStorage.getItem("confirmation"));
document.getElementById("confirmation").innerHTML +=
    `
    <article class="commande">
        <p><span class ="FSize">Merci pour votre commande</span><br>${confirmation.firstName} ${confirmation.lastName}</p>
        <p><span class ="FSize">Votre numéro de commande:</span><br>${confirmation.orderId}</p>
        <p><span class ="FSize">Votre commande sera livré à l'adresse suivante:</span><br>${confirmation.address} <br>${confirmation.city}</strong></p>
        <p><span class ="FSize">Un mail de confirmation vous à été envoyé sur: </span><br>${confirmation.email}</p>
    </article>    
    `
localStorage.removeItem("confirmation");
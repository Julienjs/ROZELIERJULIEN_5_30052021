let confirmation = JSON.parse(localStorage.getItem("confirmation"));
document.getElementById("confirmation").innerHTML +=
    `
        <p>Merci pour votre commande <br><strong>${confirmation.lastName} ${confirmation.firstName}</strong> &#x2705;</p>
        <p>Votre numéro de commande <br><strong>${confirmation.orderId}</strong></p>
        <p>Votre commande seras livré a l'adresse suivante: <br><strong>${confirmation.address} <br>${confirmation.city}</strong></p>
    `;
localStorage.removeItem("confirmation");
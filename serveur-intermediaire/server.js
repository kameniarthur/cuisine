const express = require('express');
const fetch = require('node-fetch'); // Pour faire la requête vers ton script Google Apps
const app = express();

// Utilisation de JSON pour les requêtes et réponses
app.use(express.json());

// La route qui recevra les requêtes de ton formulaire
app.post('/submit-form', async (req, res) => {
  const googleScriptURL = "https://script.google.com/macros/s/AKfycbzbAmZ9MJylHsGCXLmeyOJAUUW5iGuKcXhgRNJK5zorIwBlFZ7Ga8SJ48sov_ivBtCN/exec";

  try {
    // On envoie la requête POST à Google Apps Script avec les données du formulaire
    const response = await fetch(googleScriptURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    // Si tout se passe bien, on renvoie la réponse à l'utilisateur
    if (response.ok) {
      const result = await response.text();
      res.status(200).send({ message: 'Candidature envoyée avec succès', data: result });
    } else {
      res.status(500).send({ message: 'Erreur dans l\'envoi des données à Google Apps Script' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Erreur lors de la requête vers Google Apps Script', error });
  }
});

// Démarre le serveur
const port = 3000;
app.listen(port, () => {
  console.log(`Serveur intermédiaire en écoute sur le port ${port}`);
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async function(e) {
    e.preventDefault(); // Stoppe l'envoi classique

    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
      if (data[key]) {
        if (!Array.isArray(data[key])) {
          data[key] = [data[key]];
        }
        data[key].push(value);
      } else {
        data[key] = value;
      }
    });

    const googleScriptURL = "https://script.google.com/macros/s/AKfycbzbAmZ9MJylHsGCXLmeyOJAUUW5iGuKcXhgRNJK5zorIwBlFZ7Ga8SJ48sov_ivBtCN/exec";

    try {
      const response = await fetch(googleScriptURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        mode: "no-cors"  // Ajout du mode no-cors
      });

      // Avec "no-cors", tu ne pourras pas vérifier la réponse ici.
      alert("✅ Candidature envoyée avec succès !");
      form.reset(); // Réinitialise le formulaire
    } catch (error) {
      alert("❌ Une erreur est survenue lors de l'envoi.");
      console.error("Erreur : ", error);
    }
  });
});

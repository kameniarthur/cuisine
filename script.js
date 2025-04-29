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

  // 🟢 Remplace cette URL par celle générée par ton Apps Script
  const googleScriptURL = "https://script.google.com/macros/s/AKfycbwtmAlq6RZZ2Od2DwEYjWMpw0bVkrGdZHpRVkOmM5DPn3QJj8-PB67jqH7XRExmydJk/exec";

  try {
    const response = await fetch(googleScriptURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Échec de l'envoi");
    const result = await response.text(); // Apps Script renvoie juste du texte

    alert("✅ Candidature envoyée avec succès !");
    form.reset(); // Réinitialise le formulaire
  } catch (error) {
    alert("❌ Une erreur est survenue lors de l'envoi.");
    console.error("Erreur : ", error);
  }
});

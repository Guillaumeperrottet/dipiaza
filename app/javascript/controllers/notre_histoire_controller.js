import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    console.log("Notre Histoire Controller connecté");

    const containers = document.querySelectorAll(".content-container");

    const handleScroll = () => {
      containers.forEach((container, index) => {
        const rect = container.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          // Ajouter la classe "show" uniquement à la section visible
          containers.forEach((c) => c.classList.remove("show")); // Masquer toutes les autres
          container.classList.add("show");
        }
      });
    };

    // Exécuter l'effet de scroll au chargement initial
    handleScroll();

    // Attacher l'événement scroll
    window.addEventListener("scroll", handleScroll);
  }
}

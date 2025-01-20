import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["navbar"]; // Définit les cibles pour Stimulus

  connect() {
    console.log("Navbar Controller connecté");

    // Associe un événement de défilement à la fenêtre
    window.addEventListener("scroll", this.toggleNavbar.bind(this));
  }

  disconnect() {
    // Nettoie l'événement de défilement quand le contrôleur est déconnecté
    window.removeEventListener("scroll", this.toggleNavbar.bind(this));
  }

  toggleNavbar() {
    const navbar = this.element; // Référence à l'élément racine contrôlé (navbar)
    if (window.scrollY === 0) {
      // Si la position de défilement est tout en haut, montrer la navbar
      navbar.classList.remove("hidden");
    } else {
      // Sinon, cacher la navbar
      navbar.classList.add("hidden");
    }
  }
}

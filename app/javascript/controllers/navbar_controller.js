import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    console.log("Navbar Controller connecté");

    // Dernière position de défilement
    this.lastScrollPosition = 0;

    // Cacher la navbar par défaut
    this.element.classList.add("hidden");

    // Associe l'événement de défilement à la fenêtre
    window.addEventListener("scroll", this.toggleNavbar.bind(this));
  }

  disconnect() {
    // Nettoie l'événement de défilement quand le contrôleur est déconnecté
    window.removeEventListener("scroll", this.toggleNavbar.bind(this));
  }

  toggleNavbar() {
    const currentScrollPosition = window.scrollY;

    if (currentScrollPosition > this.lastScrollPosition) {
      // Défilement vers le bas : montrer la navbar
      this.element.classList.add("visible");
      this.element.classList.remove("hidden");
    } else if (currentScrollPosition < this.lastScrollPosition) {
      // Défilement vers le haut : cacher la navbar
      this.element.classList.add("hidden");
      this.element.classList.remove("visible");
    }

    // Mettre à jour la dernière position de défilement
    this.lastScrollPosition = currentScrollPosition;
  }
}

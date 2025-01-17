import { Application } from "@hotwired/stimulus"

const application = Application.start()

// Configure Stimulus development experience
application.debug = false
window.Stimulus   = application

export { application }

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");

  // Écouter le défilement de la page
  window.addEventListener("scroll", () => {
    if (window.scrollY === 0) {
      // Si la position de défilement est tout en haut, montrer la navbar
      navbar.classList.remove("hidden");
    } else {
      // Sinon, cacher la navbar
      navbar.classList.add("hidden");
    }
  });
});

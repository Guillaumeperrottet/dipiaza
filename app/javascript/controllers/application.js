import { Application } from "@hotwired/stimulus"

const application = Application.start()

// Configure Stimulus development experience
application.debug = false
window.Stimulus   = application

export { application }

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar"); // Sélectionnez la navbar
  let lastScrollTop = 0;
  const scrollThreshold = 10; // Seuil en pixels avant d'activer l'effet
  let isNavbarHidden = false; // État pour éviter des animations inutiles

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    // Vérifie si le seuil est atteint
    if (Math.abs(currentScroll - lastScrollTop) > scrollThreshold) {
      if (currentScroll > lastScrollTop && !isNavbarHidden) {
        // Scroll vers le bas
        navbar.style.transform = "translateY(-100%)"; // Cache la navbar
        isNavbarHidden = true;
      } else if (currentScroll < lastScrollTop && isNavbarHidden) {
        // Scroll vers le haut
        navbar.style.transform = "translateY(0)"; // Affiche la navbar
        isNavbarHidden = false;
      }
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Évite les valeurs négatives
  });
});

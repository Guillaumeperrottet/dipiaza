import { Application } from "@hotwired/stimulus"

const application = Application.start()

// Configure Stimulus development experience
application.debug = false
window.Stimulus   = application

export { application }

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  let lastScrollPosition = 0;

  window.addEventListener("scroll", () => {
    const currentScrollPosition = window.scrollY;

    if (currentScrollPosition > lastScrollPosition) {
      // Masque la navbar quand on défile vers le bas
      navbar.style.top = "-80px";
    } else {
      // Affiche la navbar quand on défile vers le haut
      navbar.style.top = "0";
    }

    lastScrollPosition = currentScrollPosition;
  });
});

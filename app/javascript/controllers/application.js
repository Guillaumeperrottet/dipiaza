import { Application } from "@hotwired/stimulus"

const application = Application.start()

// Configure Stimulus development experience
application.debug = false
window.Stimulus   = application

export { application }

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar"); // Sélectionnez la navbar
  let lastScrollTop = 0;
  let isNavbarHidden = false; // État pour éviter des animations inutiles

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScroll > lastScrollTop && !isNavbarHidden) {
        // Scroll vers le bas
        navbar.style.transform = "translateY(-100%)"; // Cache la navbar
        isNavbarHidden = true;
      } else if (currentScroll < lastScrollTop && isNavbarHidden) {
        // Scroll vers le haut
        navbar.style.transform = "translateY(0)"; // Affiche la navbar
        isNavbarHidden = false;
      }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Évite les valeurs négatives
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const menuBlocks = document.querySelectorAll(".menu-block");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.2 }
  );

  menuBlocks.forEach((block) => observer.observe(block));
});

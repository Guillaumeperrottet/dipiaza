import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["map"];

  connect() {
    console.log("Google Maps Controller connecté");
    this.loadGoogleMapsAPI();
    this.DirectionButtons();
  }

  loadGoogleMapsAPI() {
    if (document.querySelector("script[src*='maps.googleapis.com']")) {
      // console.log("Google Maps API déjà chargée");
      return;
    }

    // Récupérer la clé API depuis window.googleMapsApiKey
    const apiKey = window.googleMapsApiKey;

    window.initMap = this.initMap.bind(this);

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=marker`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }

  initMap() {
    // console.log("Google Maps API chargé et initMap exécuté");

    const cafes = [
      { id: 1, name: "Dipiaza Aigle", lat: 46.31681173472081, lng: 6.963752838433811 },
      { id: 2, name: "Dipiaza Bulle", lat: 46.63324, lng: 7.04878 },
      { id: 3, name: "Dipiaza Sierre", lat: 46.29622, lng: 7.55031 },
      { id: 4, name: "Dipiaza Yverdon", lat: 46.78135, lng: 6.64049 },
      { id: 5, name: "Dipiaza de la Souste", lat: 46.30336, lng: 7.65665 },
    ];

    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 8,
      center: { lat: cafes[0].lat, lng: cafes[0].lng },
      mapId: "b4f4c0c8903d1d38",
      gestureHandling: "cooperative",
    });

    const markers = [];

    cafes.forEach((cafe) => {
      const marker = new google.maps.Marker({
        position: { lat: cafe.lat, lng: cafe.lng },
        map: map,
        title: cafe.name,
      });
      markers.push(marker);

      marker.addListener("click", () => {
        this.highlightCafe(cafe.id);
        map.setZoom(14);
        map.setCenter(marker.getPosition());
      });
    });

    document.querySelectorAll(".cafe").forEach((element) => {
      element.addEventListener("click", () => {
        const cafeId = parseInt(element.dataset.id, 10);
        const cafe = cafes.find((c) => c.id === cafeId);
        this.highlightCafe(cafe.id);
        map.setZoom(14);
        map.setCenter({ lat: cafe.lat, lng: cafe.lng });
      });
    });

    // Ajouter les événements de survol
    document.querySelectorAll(".cafe").forEach((element, index) => {
      let hasBounced = false; // Garde une trace si l'animation a déjà eu lieu

      element.addEventListener("mouseenter", () => {
        if (!hasBounced) {
          const marker = markers[index];
          marker.setAnimation(google.maps.Animation.BOUNCE); // Lance l'animation

          // Arrête l'animation après 1 rebond (~700ms)
          setTimeout(() => {
            marker.setAnimation(null);
            hasBounced = true; // Marque l'animation comme effectuée
          }, 700);
        }
      });

      element.addEventListener("mouseleave", () => {
        hasBounced = false; // Réinitialise l'état lorsque la souris quitte la div
      });
    });
  }

  DirectionButtons() {
    document.querySelectorAll(".directions-icon").forEach((icon) => {
      icon.addEventListener("click", (event) => {
        event.preventDefault(); // Empêche le comportement par défaut du lien
        const lat = event.target.dataset.lat || event.target.parentElement.dataset.lat;
        const lng = event.target.dataset.lng || event.target.parentElement.dataset.lng;
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
        window.open(googleMapsUrl, "_blank"); // Ouvre dans un nouvel onglet
      });
    });
  }


  highlightCafe(cafeId) {
    document.querySelectorAll(".cafe").forEach((el) => el.classList.remove("active"));
    const activeCafe = document.querySelector(`.cafe[data-id="${cafeId}"]`);
    if (activeCafe) {
      activeCafe.classList.add("active");
    }
  }
}

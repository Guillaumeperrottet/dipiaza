import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["map"];

  connect() {
    console.log("Google Maps Controller connecté");
    this.loadGoogleMapsAPI();
  }

  loadGoogleMapsAPI() {
    if (document.querySelector("script[src*='maps.googleapis.com']")) {
      console.log("Google Maps API déjà chargée");
      return;
    }

    window.initMap = this.initMap.bind(this);

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAOO96yETIkw_pFBk80_iQD37srW6ZT9KU&callback=initMap&libraries=marker`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }

  initMap() {
    console.log("Google Maps API chargé et initMap exécuté");

    const cafes = [
      { id: 1, name: "Dipiaza Bulle", lat: 46.6165, lng: 7.0565 },
      { id: 2, name: "Dipiaza Fribourg", lat: 46.802, lng: 7.1515 },
    ];

    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 8,
      center: { lat: cafes[0].lat, lng: cafes[0].lng },
      mapId: "b4f4c0c8903d1d38",
    });

    cafes.forEach((cafe) => {
      const marker = new google.maps.Marker({
        position: { lat: cafe.lat, lng: cafe.lng },
        map: map,
        title: cafe.name,
      });

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
  }

  highlightCafe(cafeId) {
    document.querySelectorAll(".cafe").forEach((el) => el.classList.remove("active"));
    const activeCafe = document.querySelector(`.cafe[data-id="${cafeId}"]`);
    if (activeCafe) {
      activeCafe.classList.add("active");
    }
  }
}

// Pubblicato su github deve rimanere privato (?)
const map = L.map("map").setView([40.952199, 17.2977163], 17);
L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const user = prompt("Hello! What's your name?");
document.getElementById('user').textContent = `Hello ${user}!`;
const button = document.querySelector('.button');

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        const accuracy = position.coords.accuracy;
        const coordinates = [latitude, longitude];
        console.log(position);
        document.querySelector('.longitude').textContent = `Your longitude: ${longitude}`;
        document.querySelector('.latitude').textContent = `Your latitude: ${latitude}`;

        button.addEventListener("click", (e) => {
            e.preventDefault();
            const myMap = L.map('map').setView(coordinates, 16);
            const marker = L.marker(coordinates).addTo(myMap);
            const popup = L.popup({ maxWidth: 120 })
                .setLatLng(coordinates)
                .setContent(`<p>Geolocation accuracy in this api for your location is ${accuracy}m.</p>`)
                .openOn(myMap);
            marker.bindPopup(popup).openPopup();
            const tileLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1,
                accessToken: 'pk.eyJ1Ijoidm9sZGVyNzciLCJhIjoiY2tlMTJ1cW43NDB6MDJzcGFrYnVtN2UxeiJ9.5ST6fZIH26GjPMRogYU2pg'
            }).addTo(myMap);

        })

    });

} else {
    throw Error('Geolocation is not available')
}
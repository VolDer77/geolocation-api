const greeting = document.querySelector('.greeting');
const tempDiv = document.createElement('p');
const button = document.querySelector('.button');

tempDiv.textContent = 'Access your geolocation so the app works properly (top left corner)';
greeting.append(tempDiv);

const coordinates = {}; 

function createMap() {
    const myMap = L.map('map').setView([coordinates.lat, coordinates.lon], 16);
    const marker = L.marker([coordinates.lat, coordinates.lon]).addTo(myMap);
    const popup = L.popup({
        maxWidth: 120
    })
        .setLatLng([coordinates.lat, coordinates.lon])
        .setContent(`<p>Geolocation accuracy in this api for your location is ${coordinates.accur}m.</p>`)
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
}

try {
    navigator.geolocation.getCurrentPosition(position => {
        const longitude = position.coords.longitude;
        coordinates.lon = longitude;
        const latitude = position.coords.latitude;
        coordinates.lat = latitude;
        const accuracy = position.coords.accuracy;
        coordinates.accur = accuracy;
        console.log(coordinates);
        document.querySelector('.longitude').textContent = `Your longitude: ${longitude}`;
        document.querySelector('.latitude').textContent = `Your latitude: ${latitude}`;

        button.addEventListener("click", createMap, false);
        tempDiv.remove();

    }, () => {
        button.remove();
        throw new Error('Geolocation is not available');
    });

} catch (e) {
    console.log(e);
}
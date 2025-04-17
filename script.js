const map = L.map('map');

map.setView([41.8719, 12.5674], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let screenRectangle = L.rectangle(map.getBounds(), {
    color: "#C5B79F",
    weight: 0,
    fillColor: "#C5B79F",
    fillOpacity: 0.4
}).addTo(map);

function updateRectangleOverlay() {
    screenRectangle.setBounds(map.getBounds());
}

updateRectangleOverlay();

map.on('moveend', updateRectangleOverlay);
map.on('zoomend', updateRectangleOverlay);

window.addEventListener('resize', function() {
    map.invalidateSize();
    updateRectangleOverlay();
});

const regions = [
    { name: "Abruzzo", lat: 42.1517, lng: 13.6984, content: ["Sagne", "Quadrefiore"], icon: 'images/long_icon.png' },
    { name: "Basilicata", lat: 40.1397, lng: 15.9050, content: ["Fusilli", "Orecchiette", "Rigatoni", "Conchigliette"], icon: 'images/short_icon.png' },
    { name: "Calabria", lat: 38.9153, lng: 16.5942, content: ["Conchiglioni", "Puntine"], icon: 'images/filled_icon.png' },
    { name: "Campania", lat: 40.7392, lng: 14.7528, content: ["Fusilli", "Penne", "Ditali", "Cannelloni", "Capellini", "Mafalde", "Reginette", "Scialatielli", "Vermicelli", "Calamarata", "Cavatappi", "Chifferi", "Conchiglie", "Paccheri", "Ziti", "Fillini", "Puntine", "Caccavelle", "Cannelloni", "Conchiglioni"], icon: 'images/soup_icon.png' },
    { name: "Emilia-Romagna", lat: 44.3949, lng: 11.0426, content: ["Lasagne", "Tagliatelle", "Farfalle", "Cannelloni", "Tortellini", "Maltagliati", "Mezze Maniche", "Passatelli", "Farfalline", "Cappelletti", "Mezzelune", "Modena"], icon: 'images/long_icon.png' },
    { name: "Friuli Venezia Giulia", lat: 45.9511, lng: 13.0481, content: ["Gnocchi", "Tagliatelle"], icon: 'images/short_icon.png' },
    { name: "Lazio", lat: 41.8028, lng: 12.6674, content: ["Fettuccine", "Bucatini", "Sagne", "Sacchettoni"], icon: 'images/filled_icon.png' },
    { name: "Liguria", lat: 44.2115, lng: 8.8331, content: ["Penne", "Ravioli", "Linguine", "Trofie", "Acini Di Pepe"], icon: 'images/soup_icon.png' },
    { name: "Lombardia", lat: 45.3668, lng: 9.5905, content: ["Farfalle", "Gnocchi", "Farfalline", "Casoncelli"], icon: 'images/long_icon.png' },
    { name: "Marche", lat: 43.2167, lng: 13.2167, content: ["Stelle", "Passatelli", "Fillini", "Quadretti", "Stelle", "Cappelletti", "Mezzelune"], icon: 'images/short_icon.png' },
    { name: "Molise", lat: 41.5677, lng: 14.6588, content: ["Sagne", "Tagliolini", "Quadrefiore"], icon: 'images/filled_icon.png' },
    { name: "Piemonte", lat: 44.6703, lng: 7.7869, content: ["Tagliolini", "Lumache", "Agnolini", "Agnolotti"], icon: 'images/soup_icon.png' },
    { name: "Puglia", lat: 40.8257, lng: 16.2668, content: ["Fiori", "Gemelli", "Orecchiette", "Quadrefiore", "Rotelle"], icon: 'images/long_icon.png' },
    { name: "Sardegna", lat: 39.809, lng: 9.1055, content: ["Gnocchetti", "Culurgioni"], icon: 'images/short_icon.png' },
    { name: "Sicilia", lat: 37.22000, lng: 14.1667, content: ["Spaghetti", "Anelli", "Casarecce", "Maccheroni", "Rigatoni", "Anelli", "Occhi Di Passero", "Caramelle"], icon: 'images/filled_icon.png' },
    { name: "Toscana", lat: 43.0715, lng: 11.1486, content: ["Risoni", "Pappardelle", "Acini Di Pepe", "Risoni", "Fagottini"], icon: 'images/soup_icon.png' },
    { name: "Trentino-Alto Adige", lat: 46.0741, lng: 11.1214, content: ["Mezzelune"], icon: 'images/long_icon.png' },
    { name: "Umbria", lat: 42.8403, lng: 12.4367, content: ["Quadretti", "Stelle"], icon: 'images/short_icon.png' },
    { name: "Valle D'Aosta", lat: 45.4377, lng: 7.5006, content: ["Agnolotti"], icon: 'images/filled_icon.png' },
    { name: "Veneto", lat: 45.408, lng: 12.0155, content: ["Bigoli", "Gnocchi"], icon: 'images/soup_icon.png' }
];

function createIcon(iconPath) {
    let iconSize;

    if (iconPath.includes('long_icon')) {
        iconSize = [40, 40];
    } else if (iconPath.includes('short_icon')) {
        iconSize = [35, 35];
    } else if (iconPath.includes('filled_icon')) {
        iconSize = [30, 30];
    } else if (iconPath.includes('soup_icon')) {
        iconSize = [35, 35];
    }

    return new L.Icon({
        iconUrl: iconPath,
        iconSize: iconSize,
        iconAnchor: [iconSize[0] / 2, iconSize[1]],
        popupAnchor: [0, -iconSize[1]]
    });
}

function createPopupContent(region) {
    const listItems = region.content.map(item => `<li>${item}</li>`).join('');

    return `
        <div style="font-family: 'Darumadrop One', sans-serif;">
            <strong style="font-size: 1.5em;">${region.name}</strong><br> <!-- Title in bold with even larger font -->
            <ul>${listItems}</ul>  <!-- Unordered list of items -->
        </div>
    `;
}

regions.forEach(function(region) {
    const customIcon = createIcon(region.icon);

    const marker = L.marker([region.lat, region.lng], { icon: customIcon }).addTo(map);
    
    marker.bindPopup(createPopupContent(region));
});
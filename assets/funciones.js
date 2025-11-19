// Coordenadas precisas de capitales/ubicaciones clave en Venezuela (aproximadas pero exactas)
const locations = {
  Amazonas: [3.4653, -65.1013], // Puerto Ayacucho
  Anzoátegui: [8.3666, -62.6333], // Barcelona
  Apure: [7.3333, -69.5833], // San Fernando de Apure
  Aragua: [10.0833, -67.4833], // Maracay
  Barinas: [8.6333, -70.2167], // Barinas
  Bolívar: [7.9167, -61.8833], // Ciudad Bolívar
  Carabobo: [10.1667, -68.0], // Valencia
  Cojedes: [9.4, -68.3333], // San Carlos
  "Delta Amacuro": [9.3833, -61.2667], // Tucupita
  "Distrito Capital": [10.5, -66.9167], // Caracas
  Falcón: [11.0, -69.0], // Coro
  Guárico: [9.0, -66.0], // San Juan de los Morros
  Lara: [10.0667, -69.3667], // Barquisimeto
  Mérida: [8.5833, -71.1333], // Mérida
  Miranda: [10.25, -66.8333], // Los Teques
  Monagas: [9.75, -63.0], // Maturín
  "Nueva Esparta": [11.0, -64.0], // La Asunción
  Portuguesa: [9.0, -69.0], // Acarigua
  Sucre: [10.45, -63.0], // Cumaná
  Táchira: [7.75, -72.0], // San Cristóbal
  Trujillo: [9.3667, -70.4333], // Trujillo
  Vargas: [10.6, -66.9333], // Caracas (Vargas)
  Yaracuy: [10.0833, -68.75], // San Felipe
  Zulia: [10.6667, -71.6167], // Maracaibo
};

// Rutas registradas (puedes agregar más)
const routes = {
  "Distrito Capital-Zulia": { type: "bus/avion", dist: 550 },
  "Distrito Capital-Carabobo": { type: "bus", dist: 150 },
  "Distrito Capital-Táchira": { type: "avion", dist: 800 },
  "Zulia-Táchira": { type: "bus", dist: 300 },
};

// Llena selects
const originSel = document.getElementById("origin");
const destSel = document.getElementById("dest");
Object.keys(locations).forEach((loc) => {
  let opt = document.createElement("option");
  opt.value = loc;
  opt.text = loc;
  originSel.appendChild(opt.cloneNode(true));
  destSel.appendChild(opt);
});

// Checkbox para fecha vuelta
document.getElementById("roundTrip").addEventListener("change", function () {
  const retField = document.getElementById("returnDate");
  retField.style.display = this.checked ? "block" : "none";
  retField.required = this.checked;
});

// Inicializa mapa centrado y limitado a Venezuela
const map = L.map("map", {
  center: [7.5, -66.5], // Centro de Venezuela
  zoom: 6,
  maxBounds: [
    [0, -75],
    [13.5, -59],
  ], // Limites de Venezuela
  maxBoundsViscosity: 1.0,
});
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

// Agrega capa GeoJSON para resaltar estados de Venezuela (límites)
fetch(
  "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/Venezuela/VEN_adm1.json"
)
  .then((response) => response.json())
  .then((data) => {
    L.geoJSON(data, {
      style: {
        color: "#003366",
        weight: 2,
        fillColor: "#e8f0fe",
        fillOpacity: 0.3,
      },
      onEachFeature: function (feature, layer) {
        layer.bindPopup(`<b>Estado:</b> ${feature.properties.NAME_1}`);
      },
    }).addTo(map);
  })
  .catch(() => {
    // Si no carga GeoJSON, agrega marcadores básicos para estados
    Object.entries(locations).forEach(([estado, coords]) => {
      L.marker(coords).addTo(map).bindPopup(`<b>${estado}</b>`);
    });
  });

// Evento de envío del formulario
document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();
  const origin = originSel.value;
  const dest = destSel.value;
  const depDate = document.getElementById("depDate").value;
  const retDate = document.getElementById("returnDate").value;
  const pass = document.getElementById("pass").value;
  const type = document.getElementById("type").value;
  const msg = document.getElementById("msg");

  if (!origin || !dest || !depDate) {
    msg.textContent = "Completa todos los campos obligatorios.";
    return;
  }
  if (origin === dest) {
    msg.textContent = "Origen y destino deben ser diferentes.";
    return;
  }

  const routeKey = `${origin}-${dest}`;
  const routeKeyRev = `${dest}-${origin}`;
  const route = routes[routeKey] || routes[routeKeyRev];

  // Limpia capas anteriores (marcadores y líneas)
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker || layer instanceof L.Polyline) {
      map.removeLayer(layer);
    }
  });

  // Agrega marcadores para partida y llegada
  const start = locations[origin];
  const end = locations[dest];
  L.marker(start).addTo(map).bindPopup(`<b>Salida:</b> ${origin}`).openPopup();
  L.marker(end).addTo(map).bindPopup(`<b>Destino:</b> ${dest}`);
  L.polyline([start, end], { color: "blue", weight: 3 }).addTo(map);
  map.fitBounds([start, end], { padding: [20, 20] });

  if (!route) {
    msg.textContent = `Ruta entre ${origin} y ${dest} no registrada, pero puedes visualizarla en el mapa de Venezuela.`;
  } else {
    msg.textContent = `✅ Reserva confirmada: ${pass} pasajero(s), Ida: ${depDate}${
      retDate ? ", Vuelta: " + retDate : ""
    }, Tipo: ${type}. Ruta: ${route.dist} km. ¡Viaje listo!`;
  }
});

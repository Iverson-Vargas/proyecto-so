 // Coordenadas de capitales/ubicaciones clave en Venezuela
 const locations = {
  "Amazonas": [3.4653, -65.1013],
  "Anzoátegui": [8.3666, -62.6333],
  "Apure": [7.3333, -69.5833],
  "Aragua": [10.0833, -67.4833],
  "Barinas": [8.6333, -70.2167],
  "Bolívar": [7.9167, -61.8833],
  "Carabobo": [10.1667, -68.0000],
  "Cojedes": [9.4000, -68.3333],
  "Delta Amacuro": [9.3833, -61.2667],
  "Distrito Capital": [10.5000, -66.9167],
  "Falcón": [11.0000, -69.0000],
  "Guárico": [9.0000, -66.0000],
  "Lara": [10.0667, -69.3667],
  "Mérida": [8.5833, -71.1333],
  "Miranda": [10.2500, -66.8333],
  "Monagas": [9.7500, -63.0000],
  "Nueva Esparta": [11.0000, -64.0000],
  "Portuguesa": [9.0000, -69.0000],
  "Sucre": [10.4500, -63.0000],
  "Táchira": [7.7500, -72.0000],
  "Trujillo": [9.3667, -70.4333],
  "Vargas": [10.6000, -66.9333],
  "Yaracuy": [10.0833, -68.7500],
  "Zulia": [10.6667, -71.6167]
};

// Llena selects
const originSel = document.getElementById('origin');
const destSel = document.getElementById('dest');
Object.keys(locations).forEach(loc => {
  let opt = document.createElement('option');
  opt.value = loc;
  opt.text = loc;
  originSel.appendChild(opt.cloneNode(true));
  destSel.appendChild(opt);
});

// Checkbox para fecha vuelta
document.getElementById('roundTrip').addEventListener('change', function() {
  const retField = document.getElementById('returnDate');
  retField.style.display = this.checked ? 'block' : 'none';
  retField.required = this.checked;
});

// Inicializa mapa
const map = L.map('map', {
  center: [7.5, -66.5],
  zoom: 6,
  maxBounds: [[0, -75], [13.5, -59]],
  maxBoundsViscosity: 1.0
});
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

let control; // para guardar la ruta


function getRoute(start, end, type) {
if (type === "avion") {
// Distancia en línea recta
const R = 6371;
const toRad = x => x * Math.PI / 180;
const dLat = toRad(end[0] - start[0]);
const dLon = toRad(end[1] - start[1]);
const a = Math.sin(dLat/2)**2 + Math.cos(toRad(start[0])) * Math.cos(toRad(end[0])) * Math.sin(dLon/2)**2;
const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
const distKm = R * c;
const timeHr = (distKm / 800).toFixed(2);
L.polyline([start, end], { color: 'blue', weight: 3, dashArray: '5,5' }).addTo(map);
document.getElementById('busSummary').textContent = ""; // limpiar panel bus
document.getElementById('msg').textContent = `✈️ Vuelo: ${distKm.toFixed(1)} km, Tiempo aprox: ${timeHr} horas.`;
} else {
// Ruta terrestre con OSRM
if (control) map.removeControl(control);
control = L.Routing.control({
  waypoints: [
    L.latLng(start[0], start[1]),
    L.latLng(end[0], end[1])
  ],
  lineOptions: { styles: [{ color: 'red', weight: 4 }] },
  show: false,
  addWaypoints: false,
  routeWhileDragging: false,
  draggableWaypoints: false
}).addTo(map);

control.on('routesfound', function(e) {
  const summary = e.routes[0].summary;
  const distKm = (summary.totalDistance / 1000).toFixed(1);
  const timeMin = Math.round(summary.totalTime / 60);

  // Mostrar resumen por encima del mapa
  document.getElementById('busSummary').textContent =
    `🚌 Ruta más rápida en bus: ${distKm} km | Tiempo: ${timeMin} minutos`;

  // Mensaje de confirmación abajo
  document.getElementById('msg').textContent =
    `Reserva confirmada: Ruta terrestre calculada correctamente.`;
});
}
}


// Evento de envío del formulario
document.getElementById('form').addEventListener('submit', function(e) {
  e.preventDefault();

  const origin = originSel.value;
  const dest = destSel.value;
  const depDate = document.getElementById('depDate').value;
  const retDate = document.getElementById('returnDate').value;
  const pass = document.getElementById('pass').value;
  const type = document.getElementById('type').value;
  const msg = document.getElementById('msg');

  if (!origin || !dest || !depDate) {
    msg.textContent = "Completa todos los campos obligatorios.";
    return;
  }
  if (origin === dest) {
    msg.textContent = "Origen y destino deben ser diferentes.";
    return;
  }

  // Limpia capas anteriores (marcadores y rutas)
  map.eachLayer(layer => {
    if (layer instanceof L.Marker || layer instanceof L.Polyline) {
      map.removeLayer(layer);
    }
  });
  if (control) {
    map.removeControl(control);
    control = null;
  }

  // Agrega marcadores para partida y llegada
  const start = locations[origin];
  const end = locations[dest];
  L.marker(start).addTo(map).bindPopup(`<b>Salida:</b> ${origin}`).openPopup();
  L.marker(end).addTo(map).bindPopup(`<b>Destino:</b> ${dest}`);
  map.fitBounds([start, end], { padding: [20, 20] });

  // Llama a la función de cálculo de ruta
  getRoute(start, end, type);

  // Mensaje de confirmación de reserva
  msg.textContent += ` | Reserva: ${pass} pasajero(s), Ida: ${depDate}${retDate ? ', Vuelta: ' + retDate : ''}, Tipo: ${type}.`;
});

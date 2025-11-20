// Aeropuertos principales por estado
const airports = {
  "Amazonas": [3.4653, -65.1013], //trreterte
  "Anzoátegui": [10.1111, -64.6922],
  "Apure": [7.8800, -67.4440],
  "Aragua": [10.2469, -67.6494],
  "Barinas": [8.6226, -70.2208],
  "Bolívar": [8.2885, -62.7604],
  "Carabobo": [10.1756, -67.9284],
  "Cojedes": [9.4000, -68.3333],
  "Delta Amacuro": [9.0628, -62.0500],
  "Distrito Capital": [10.6031, -66.9906],
  "Falcón": [11.4149, -69.6803],
  "Guárico": [9.0210, -67.3810],
  "Lara": [10.0678, -69.3178],
  "Mérida": [8.5823, -71.1610],
  "Miranda": [10.2500, -66.8333],
  "Monagas": [9.7540, -63.1760],
  "Nueva Esparta": [10.9126, -63.9666],
  "Portuguesa": [9.0000, -69.0000],
  "Sucre": [10.4500, -63.0000],
  "Táchira": [7.8128, -72.4397],
  "Trujillo": [9.3667, -70.4333],
  "Vargas": [10.6031, -66.9906],
  "Yaracuy": [10.0833, -68.7500],
  "Zulia": [10.5582, -71.7279]
};

// Terminales terrestres por estado
const terminals = {
  "Amazonas": [5.650613782742305, -67.59310942895101],  // Terminal de Pasajeros Puerto Ayacucho
  "Anzoátegui": [10.123681424194466, -64.68354612344999],     // Terminal de Pasajeros Barcelona
  "Apure": [7.89656094871939, -67.4753583832889],           // Terminal de Pasajeros San Fernando
  "Aragua": [10.245032457233117, -67.58776027522032],         // Terminal de Pasajeros Maracay
  "Barinas": [8.64142747965079, -70.22753660469094],         // Terminal de Pasajeros Barinas
  "Bolívar": [8.462779675243633, -63.66116572628907],         // Terminal de Pasajeros Puerto Ordaz
  "Carabobo": [10.197469659295036, -67.96852764238429],       // Terminal Big Low (Valencia)
  "Cojedes": [9.65284673277371, -68.58403395807892 ],         // Terminal de Pasajeros San Carlos
  "Delta Amacuro": [9.076830077835188, -62.037749848152515 ],   // Terminal de Pasajeros Tucupita
  "Distrito Capital": [10.476115591458624, -66.89919697726691], // Terminal10.58052853690481, -66.5940259860205 La Bandera (Caracas)
  "Falcón": [11.687162817101377, -70.18534593265818],         // Terminal de Pasajeros Punto Fijo
  "Guárico": [9.305243787086345, -65.98178215191969],         // Terminal de Pasajeros Valle de la Pascua
  "Lara": [10.06933, -69.33440],           // Terminal de Pasajeros Barquisimeto 
  "Mérida": [8.637808150215173, -71.66433597947722],          // Terminal de Pasajeros Mérida
  "Miranda": [10.344078701889702, -67.04272729938059  ],        // Terminal de Pasajeros Los Teques
  "Monagas": [9.737219384456608, -63.201355283212116],         // Terminal de Pasajeros Maturín
  "Nueva Esparta": [10.96012, -63.85025],  // Terminal de Pasajeros Porlamar
  "Portuguesa": [9.601074504204362, -69.19304494913783],      // Terminal de Pasajeros Guanare
  "Sucre": [10.472390116397278, -64.18537204360018],          // Terminal de Pasajeros Cumaná
  "Táchira": [7.840254732615906, -72.43835449483387],         // Terminal de Pasajeros San Cristóbal
  "Trujillo": [9.386749550101761, -70.42747875497906],        // Terminal de Pasajeros Valera
  "Vargas": [10.601621804970058, -66.92959513657432],         // Terminal de Pasajeros La Guaira
  "Yaracuy": [10.333709235387866, -68.7373078453064],        // Terminal de Pasajeros San Felipe
  "Zulia": [10.635609528486466, -71.61930152192801]           // Terminal de Pasajeros Maracaibo
};



// Llena selects
const originSel = document.getElementById('origin');
const destSel = document.getElementById('dest');
Object.keys(airports).forEach(loc => { // usamos aeropuertos como referencia de estados
  let opt = document.createElement('option');
  opt.value = loc;
  opt.text = loc;
  originSel.appendChild(opt.cloneNode(true));
  destSel.appendChild(opt);
});

// Checkbox para fecha vuelta
document.getElementById('roundTrip').addEventListener('change', function() {
  const returnContainer = document.getElementById('return-date-container');
  const returnInput = document.getElementById('returnDate');
  returnContainer.style.display = this.checked ? 'block' : 'none';
  returnInput.required = this.checked;
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
const timeHr = (distKm / 800); // Calculamos horas
const flightTime = `${Math.floor(timeHr)}h ${Math.round((timeHr % 1) * 60)}min`; // Formato Xh Ymin
L.polyline([start, end], { color: 'blue', weight: 3, dashArray: '5,5' }).addTo(map);
document.getElementById('route-summary').textContent = `✈️ Vuelo: ${distKm.toFixed(1)} km | Tiempo Aprox: ${flightTime}`;
document.getElementById('msg').textContent = `Reserva confirmada para vuelo.`;
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
      const busTime = `${Math.floor(timeMin / 60)}h ${timeMin % 60}min`;

  // Mostrar resumen por encima del mapa
  document.getElementById('route-summary').textContent = `🚌 Ruta en bus: ${distKm} km | Tiempo: ${busTime}`;

  // Mensaje de confirmación abajo
  document.getElementById('msg').textContent = `Reserva confirmada para ruta terrestre.`;
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

  // Limpia capas anteriores
  map.eachLayer(layer => {
    if (layer instanceof L.Marker || layer instanceof L.Polyline) {
      map.removeLayer(layer);
    }
  });
  document.getElementById('route-summary').textContent = ""; // Limpia el resumen anterior
  if (control) {
    map.removeControl(control);
    control = null;
  }

  // Selecciona coordenadas según transporte
  let start, end;
  if (type === "avion") {
    start = airports[origin];
    end = airports[dest];
  } else {
    start = terminals[origin];
    end = terminals[dest];
  }

   // Agrega marcadores para partida y llegada
   L.marker(start).addTo(map).bindPopup(`<b>Salida:</b> ${origin}`).openPopup();
   L.marker(end).addTo(map).bindPopup(`<b>Destino:</b> ${dest}`);
   map.fitBounds([start, end], { padding: [20, 20] });
 
   // Llama a la función de cálculo de ruta
   getRoute(start, end, type);
 
   // Mensaje de confirmación de reserva
   msg.textContent += ` | Reserva: ${pass} pasajero(s), Ida: ${depDate}${retDate ? ', Vuelta: ' + retDate : ''}, Tipo: ${type}.`;
 });
 

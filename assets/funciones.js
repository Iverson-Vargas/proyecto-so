// Aeropuertos principales por estado
const airports = {
  "Amazonas": [3.4653, -65.1013], 
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

// Terminales terrestres por estado, ahora con nombre y coordenadas
const terminals = {
  "Amazonas": { coords: [5.650613782742305, -67.59310942895101], name: "Terminal de Pasajeros Puerto Ayacucho" },
  "Anzoátegui": { coords: [10.123681424194466, -64.68354612344999], name: "Terminal de Pasajeros Barcelona" },
  "Apure": { coords: [7.89656094871939, -67.4753583832889], name: "Terminal de Pasajeros San Fernando" },
  "Aragua": { coords: [10.245032457233117, -67.58776027522032], name: "Terminal de Pasajeros Maracay" },
  "Barinas": { coords: [8.64142747965079, -70.22753660469094], name: "Terminal de Pasajeros Barinas" },
  "Bolívar": { coords: [8.462779675243633, -63.66116572628907], name: "Terminal de Pasajeros Puerto Ordaz" },
  "Carabobo": { coords: [10.197469659295036, -67.96852764238429], name: "Terminal Big Low Center (Valencia)" },
  "Cojedes": { coords: [9.65284673277371, -68.58403395807892], name: "Terminal de Pasajeros San Carlos" },
  "Delta Amacuro": { coords: [9.076830077835188, -62.037749848152515], name: "Terminal de Pasajeros Tucupita" },
  "Distrito Capital": { coords: [10.476115591458624, -66.89919697726691], name: "Terminal La Bandera (Caracas)" },
  "Falcón": { coords: [11.687162817101377, -70.18534593265818], name: "Terminal de Pasajeros Punto Fijo" },
  "Guárico": { coords: [9.305243787086345, -65.98178215191969], name: "Terminal de Pasajeros Valle de la Pascua" },
  "Lara": { coords: [10.06933, -69.33440], name: "Terminal de Pasajeros Barquisimeto" },
  "Mérida": { coords: [8.637808150215173, -71.66433597947722], name: "Terminal de Pasajeros Mérida" },
  "Miranda": { coords: [10.344078701889702, -67.04272729938059], name: "Terminal de Pasajeros Los Teques" },
  "Monagas": { coords: [9.737219384456608, -63.201355283212116], name: "Terminal de Pasajeros Maturín" },
  "Nueva Esparta": { coords: [10.96012, -63.85025], name: "Terminal de Pasajeros Porlamar" },
  "Portuguesa": { coords: [9.601074504204362, -69.19304494913783], name: "Terminal de Pasajeros Guanare" },
  "Sucre": { coords: [10.472390116397278, -64.18537204360018], name: "Terminal de Pasajeros Cumaná" },
  "Táchira": { coords: [7.840254732615906, -72.43835449483387], name: "Terminal de Pasajeros San Cristóbal" },
  "Trujillo": { coords: [9.386749550101761, -70.42747875497906], name: "Terminal de Pasajeros Valera" },
  "Vargas": { coords: [10.601621804970058, -66.92959513657432], name: "Terminal de Pasajeros La Guaira" },
  "Yaracuy": { coords: [10.333709235387866, -68.7373078453064], name: "Terminal de Pasajeros San Felipe" },
  "Zulia": { coords: [10.635609528486466, -71.61930152192801], name: "Terminal de Pasajeros Maracaibo" }
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


 document.addEventListener('DOMContentLoaded', () => {
  // --- REUBICACIÓN DEL CONTENEDOR DE MENSAJES ---
  const formElement = document.getElementById('form');
  const msgElement = document.getElementById('msg');
  if (formElement && msgElement) {
    formElement.insertBefore(msgElement, formElement.firstChild);
  }

  // --- CREACIÓN DEL MODAL DE PAGO ---
  const paymentModalHTML = `
    <div id="payment-modal" class="auth-modal">
      <div class="auth-modal-content">
        <span class="close-btn payment-close-btn">&times;</span>
        <form id="payment-form" class="auth-form" style="display: flex;">
          <h2>Formulario de Pago</h2>
          <p id="payment-summary" style="text-align: left; margin-bottom: 20px;"></p>
          <label for="card-name">Nombre en la tarjeta</label>
          <input type="text" id="card-name" required>
          <label for="card-number">Número de la tarjeta</label>
          <input type="text" id="card-number" placeholder="0000-0000-0000-0000" required>
          <div style="display: flex; gap: 10px;">
            <div style="flex: 1;">
              <label for="card-expiry">Expiración</label>
              <input type="text" id="card-expiry" placeholder="MM/AA" required>
            </div>
            <div style="flex: 1;">
              <label for="card-cvv">CVV</label>
              <input type="text" id="card-cvv" placeholder="123" required>
            </div>
          </div>
          <button type="submit">Pagar y Registrar</button>
        </form>
      </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', paymentModalHTML);

  // --- CREACIÓN DEL MODAL DE MIS VIAJES ---
  const tripsModalHTML = `
    <div id="trips-modal" class="auth-modal">
      <div class="auth-modal-content" style="max-width: 500px;">
        <span class="close-btn trips-close-btn">&times;</span>
        <h2>Mis Viajes Registrados</h2>
        <div id="trips-list">
          <!-- Los viajes del usuario se insertarán aquí dinámicamente -->
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', tripsModalHTML);

  // --- CREACIÓN DEL MODAL DE DETALLES DEL VIAJE ---
  const tripDetailModalHTML = `
    <div id="trip-detail-modal" class="auth-modal">
      <div class="auth-modal-content">
        <span class="close-btn trip-detail-close-btn">&times;</span>
        <h2>Detalles del Viaje</h2>
        <div id="trip-detail-content">
          <!-- El contenido detallado se insertará aquí -->
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', tripDetailModalHTML);

  const userSessionDiv = document.getElementById('user-session');
  const userGreetingDiv = document.getElementById('user-greeting');
  const usernameDisplay = document.getElementById('username-display');
  const logoutBtn = document.getElementById('logout-btn');
  
  // Elementos del modal de pago
  const paymentModal = document.getElementById('payment-modal');
  const paymentCloseBtn = document.querySelector('.payment-close-btn');
  const paymentForm = document.getElementById('payment-form');

  // Elementos del modal de "Mis Viajes"
  const tripsModal = document.getElementById('trips-modal');
  const tripsCloseBtn = document.querySelector('.trips-close-btn');
  const tripsListDiv = document.getElementById('trips-list');

  // Elementos del modal de detalles de viaje
  const tripDetailModal = document.getElementById('trip-detail-modal');
  const tripDetailCloseBtn = document.querySelector('.trip-detail-close-btn');
  const tripDetailContent = document.getElementById('trip-detail-content');

  // Variables para almacenar temporalmente los datos de la ruta
  let waypointSummary = [];
  let currentBusTime = null;

  // --- LÓGICA DEL FORMULARIO DE RESERVA ---

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

  // Función para calcular distancia entre dos puntos (Haversine)
  function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  function getRoute(start, end, type) {
    if (type === "avion") {
      // Distancia en línea recta
      const distKm = getDistance(start[0], start[1], end[0], end[1]);
      const timeHr = (distKm / 800); // Calculamos horas
      const flightTime = `${Math.floor(timeHr)}h ${Math.round((timeHr % 1) * 60)}min`; // Formato Xh Ymin
      L.polyline([start, end], { color: 'blue', weight: 3, dashArray: '5,5' }).addTo(map);
      document.getElementById('route-summary').textContent = `✈️ Vuelo: ${distKm.toFixed(1)} km | Tiempo Aprox: ${flightTime}`;
      document.getElementById('route-summary').classList.add('visible');
    } else {
      // Ruta terrestre con OSRM (método original)
      if (control) map.removeControl(control);
      control = L.Routing.control({
        waypoints: [
          L.latLng(start[0], start[1]),
          L.latLng(end[0], end[1])
        ],
        lineOptions: { styles: [{ color: 'red', weight: 4 }] },
        show: false, // no muestra el panel de texto de la ruta
        addWaypoints: false,
        routeWhileDragging: false,
        draggableWaypoints: false
      }).addTo(map);

      control.on('routesfound', function(e) {
        const route = e.routes[0];
        const summary = route.summary;
        const distKm = (summary.totalDistance / 1000).toFixed(1);
        const timeMin = Math.round(summary.totalTime / 60);
        const busTime = `${Math.floor(timeMin / 60)}h ${timeMin % 60}min`;
        currentBusTime = busTime; // Guardamos el tiempo total

        // --- LÓGICA PARA DETECTAR ESTADOS INTERMEDIOS Y TIEMPO ---
        const routeCoordinates = route.coordinates;
        const originState = originSel.value;
        const destState = destSel.value;
        const PROXIMITY_THRESHOLD_KM = 30; // Umbral de 30km
        
        let intermediateWaypoints = []; // Almacena { state, timeFromStart, distanceFromStart }
        
        for (const state in terminals) {
          if (state !== originState && state !== destState) {
            const intermediateTerminalCoords = terminals[state].coords;
            let minDistanceToRoute = Infinity;
            let closestPointIndex = -1;

            // Encuentra el punto en la ruta más cercano a este terminal intermedio
            routeCoordinates.forEach((point, index) => {
              const distance = getDistance(intermediateTerminalCoords[0], intermediateTerminalCoords[1], point.lat, point.lng);
              if (distance < minDistanceToRoute) {
                minDistanceToRoute = distance;
                closestPointIndex = index;
              }
            });

            if (minDistanceToRoute <= PROXIMITY_THRESHOLD_KM) {
              // Aproxima el tiempo y la distancia a este punto en la ruta
              const timeToPoint = (closestPointIndex / (routeCoordinates.length - 1)) * summary.totalTime;
              const distanceToPoint = (closestPointIndex / (routeCoordinates.length - 1)) * summary.totalDistance;
              
              intermediateWaypoints.push({
                state: state,
                timeFromStart: timeToPoint,
                distanceFromStart: distanceToPoint
              });
            }
          }
        }

        // Ordena los puntos de paso por distancia para obtener la secuencia correcta
        intermediateWaypoints.sort((a, b) => a.distanceFromStart - b.distanceFromStart);

        // Ahora, calcula el tiempo entre cada segmento
        waypointSummary = [];
        let lastTime = 0;
        let lastState = originState;

        intermediateWaypoints.forEach(waypoint => {
          waypointSummary.push({
            from: lastState,
            to: waypoint.state,
            time: waypoint.timeFromStart - lastTime
          });
          lastTime = waypoint.timeFromStart;
          lastState = waypoint.state;
        });

        // Añade el tramo final hasta el destino
        waypointSummary.push({
          from: lastState,
          to: destState,
          time: summary.totalTime - lastTime
        });
        // --- FIN DE LA LÓGICA ---

        // Muestra el resumen en el panel
        document.getElementById('route-summary').textContent = `🚌 Ruta en bus: ${distKm} km | Tiempo: ${busTime}`;
        document.getElementById('route-summary').classList.add('visible');
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
    
    // Limpia mensajes y clases anteriores
    msg.textContent = "";
    msg.className = ""; // Limpia clases como 'success-message'
    document.getElementById('route-summary').classList.remove('visible');
    waypointSummary = []; // Reseteamos el resumen de ruta
    currentBusTime = null; // Reseteamos el tiempo total

    // Validaciones básicas
    if (!origin || !dest || !depDate) {
      msg.textContent = "Completa todos los campos obligatorios.";
      return;
    }
    if (origin === dest) {
      msg.textContent = "Origen y destino deben ser diferentes.";
      return;
    }

    // Validación de fechas
    const today = new Date();
    today.setHours(0,0,0,0); // Normalizamos a medianoche
    const isRoundTrip = document.getElementById('roundTrip').checked;

    // Corrección: Normalizar fechas de input para evitar problemas de zona horaria
    const depParts = depDate.split('-');
    const dep = new Date(depParts[0], depParts[1] - 1, depParts[2]);

    // Solo valida la fecha de vuelta si es un viaje de ida y vuelta y el campo no está vacío
    const ret = isRoundTrip && retDate ? new Date(retDate.split('-')[0], retDate.split('-')[1] - 1, retDate.split('-')[2]) : null;

    if (dep < today) {
      msg.textContent = "La fecha de ida no puede ser anterior a hoy.";
      return;
    }
    if (ret && ret < dep) {
      msg.textContent = "La fecha de vuelta no puede ser anterior a la fecha de ida.";
      return; // Detiene la ejecución
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
      start = terminals[origin].coords;
      end = terminals[dest].coords;
    }

     // Agrega marcadores para partida y llegada
     L.marker(start).addTo(map).bindPopup(`<b>Salida:</b> ${origin}`).openPopup();
     L.marker(end).addTo(map).bindPopup(`<b>Destino:</b> ${dest}`);
     map.fitBounds([start, end], { padding: [20, 20] });
   
     // Llama a la función de cálculo de ruta
     getRoute(start, end, type);
   
     // --- LÓGICA DE CONFIRMACIÓN Y REGISTRO DE COMPRA ---
     const currentUser = sessionStorage.getItem('currentUser');
     const reservationDetails = `Reserva: ${pass} pasajero(s), Ida: ${depDate}${retDate ? ', Vuelta: ' + retDate : ''}, Tipo: ${type}.`;
     
     // Objeto detallado para guardar en localStorage
     const tripData = {
       origin: origin,
       dest: dest,
       passengers: pass,
       departureDate: depDate,
       returnDate: retDate || null, // Guardar null si no hay fecha de vuelta
       transportType: type,
       waypointSummary: (type === 'bus') ? waypointSummary : null,
       totalTime: (type === 'bus') ? currentBusTime : null
     };

     if (currentUser) {
       // Usuario ha iniciado sesión
       msg.textContent = reservationDetails;
       msg.classList.add('success-message');

       // Crear y añadir el botón de "Registrar Compra"
       const existingBtn = document.getElementById('register-purchase-btn');
       if (existingBtn) existingBtn.remove(); // Elimina el botón si ya existe

       const registerBtn = document.createElement('button');
       registerBtn.textContent = 'Registrar Compra';
       registerBtn.id = 'register-purchase-btn';
       registerBtn.className = 'btn-register-purchase';
       registerBtn.type = 'button'; // Importante para que no envíe el formulario
       
       registerBtn.onclick = () => {
         // Actualizamos el objeto tripData justo antes de abrir el modal de pago
         // para asegurarnos de que los datos de la ruta asíncrona estén listos.
         tripData.waypointSummary = (type === 'bus') ? waypointSummary : null;
         tripData.totalTime = (type === 'bus') ? currentBusTime : null;

         document.getElementById('payment-summary').textContent = reservationDetails;
         // Guardar temporalmente los datos del viaje para usarlos en el pago
         paymentForm.dataset.tripData = JSON.stringify(tripData);
         paymentModal.classList.add('visible');
       };

       msg.insertAdjacentElement('afterend', registerBtn);

     } else {
       // Usuario NO ha iniciado sesión
       msg.innerHTML = `Para registrar la compra, por favor <a href="login.php">inicia sesión</a>.`;
     }
  });

  const closePaymentModal = () => {
    paymentModal.classList.remove('visible');
  };

  tripsCloseBtn.addEventListener('click', () => {
    tripsModal.classList.remove('visible');
  });

  tripDetailCloseBtn.addEventListener('click', () => {
    tripDetailModal.classList.remove('visible');
  });

  paymentCloseBtn.addEventListener('click', closePaymentModal);

  window.addEventListener('click', (e) => {
    if (e.target === paymentModal || e.target === tripsModal || e.target === tripDetailModal) {
      e.target.classList.remove('visible');
    }
  });

  // --- Lógica del Formulario de Pago ---
  paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // --- GUARDAR VIAJE EN LOCALSTORAGE ---
    const currentUser = sessionStorage.getItem('currentUser');
    const tripDataString = e.target.dataset.tripData;

    if (currentUser && tripDataString) {
      const userTripsKey = `trips_${currentUser}`;
      // Obtenemos los viajes existentes o creamos un array vacío
      const existingTrips = JSON.parse(localStorage.getItem(userTripsKey)) || [];
      // Añadimos el nuevo viaje
      existingTrips.push(JSON.parse(tripDataString));
      // Guardamos el array actualizado
      localStorage.setItem(userTripsKey, JSON.stringify(existingTrips));
    }

    alert('¡Pago procesado con éxito! Tu compra ha sido registrada.');
    closePaymentModal();
    // Limpiar formulario de reserva y mensajes
    document.getElementById('form').reset();
    msg.textContent = "";
    document.getElementById('register-purchase-btn')?.remove();
    document.getElementById('route-summary').classList.remove('visible');
  });

  // --- Lógica de Cierre de Sesión ---
  logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'login.php';
  });

  // --- Funciones para actualizar la interfaz ---
  function updateUIForLoggedInUser(user) {
    userGreetingDiv.style.display = 'flex';
    usernameDisplay.textContent = `Hola, ${user}`; 

    // Crear y mostrar el botón "Mis Viajes" si no existe
    if (!document.getElementById('my-trips-btn')) {
      const myTripsBtn = document.createElement('button');
      myTripsBtn.textContent = 'Mis Viajes';
      myTripsBtn.id = 'my-trips-btn';
      myTripsBtn.className = 'my-trips-btn';
      
      myTripsBtn.addEventListener('click', () => {
        const currentUser = sessionStorage.getItem('currentUser');
        const userTripsKey = `trips_${currentUser}`;
        const trips = JSON.parse(localStorage.getItem(userTripsKey)) || [];

        tripsListDiv.innerHTML = ''; // Limpiar lista anterior

        if (trips.length > 0) {
          trips.reverse().forEach((trip, index) => { // .reverse() para mostrar el más reciente primero
            const tripElement = document.createElement('div');
            tripElement.className = 'trip-item';
            
            const tripText = document.createElement('span');
            tripText.textContent = `De ${trip.origin} a ${trip.dest} (${trip.departureDate})`;

            const infoBtn = document.createElement('button');
            infoBtn.textContent = 'Información';
            infoBtn.className = 'btn-trip-info';
            infoBtn.onclick = () => {
              let waypointSummaryHTML = '';
              const recorridoLabels = ["Primer", "Segundo", "Tercer", "Cuarto", "Quinto", "Sexto", "Séptimo", "Octavo", "Noveno", "Décimo"];

              // Si es un viaje en bus y tiene un resumen de ruta, lo formateamos
              if (trip.transportType === 'bus' && trip.waypointSummary && trip.waypointSummary.length > 0) {
                waypointSummaryHTML += '<h4>Resumen de la Ruta:</h4><ul style="padding-left: 0; text-align: left; list-style-type: none;">';
                trip.waypointSummary.forEach((segment, index) => {
                  const timeInSeconds = segment.time;
                  // No mostrar segmentos con tiempo 0 o negativo
                  if (timeInSeconds > 0) {
                    const segmentTime = `${Math.floor(timeInSeconds / 3600)}h ${Math.round((timeInSeconds % 3600) / 60)}min`;
                    const label = recorridoLabels[index] || `${index + 1}º`;
                    
                    waypointSummaryHTML += `
                      <li style="margin-bottom: 12px; border-left: 3px solid #ccc; padding-left: 10px;">
                        <div style="font-weight: bold;">${label} Recorrido</div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                          <span>${segment.from} → ${segment.to}</span>
                          <span style="color: #555; font-style: italic;">${segmentTime}</span>
                        </div>
                      </li>`;
                  }
                });
                waypointSummaryHTML += '</ul>';

                if (trip.totalTime) {
                    waypointSummaryHTML += `<hr><p style="text-align: right; font-weight: bold; margin-top: 10px;">Total de Horas: ${trip.totalTime}</p>`;
                }
              }

              tripDetailContent.innerHTML = `
                <p><strong>Origen:</strong> ${trip.origin}</p>
                <p><strong>Destino:</strong> ${trip.dest}</p>
                <p><strong>Pasajeros:</strong> ${trip.passengers}</p>
                <p><strong>Fecha de Ida:</strong> ${trip.departureDate}</p>
                ${trip.returnDate ? `<p><strong>Fecha de Vuelta:</strong> ${trip.returnDate}</p>` : ''}
                <p><strong>Transporte:</strong> ${trip.transportType === 'avion' ? 'Avión ✈️' : 'Autobús 🚌'}</p>
                ${waypointSummaryHTML}
              `;
              tripDetailModal.classList.add('visible');
            };

            tripElement.appendChild(tripText);
            tripElement.appendChild(infoBtn);
            tripsListDiv.appendChild(tripElement);
          });
        } else {
          tripsListDiv.innerHTML = '<p>Aún no has registrado ningún viaje.</p>';
        }
        tripsModal.classList.add('visible');
      });

      logoutBtn.insertAdjacentElement('beforebegin', myTripsBtn);
    }
  }

  // --- Comprobar estado de sesión al cargar la página ---
  const checkLoginStatus = () => {
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
      updateUIForLoggedInUser(currentUser);
    } else {
      window.location.href = 'login.php';
    }
  };

  checkLoginStatus();
 });

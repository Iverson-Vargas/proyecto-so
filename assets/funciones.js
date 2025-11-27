// funciones.js
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

  // --- ESTILOS GLOBALES PARA MODALES ---
  const modalStyles = `
    <style>
      .auth-modal-content {
        max-width: 480px; /* Ancho máximo reducido para la mayoría de modales */
        max-height: 85vh; /* Altura máxima para evitar que se estire demasiado */
        overflow-y: auto; /* Scroll vertical si el contenido es muy largo */
      }

      /* Ajuste para la modal de detalles que puede tener más contenido */
      #trip-detail-modal .auth-modal-content {
        max-width: 600px;
      }

      /* Ajuste para la modal de mensajes simples */
      #message-modal .auth-modal-content {
        max-width: 400px;
      }
    </style>
  `;
  document.head.insertAdjacentHTML('beforeend', modalStyles);

  // --- CREACIÓN DE MODALES ---
  const registrationModalHTML = `
    <div id="registration-modal" class="auth-modal">
      <div class="auth-modal-content">
        <span class="close-btn registration-close-btn">&times;</span>
        <form id="registration-form" class="auth-form" style="display: flex;">
          <h2>Confirmar Registro de Vuelo</h2>
          <p id="registration-summary" style="text-align: left; margin-bottom: 20px;"></p>
          <label for="client-name">Nombre del Pasajero</label>
          <input type="text" id="client-name" required>
          <label for="client-id">Cédula o Pasaporte del Pasajero</label>
          <input type="text" id="client-id" required>
          <button type="submit">Confirmar y Registrar Vuelo</button>
        </form>
      </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', registrationModalHTML);

  const tripsModalHTML = `
    <div id="trips-modal" class="auth-modal">
      <div class="auth-modal-content">
        <span class="close-btn trips-close-btn">&times;</span>
        <h2>Vuelos Registrados por Usted</h2>
        <div id="trips-list"></div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', tripsModalHTML);

  const tripDetailModalHTML = `
    <div id="trip-detail-modal" class="auth-modal">
      <div class="auth-modal-content">
        <span class="close-btn trip-detail-close-btn">&times;</span>
        <h2>Detalles del Vuelo</h2>
        <div id="trip-detail-content"></div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', tripDetailModalHTML);

  // --- MODAL DE ADMINISTRACIÓN ---
  const adminModalHTML = `
    <div id="admin-modal" class="auth-modal">
        <div class="auth-modal-content">
            <span class="close-btn admin-close-btn">&times;</span>
            <h2>Panel de Administración</h2>
            
            <form id="create-user-form" class="auth-form">
                <h3>Crear Nuevo Empleado</h3>
                <label for="new-user-name">Nombre de Usuario:</label>
                <input type="text" id="new-user-name" required>
                <label for="new-user-pass">Contraseña:</label>
                <input type="password" id="new-user-pass" required>
                <button type="submit">Crear Empleado</button>
                <p id="admin-msg" class="error-msg"></p>
            </form>

            <h3>Empleados Actuales</h3>
            <div id="employee-list"></div>
        </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', adminModalHTML);

  // --- MODAL DE MENSAJES (REEMPLAZO DE ALERT) ---
  const messageModalHTML = `
    <div id="message-modal" class="auth-modal">
      <div class="auth-modal-content" style="text-align: center;">
        <span class="close-btn message-close-btn">&times;</span>
        <div id="message-modal-content" style="margin-top: 15px; margin-bottom: 25px;"></div>
        <button id="message-modal-ok-btn" class="btn-register-purchase">Aceptar</button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', messageModalHTML);

  // --- REFERENCIAS A ELEMENTOS DEL DOM ---
  const userGreetingDiv = document.getElementById('user-greeting');
  const usernameDisplay = document.getElementById('username-display');
  const logoutBtn = document.getElementById('logout-btn');
  
  const registrationModal = document.getElementById('registration-modal');
  const registrationCloseBtn = document.querySelector('.registration-close-btn');
  const registrationForm = document.getElementById('registration-form');

  const tripsModal = document.getElementById('trips-modal');
  const tripsCloseBtn = document.querySelector('.trips-close-btn');
  const tripsListDiv = document.getElementById('trips-list');

  const tripDetailModal = document.getElementById('trip-detail-modal');
  const tripDetailCloseBtn = document.querySelector('.trip-detail-close-btn');
  const tripDetailContent = document.getElementById('trip-detail-content');

  const adminModal = document.getElementById('admin-modal');
  const adminCloseBtn = document.querySelector('.admin-close-btn');
  const createUserForm = document.getElementById('create-user-form');
  const employeeListDiv = document.getElementById('employee-list');
  const adminMsg = document.getElementById('admin-msg');

  const messageModal = document.getElementById('message-modal');
  const messageModalContent = document.getElementById('message-modal-content');
  const messageCloseBtn = document.querySelector('.message-close-btn');
  const messageOkBtn = document.getElementById('message-modal-ok-btn');


  // --- LÓGICA DEL FORMULARIO DE BÚSQUEDA ---
  document.getElementById('roundTrip').addEventListener('change', function() {
    const returnContainer = document.getElementById('return-date-container');
    const returnInput = document.getElementById('returnDate');
    returnContainer.style.display = this.checked ? 'block' : 'none';
    returnInput.required = this.checked;
  });

  const map = L.map('map', {
    center: [7.5, -66.5],
    zoom: 6,
    maxBounds: [[0, -75], [13.5, -59]],
    maxBoundsViscosity: 1.0
  });
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  let control;
  let routeElementsLayer = L.layerGroup().addTo(map);

  function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  function getRoute(start, end, type, callback) {
    if (type === "avion") {
      const distKm = getDistance(start[0], start[1], end[0], end[1]);
      const timeHr = (distKm / 800);
      const flightTime = `${Math.floor(timeHr)}h ${Math.round((timeHr % 1) * 60)}min`;
      
      L.polyline([start, end], { color: 'blue', weight: 3, dashArray: '5,5' }).addTo(routeElementsLayer);
      
      document.getElementById('route-summary').textContent = `✈️ Vuelo: ${distKm.toFixed(1)} km | Tiempo Aprox: ${flightTime}`;
      document.getElementById('route-summary').classList.add('visible');

      callback({ waypointSummary: null, totalTime: flightTime });
      return;
    }

    if (control) map.removeControl(control);
    control = L.Routing.control({
      waypoints: [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
      lineOptions: { styles: [{ color: 'red', weight: 4 }] },
      show: false,
      addWaypoints: false,
      routeWhileDragging: false,
      draggableWaypoints: false,
      createMarker: function() { return null; } 
    }).addTo(map);

    control.on('routesfound', function(e) {
      const route = e.routes[0];
      L.geoJSON(route.geometry, { style: { color: 'red', weight: 4 } }).addTo(routeElementsLayer);

      const summary = route.summary;
      const distKm = (summary.totalDistance / 1000).toFixed(1);
      const timeMin = Math.round(summary.totalTime / 60);
      const busTime = `${Math.floor(timeMin / 60)}h ${timeMin % 60}min`;

      const routeCoordinates = route.coordinates;
      const originState = originSel.value;
      const destState = destSel.value;
      const PROXIMITY_THRESHOLD_KM = 30;
      
      let intermediateWaypoints = [];
      
      for (const state in terminals) {
        if (state !== originState && state !== destState) {
          const intermediateTerminalCoords = terminals[state].coords;
          let minDistanceToRoute = Infinity;
          let closestPointIndex = -1;

          routeCoordinates.forEach((point, index) => {
            const distance = getDistance(intermediateTerminalCoords[0], intermediateTerminalCoords[1], point.lat, point.lng);
            if (distance < minDistanceToRoute) {
              minDistanceToRoute = distance;
              closestPointIndex = index;
            }
          });

          if (minDistanceToRoute <= PROXIMITY_THRESHOLD_KM) {
            const timeToPoint = (closestPointIndex / (routeCoordinates.length - 1)) * summary.totalTime;
            const distanceToPoint = (closestPointIndex / (routeCoordinates.length - 1)) * summary.totalDistance;
            
            intermediateWaypoints.push({
              state: state,
              timeFromStart: timeToPoint,
              distanceFromStart: distanceToPoint,
              routeIndex: closestPointIndex
            });
          }
        }
      }

      intermediateWaypoints.sort((a, b) => a.distanceFromStart - b.distanceFromStart);

      let waypointSummary = [];
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

      waypointSummary.push({
        from: lastState,
        to: destState,
        time: summary.totalTime - lastTime
      });

      const recorridoLabels = ["Primer", "Segundo", "Tercer", "Cuarto", "Quinto", "Sexto", "Séptimo", "Octavo", "Noveno", "Décimo"];
      if (waypointSummary && waypointSummary.length > 0) {
          waypointSummary.forEach((segment, index) => {
              const timeInSeconds = segment.time;
              if (timeInSeconds > 0) {
                  const segmentTime = `${Math.floor(timeInSeconds / 3600)}h ${Math.round((timeInSeconds % 3600) / 60)}min`;
                  const label = recorridoLabels[index] || `${index + 1}º`;
                  
                  const fromWp = intermediateWaypoints.find(wp => wp.state === segment.from);
                  const toWp = intermediateWaypoints.find(wp => wp.state === segment.to);

                  const fromIndex = (segment.from === originState) ? 0 : fromWp.routeIndex;
                  const toIndex = (segment.to === destState) ? route.coordinates.length - 1 : toWp.routeIndex;

                  const midpointIndex = Math.floor((fromIndex + toIndex) / 2);
                  const midpointCoord = route.coordinates[midpointIndex];

                  const labelIcon = L.divIcon({
                      className: 'route-segment-label',
                      html: `
                          <div class="segment-label-content">
                              <b>${label} Recorrido</b>
                              <div>${segment.from} → ${segment.to}</div>
                              <span>${segmentTime}</span>
                          </div>
                      `,
                      iconSize: [140, 55]
                  });

                  if (midpointCoord) {
                    L.marker(midpointCoord, { icon: labelIcon }).addTo(routeElementsLayer);
                  }
              }
          });
      }

      document.getElementById('route-summary').textContent = `🚌 Ruta en bus: ${distKm} km | Tiempo: ${busTime}`;
      document.getElementById('route-summary').classList.add('visible');

      callback({ waypointSummary: waypointSummary, totalTime: busTime });
    });

    control.on('routingerror', function(e) {
        console.error("Routing error:", e.error);
        document.getElementById('msg').textContent = "No se pudo encontrar una ruta. Verifique los puntos de origen y destino.";
        callback(null);
    });
  }

  document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();

    const origin = originSel.value;
    const dest = destSel.value;
    const depDate = document.getElementById('depDate').value;
    const retDate = document.getElementById('returnDate').value;
    const pass = document.getElementById('pass').value;
    const type = document.getElementById('type').value;
    const msg = document.getElementById('msg');
    
    msg.textContent = "";
    msg.className = "";
    document.getElementById('route-summary').classList.remove('visible');
    const existingBtn = document.getElementById('register-flight-btn');
    if (existingBtn) existingBtn.remove();
    
    routeElementsLayer.clearLayers();
    if (control) {
      map.removeControl(control);
      control = null;
    }

    if (!origin || !dest || !depDate) {
      msg.textContent = "Completa todos los campos obligatorios.";
      return;
    }
    if (origin === dest) {
      msg.textContent = "Origen y destino deben ser diferentes.";
      return;
    }
    const today = new Date();
    today.setHours(0,0,0,0);
    const isRoundTrip = document.getElementById('roundTrip').checked;
    const depParts = depDate.split('-');
    const dep = new Date(depParts[0], depParts[1] - 1, depParts[2]);
    const ret = isRoundTrip && retDate ? new Date(retDate.split('-')[0], retDate.split('-')[1] - 1, retDate.split('-')[2]) : null;

    if (dep < today) {
      msg.textContent = "La fecha de ida no puede ser anterior a hoy.";
      return;
    }
    if (ret && ret < dep) {
      msg.textContent = "La fecha de vuelta no puede ser anterior a la fecha de ida.";
      return;
    }

    let start, end;
    if (type === "avion") {
      start = airports[origin];
      end = airports[dest];
    } else {
      start = terminals[origin].coords;
      end = terminals[dest].coords;
    }

     L.marker(start).addTo(routeElementsLayer).bindPopup(`<b>Salida:</b> ${origin}`).openPopup();
     L.marker(end).addTo(routeElementsLayer).bindPopup(`<b>Destino:</b> ${dest}`);
     map.fitBounds([start, end], { padding: [20, 20] });
   
     const handleRouteData = (routeData) => {
        if (!routeData) return;

        const flightDetails = `Datos del Vuelo: ${pass} pasajero(s), Ida: ${depDate}${retDate ? ', Vuelta: ' + retDate : ''}, Tipo: ${type}.`;
        msg.textContent = flightDetails;
        msg.classList.add('success-message');

        const tripData = {
           origin: origin,
           dest: dest,
           passengers: pass,
           departureDate: depDate,
           returnDate: retDate || null,
           transportType: type,
           waypointSummary: routeData.waypointSummary,
           totalTime: routeData.totalTime
        };

        const registerBtn = document.createElement('button');
        registerBtn.textContent = 'Registrar Vuelo para Cliente';
        registerBtn.id = 'register-flight-btn';
        registerBtn.className = 'btn-register-purchase';
        registerBtn.type = 'button';
        
        registerBtn.onclick = () => {
           document.getElementById('registration-summary').textContent = flightDetails;
           registrationForm.dataset.tripData = JSON.stringify(tripData);
           registrationModal.classList.add('visible');
        };

        msg.insertAdjacentElement('afterend', registerBtn);
     };
   
     getRoute(start, end, type, handleRouteData);
  });

  // --- FUNCIONES DE MODALES ---
  const closeModal = (modal) => {
    modal.classList.remove('visible');
  };

  const showMessage = (message, title = 'Información') => {
    messageModalContent.innerHTML = `<h2>${title}</h2><p>${message}</p>`;
    messageModal.classList.add('visible');
  };

  registrationCloseBtn.addEventListener('click', () => closeModal(registrationModal));
  const closeMessageModal = () => closeModal(messageModal);
  messageCloseBtn.addEventListener('click', closeMessageModal);
  messageOkBtn.addEventListener('click', closeMessageModal);

  tripsCloseBtn.addEventListener('click', () => closeModal(tripsModal));
  tripDetailCloseBtn.addEventListener('click', () => closeModal(tripDetailModal));
  adminCloseBtn.addEventListener('click', () => closeModal(adminModal));

  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('auth-modal')) {
      closeModal(e.target);
    }
  });

  registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const currentUser = sessionStorage.getItem('currentUser');
    const tripDataString = e.target.dataset.tripData;

    if (currentUser && tripDataString) {
      const tripData = JSON.parse(tripDataString);
      
      tripData.clientName = document.getElementById('client-name').value;
      tripData.clientId = document.getElementById('client-id').value;
      tripData.registeredBy = currentUser;
      tripData.registrationTimestamp = new Date().toISOString();

      const userTripsKey = `trips_${currentUser}`;
      const existingTrips = JSON.parse(localStorage.getItem(userTripsKey)) || [];
      existingTrips.push(tripData);
      localStorage.setItem(userTripsKey, JSON.stringify(existingTrips));
    }

    showMessage('¡Vuelo registrado con éxito!', 'Registro Completo');
    closeModal(registrationModal);
    document.getElementById('form').reset();
    document.getElementById('msg').textContent = "";
    document.getElementById('register-flight-btn')?.remove();
    document.getElementById('route-summary').classList.remove('visible');
  });

  logoutBtn.addEventListener('click', () => {
    sessionStorage.clear();
    window.location.href = 'login.php';
  });

  // --- LÓGICA DE ADMINISTRACIÓN ---
  const populateEmployeeList = () => {
      const users = JSON.parse(localStorage.getItem('app_users'));
      employeeListDiv.innerHTML = '';
      for (const username in users) {
          if (username !== 'administrador') {
              const item = document.createElement('div');
              item.className = 'employee-item';
              item.textContent = username;
              employeeListDiv.appendChild(item);
          }
      }
  };

  createUserForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newUserName = document.getElementById('new-user-name').value;
      const newUserPass = document.getElementById('new-user-pass').value;
      adminMsg.textContent = '';

      if (!newUserName || !newUserPass) {
          adminMsg.textContent = 'Ambos campos son obligatorios.';
          return;
      }

      const users = JSON.parse(localStorage.getItem('app_users'));

      if (users[newUserName]) {
          adminMsg.textContent = 'Ese nombre de usuario ya existe.';
          return;
      }

      users[newUserName] = newUserPass;
      localStorage.setItem('app_users', JSON.stringify(users));
      
      adminMsg.textContent = `Empleado '${newUserName}' creado con éxito.`;
      adminMsg.style.color = 'green';
      createUserForm.reset();
      populateEmployeeList();
  });


  // --- FUNCIONES PARA ACTUALIZAR LA INTERFAZ ---
  function updateUIForLoggedInUser(user, role) {
    userGreetingDiv.style.display = 'flex';
    usernameDisplay.textContent = `Usuario: ${user}`; 

    if (role === 'admin') {
        // --- VISTA DE ADMINISTRADOR ---
        // El administrador ahora ve la interfaz normal Y tiene acceso al panel de admin.
        
        const adminBtn = document.createElement('button');
        adminBtn.textContent = 'Creación de Empleado';
        adminBtn.className = 'admin-btn';
        adminBtn.onclick = () => {
            populateEmployeeList();
            adminModal.classList.add('visible');
        };
        logoutBtn.insertAdjacentElement('beforebegin', adminBtn);

    } else {
        // --- VISTA DE EMPLEADO ---
        if (!document.getElementById('my-trips-btn')) {
          const myTripsBtn = document.createElement('button');
          myTripsBtn.textContent = 'Vuelos Registrados';
          myTripsBtn.id = 'my-trips-btn';
          myTripsBtn.className = 'my-trips-btn';
          
          myTripsBtn.addEventListener('click', () => {
            const currentUser = sessionStorage.getItem('currentUser');
            const userTripsKey = `trips_${currentUser}`;
            const trips = JSON.parse(localStorage.getItem(userTripsKey)) || [];

            tripsListDiv.innerHTML = '';

            if (trips.length > 0) {
              trips.reverse().forEach((trip) => {
                const tripElement = document.createElement('div');
                tripElement.className = 'trip-item';
                
                const tripText = document.createElement('span');
                tripText.textContent = `Cliente: ${trip.clientName} | Vuelo: ${trip.origin} a ${trip.dest}`;

                const infoBtn = document.createElement('button');
                infoBtn.textContent = 'Detalles';
                infoBtn.className = 'btn-trip-info';
                infoBtn.onclick = () => {
                  
                  let waypointSummaryHTML = '';
                  if (trip.transportType === 'bus' && trip.waypointSummary && trip.waypointSummary.length > 0) {
                    waypointSummaryHTML += '<h4>Resumen de la Ruta:</h4><ul style="padding-left: 0; text-align: left; list-style-type: none;">';
                    const recorridoLabels = ["Primer", "Segundo", "Tercer", "Cuarto", "Quinto", "Sexto", "Séptimo", "Octavo", "Noveno", "Décimo"];
                    trip.waypointSummary.forEach((segment, index) => {
                      const timeInSeconds = segment.time;
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
                  }

                  tripDetailContent.innerHTML = `
                    <p><strong>Cliente:</strong> ${trip.clientName} (C.I./Pasaporte: ${trip.clientId})</p>
                    <hr>
                    <p><strong>Origen:</strong> ${trip.origin}</p>
                    <p><strong>Destino:</strong> ${trip.dest}</p>
                    <p><strong>Pasajeros:</strong> ${trip.passengers}</p>
                    <p><strong>Fecha de Ida:</strong> ${trip.departureDate}</p>
                    ${trip.returnDate ? `<p><strong>Fecha de Vuelta:</strong> ${trip.returnDate}</p>` : ''}
                    <p><strong>Transporte:</strong> ${trip.transportType === 'avion' ? 'Avión ✈️' : 'Autobús 🚌'} (${trip.totalTime})</p>
                    ${waypointSummaryHTML}
                    <hr>
                    <p style="font-size: 0.8rem; color: #666;">Registrado por: ${trip.registeredBy} el ${new Date(trip.registrationTimestamp).toLocaleString()}</p>
                  `;
                  tripDetailModal.classList.add('visible');
                };

                tripElement.appendChild(tripText);
                tripElement.appendChild(infoBtn);
                tripsListDiv.appendChild(tripElement);
              });
            } else {
              tripsListDiv.innerHTML = '<p>Aún no has registrado ningún vuelo.</p>';
            }
            tripsModal.classList.add('visible');
          });

          logoutBtn.insertAdjacentElement('beforebegin', myTripsBtn);
        }
    }
  }

  // --- Comprobar estado de sesión al cargar la página ---
  const checkLoginStatus = () => {
    const currentUser = sessionStorage.getItem('currentUser');
    const userRole = sessionStorage.getItem('userRole');
    if (currentUser && userRole) {
      updateUIForLoggedInUser(currentUser, userRole);
    } else {
      window.location.href = 'login.php';
    }
  };

  checkLoginStatus();
  
 });

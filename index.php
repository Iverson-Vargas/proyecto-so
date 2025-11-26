<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <title>Agencia de Viajes Venezuela</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script src="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js"></script>
  <link rel="stylesheet" href="assets/diseño.css">
</head>

<body>

  <header id="menu-superior">
    <a href="#" class="logo">Vuela<b>Vzla</b></a>
    <div id="user-session">
      <div id="user-greeting">
        <span id="username-display"></span>
        <button id="logout-btn">Cerrar Sesión</button>
      </div>
    </div>
  </header>

  <main id="contenido-principal">
    <form id="form">
      <label class="checkbox-container">Viaje de ida y vuelta
        <input type="checkbox" id="roundTrip">
        <span class="checkmark"></span>
      </label>
      <label>Origen:</label>
      <select id="origin" required>
        <option value="">Selecciona</option>
      </select>

      <label>Destino:</label>
      <select id="dest" required>
        <option value="">Selecciona</option>
      </select>

      <label>Fecha Ida:</label>
      <input type="date" id="depDate" required>

      <div id="return-date-container">
        <label for="returnDate">Fecha Vuelta:</label>
        <input type="date" id="returnDate">
      </div>

      <label>Pasajeros:</label>
      <input type="number" id="pass" min="1" value="1" required>

      <label>Tipo de Transporte:</label>
      <select id="type">
        <option value="bus">Bus</option>
        <option value="avion">Avión</option>
      </select>

      <button type="submit">Reservar y Mostrar Ruta</button>
    </form>

    <div class="map-container">
      <div id="route-summary"></div>
      <div id="map"></div>
      <div id="msg"></div>

    </div>
    
  </main>

  <footer id="pie-pagina">
    <div class="footer-container">
      <div class="footer-column">
        <h3>Sobre VuelaVzla</h3>
        <p>Tu agencia de viajes de confianza para descubrir las maravillas de Venezuela. Ofrecemos las mejores rutas y precios para que explores el país de punta a punta.</p>
      </div>
      <div class="footer-column">
        <h3>Síguenos</h3>
        <div class="social-links">
          <a href="#">Facebook</a>
          <a href="#">Instagram</a>
          <a href="#">Twitter / X</a>

        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2025 VuelaVzla. Todos los derechos reservados.</p>
    </div>
  </footer>

  <script src="assets/funciones.js"></script>

</body>

</html>

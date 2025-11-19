// server.js
const express = require("express");
const fetch = require("node-fetch"); // instala con: npm install node-fetch
const cors = require("cors");

const app = express();
app.use(cors());

// Tu API Key de OpenRouteService
const ORS_API_KEY = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjVmZjcxYmM3M2M1MjQ0Mzc4NjM3ZDNhZmNjOGY2NjViIiwiaCI6Im11cm11cjY0In0="; // reemplaza con tu clave válida

// Endpoint para calcular ruta
app.get("/route", async (req, res) => {
  const { startLon, startLat, endLon, endLat } = req.query;

  if (!startLon || !startLat || !endLon || !endLat) {
    return res.status(400).json({ error: "Faltan parámetros" });
  }

  const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${ORS_API_KEY}&start=${startLon},${startLat}&end=${endLon},${endLat}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error consultando ORS" });
  }
});

// Inicia servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor proxy corriendo en http://localhost:${PORT}`);
});
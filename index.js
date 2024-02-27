const express = require('express');
const path = require('path');

const app = express();
const PORT = 80;

// Configurar Express para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'Index')));
app.use(express.static(path.join(__dirname, 'Login')));
app.use(express.static(path.join(__dirname, 'Service')));


// Ruta de inicio
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Index', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'Login', 'login.html'));
});

app.get('/service', (req, res) => {
  res.sendFile(path.join(__dirname, 'Service', 'service.html'));
});

// Escuchar en el puerto 80
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

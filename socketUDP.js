const dgram = require('dgram');

// Creamos un servidor UDP
const server = dgram.createSocket('udp4');

const PORT = 65535;
const HOST = '0.0.0.0'; // Escucha en todas las interfaces de red

server.on('listening', () => {
  const address = server.address();
  console.log(`Servidor UDP escuchando en ${address.address}:${address.port}`);
});

server.on('message', (message, remote) => {
  console.log(`Mensaje recibido de ${remote.address}:${remote.port}: ${message}`);

  // Convertimos el mensaje recibido a string
  const messageStr = message.toString();

  // Dividimos el mensaje por las etiquetas y extraemos los valores
  const parts = messageStr.split('  ');
  const locationParts = parts[0].split(': ')[1].split(',');
  const dateParts = parts[1].split(': ')[1].split('  ')[0];
  const timeParts = parts[2].split(': ')[1];

  const longitud = parseFloat(locationParts[0]);
  const latitud = parseFloat(locationParts[1]);
  const fecha = dateParts;
  const hora = timeParts;

  // Mostramos los datos obtenidos
  console.log("Longitud:", longitud);
  console.log("Latitud:", latitud);
  console.log("Fecha:", fecha);
  console.log("Hora:", hora);
});

// Ligamos el servidor al puerto y dirección especificados
server.bind(PORT, HOST);
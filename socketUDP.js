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
});

// Ligamos el servidor al puerto y dirección especificados
server.bind(PORT, HOST);

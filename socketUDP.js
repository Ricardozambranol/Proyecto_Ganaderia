const dgram = require('dgram');
const mysql = require('mysql2/promise');

// Creamos un servidor UDP
const server = dgram.createSocket('udp4');

const PORT = 65535;
const HOST = '0.0.0.0'; // Escucha en todas las interfaces de red

// Configuración de la conexión a la base de datos
const dbConfig = {
  host: 'database-pf.cl2tzeneg5k4.us-east-2.rds.amazonaws.com', // Cambiar a la dirección de tu instancia RDS
  user: 'admin_ganadero',      // Cambiar al usuario de tu base de datos
  password: 'regguB-mocco2-fyvgid',  // Cambiar a la contraseña de tu base de datos
  database: 'coordenadas'   // Cambiar al nombre de tu base de datos
};

// Función para crear la tabla si no existe
async function createTableIfNotExists(connection) {
  try {
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS mensajes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        mensaje TEXT,
        longitud FLOAT,
        latitud FLOAT,
        fecha DATE,
        hora TIME
      )
    `);
    console.log("Tabla 'mensajes' creada o verificada correctamente");
  } catch (error) {
    console.error("Error al crear o verificar la tabla 'mensajes':", error);
  }
}

server.on('listening', () => {
  const address = server.address();
  console.log(`Servidor UDP escuchando en ${address.address}:${address.port}`);
});

server.on('message', async (message, remote) => {
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

  // Establecemos la conexión con la base de datos
  try {
    const connection = await mysql.createConnection(dbConfig);
    await createTableIfNotExists(connection); // Verificamos si la tabla existe o la creamos si no
    // Insertamos los datos en la tabla de la base de datos
    await connection.execute('INSERT INTO mensajes (mensaje, longitud, latitud, fecha, hora) VALUES (?, ?, ?, ?, ?)', [messageStr, longitud, latitud, fecha, hora]);
    console.log("Datos insertados en la base de datos correctamente");
    await connection.end();
  } catch (error) {
    console.error("Error al insertar datos en la base de datos:", error);
  }
});

// Ligamos el servidor al puerto y dirección especificados
server.bind(PORT, HOST);
  
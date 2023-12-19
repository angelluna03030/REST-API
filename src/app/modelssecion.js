const mongoose = require('mongoose');

// Cadena de conexión a tu base de datos de MongoDB
const uri = 'mongodb://localhost:27017/sesion'; // Reemplaza con tu cadena de conexión

// Conectar a la base de datos si la conexión aún no está establecida
if (mongoose.connection.readyState === 0) {
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
}

// Manejar eventos de conexión
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB de la sesion:'));
db.once('open', function () {
  console.log('Conectado a la base de datos MongoDB');
});

// Definir el modelo si aún no está definido
const registrosSchema = new mongoose.Schema({
  nombre: {
    type: String, // Cambiado a String en lugar de Date
    required: [true, "El nombre es requerido"],
  },
  apellidos: {
    type: String,
    required: [true, "Los apellidos son requeridos"],
  },
  Correo: {
    type: String,
    required: [true, "El correo es requerido"],
  },
  constrena: {
    type: String,
    required: [true, "La contraseña es requerida"],
    select: false,
  },
  numero: {
    type: String,
    required: [true, "El número de teléfono es requerido"],
  },
});

const registros = mongoose.models.registros || mongoose.model('registros', registrosSchema);

module.exports = registros;

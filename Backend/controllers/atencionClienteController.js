// controllers/atencionClienteController.js
const db = require('../config/db'); // Asegúrate de tener la configuración de la DB

// Obtener todas las quejas de atención al cliente
const getAtencionClientes = (req, res) => {
  const query = 'SELECT * FROM atencion_cliente';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener las quejas' });
    }
    res.json(results);
  });
};

// Agregar una nueva queja
const addAtencionCliente = (req, res) => {
  const { nombre_victima, queja, detalles, tipo_queja, estado } = req.body;

  if (!nombre_victima || !queja || !detalles || !tipo_queja) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  const query = 'INSERT INTO atencion_cliente (nombre_victima, queja, detalles, tipo_queja, estado) VALUES (?, ?, ?, ?, ?)';
  
  db.query(query, [nombre_victima, queja, detalles, tipo_queja, estado], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al agregar la queja' });
    }
    res.status(201).json({ message: 'Queja de atención al cliente agregada correctamente' });
  });
};

module.exports = { getAtencionClientes, addAtencionCliente };

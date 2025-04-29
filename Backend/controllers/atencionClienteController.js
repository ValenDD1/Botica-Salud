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
  const { nombre_victima, queja, detalles, tipo_queja } = req.body;

  if (!nombre_victima || !queja || !detalles || !tipo_queja) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  const query = 'INSERT INTO atencion_cliente (nombre_victima, queja, detalles, tipo_queja) VALUES (?, ?, ?, ?)';
  
  db.query(query, [nombre_victima, queja, detalles, tipo_queja], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al agregar la queja' });
    }
    res.status(201).json({ message: 'Queja de atención al cliente agregada correctamente' });
  });
};


const deleteService = (req, res) => {
  const { id } = req.params;

  // Primero, obtenemos el estado actual del usuario
  const querySelect = 'SELECT estado FROM atencion_cliente WHERE id = ?';
  
  db.query(querySelect, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener usuario' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Cambiamos el estado del usuario
    const newState = results[0].estado === 1 ? 0 : 1; // Si el estado es 1, lo cambiamos a 0 y viceversa

    const queryUpdate = 'UPDATE atencion_cliente SET estado = ? WHERE id = ?';
    
    db.query(queryUpdate, [newState, id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Error al cambiar el estado del usuario' });
      }
      res.status(200).json({
        message: `Estado del Asunto cambiado a ${newState === 1 ? 'pendiente' : 'resuelto'}`
      });
    });
  });
};
module.exports = { getAtencionClientes, addAtencionCliente ,deleteService};

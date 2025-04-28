// controllers/userController.js
const db = require('../config/db'); // Asegúrate de tener la configuración de la DB en este archivo

// Obtener todos los usuarios
const getUsers = (req, res) => {
  const query = 'SELECT * FROM usuarios';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener usuarios' });
    }
    res.json(results);
  });
};

// Agregar un nuevo usuario
const addUser = (req, res) => {
  const { nombre_usuario, correo, contrasena, estado } = req.body;

  if (!nombre_usuario || !correo || !contrasena || estado === undefined) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  const query = 'INSERT INTO usuarios (nombre_usuario, correo, contrasena, estado) VALUES (?, ?, ?, ?)';
  db.query(query, [nombre_usuario, correo, contrasena, estado], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al agregar el usuario' });
    }
    res.status(201).json({ message: 'Usuario agregado correctamente' });
  });
};

//editar un usuario
const editUser = (req, res) => {
  const { id } = req.params;
  const { nombre_usuario, correo, contrasena, estado } = req.body;

  if (!nombre_usuario || !correo || !contrasena || estado === undefined) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  const query = `
    UPDATE usuarios 
    SET nombre_usuario = ?, correo = ?, contrasena = ?, estado = ? 
    WHERE id = ?
  `;
  
  db.query(query, [nombre_usuario, correo, contrasena, estado, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al editar el usuario' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario actualizado correctamente' });
  });
};

//cambiar de estado del usuario
const deleteUser = (req, res) => {
  const { id } = req.params;

  // Primero, obtenemos el estado actual del usuario
  const querySelect = 'SELECT estado FROM usuarios WHERE id = ?';
  
  db.query(querySelect, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener usuario' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Cambiamos el estado del usuario
    const newState = results[0].estado === 1 ? 0 : 1; // Si el estado es 1, lo cambiamos a 0 y viceversa

    const queryUpdate = 'UPDATE usuarios SET estado = ? WHERE id = ?';
    
    db.query(queryUpdate, [newState, id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Error al cambiar el estado del usuario' });
      }
      res.status(200).json({
        message: `Estado del usuario cambiado a ${newState === 1 ? 'activo' : 'inactivo'}`
      });
    });
  });
};

module.exports = { getUsers, addUser ,editUser,deleteUser};

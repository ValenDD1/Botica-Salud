// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');

// Obtener todos los usuarios
router.get('/', userController.getUsers);
// Agregar un nuevo usuario
router.post('/', userController.addUser);
// Editar un usuario existente
router.put('/:id', userController.editUser);
// Eliminar un usuario existente
router.put('/delete/:id', userController.deleteUser);

module.exports = router;

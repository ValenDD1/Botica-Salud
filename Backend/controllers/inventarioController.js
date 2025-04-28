const db = require('../config/db');

exports.getAllInventarios = (req, res) => {
    db.query('SELECT * FROM inventario', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

exports.createInventario = (req, res) => {
    const { nombre_proveedor, producto, stock, marca, precio_compra, precio_venta } = req.body;
    const query = 'INSERT INTO inventario (nombre_proveedor, producto, stock, marca, precio_compra, precio_venta, fecha) VALUES (?, ?, ?, ?, ?, ?, NOW())';
    db.query(query, [nombre_proveedor, producto, stock, marca, precio_compra, precio_venta], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, nombre_proveedor, producto, stock, marca, precio_compra, precio_venta });
    });
};
exports.updateInventario = (req, res) => {
    const { id } = req.params;
    const { nombre_proveedor, producto, stock, marca, precio_compra, precio_venta } = req.body;
    
    // Verificar si el inventario existe
    db.query('SELECT * FROM inventario WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Inventario no encontrado' });
        }

        // Realizar actualización
        const query = 'UPDATE inventario SET nombre_proveedor = ?, producto = ?, stock = ?, marca = ?, precio_compra = ?, precio_venta = ? WHERE id = ?';
        db.query(query, [nombre_proveedor, producto, stock, marca, precio_compra, precio_venta, id], (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: 'Inventario actualizado con éxito' });
        });
    });
};

// Eliminar un inventario por ID
exports.deleteInventario = (req, res) => {
    const { id } = req.params;

    // Verificar si el inventario existe
    db.query('SELECT * FROM inventario WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Inventario no encontrado' });
        }

        // Realizar eliminación
        const query = 'DELETE FROM inventario WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: 'Inventario eliminado con éxito' });
        });
    });
};
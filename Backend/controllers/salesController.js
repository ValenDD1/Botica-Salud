const db=require('../config/db');

const getSales = (req, res) => {
        const query = 'SELECT * FROM ventas';
        db.query(query, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener ventas' });
            }
            res.json(results);
        });
    };

const addSale = (req, res) => {
    const { nombre_cliente, dni, productos, cantidad, total } = req.body;
    
    if (!nombre_cliente || !productos || !cantidad || !total) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }
    
    // Si no hay DNI, se coloca como NULL en la base de datos
    const query = 'INSERT INTO ventas (nombre_cliente, dni, productos, cantidad, total) VALUES (?, ?, ?, ?, ?)';
    
    db.query(query, [nombre_cliente, dni || null, productos, cantidad, total], (err, results) => {
        if (err) {
        return res.status(500).json({ error: 'Error al agregar la venta' });
        }
        res.status(201).json({ message: 'Venta agregada correctamente' });
    });
    };
module.exports = { getSales, addSale };

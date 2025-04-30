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

/* const addSale = (req, res) => {
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
    }; */

const addSale = async (req, res) => {
        const conn = await db.promise().getConnection(); // Transacción
    
        try {
            const { nombre_cliente, dni, productos } = req.body;
    
            if (!productos || Object.keys(productos).length === 0) {
                return res.status(400).json({ error: 'No hay productos en la venta' });
            }
    
            await conn.beginTransaction();
    
            let ventaTotal = 0;
            const productosArray = [];
    
            for (const [nombreProducto, cantidad] of Object.entries(productos)) {
                if (cantidad <= 0) {
                    await conn.rollback();
                    return res.status(400).json({ error: `Cantidad inválida para ${nombreProducto}` });
                }
    
                const [rows] = await conn.query(
                    'SELECT id, precio_venta, stock FROM inventario WHERE producto = ?',
                    [nombreProducto]
                );
    
                const productoDB = rows[0];
    
                if (!productoDB) {
                    await conn.rollback();
                    return res.status(400).json({ error: `Producto no encontrado: ${nombreProducto}` });
                }
    
                if (productoDB.stock < cantidad) {
                    await conn.rollback();
                    return res.status(400).json({ error: `Stock insuficiente para ${nombreProducto}` });
                }
    
                const subtotal = cantidad * productoDB.precio_venta;
                ventaTotal += subtotal;
    
                productosArray.push({
                    id: productoDB.id,
                    nombre: nombreProducto,
                    cantidad,
                    precio: productoDB.precio_venta,
                    subtotal
                });
            }
    
            const productosJSON = JSON.stringify(productosArray);
            const cantidadTotal = productosArray.reduce((acc, p) => acc + p.cantidad, 0);
    
            const [result] = await conn.query(
                'INSERT INTO ventas (nombre_cliente, dni, productos, cantidad, total) VALUES (?, ?, ?, ?, ?)',
                [nombre_cliente, dni, productosJSON, cantidadTotal, ventaTotal]
            );
    
            for (const producto of productosArray) {
                await conn.query(
                    'UPDATE inventario SET stock = stock - ? WHERE id = ?',
                    [producto.cantidad, producto.id]
                );
            }
    
            await conn.commit();
            conn.release();
    
            res.status(201).json({
                mensaje: 'Venta registrada exitosamente',
                ventaId: result.insertId
            });
    
        } catch (error) {
            await conn.rollback();
            conn.release();
            console.error('Error en registrarVenta:', error);
            res.status(500).json({ error: 'Error al procesar la venta', message: error.message });
        }
    };
module.exports = { getSales, addSale };

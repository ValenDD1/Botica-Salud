const db=require('../config/db');


//funcion de obtener el total de los productos de inventario
exports.getHistoryinventory = (req, res) => {
    const query = 'SELECT sum(stock) as total FROM inventario';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener el inventario' });
        }
        res.json(results);
    });
};

exports.getHistoryConsultas=(req,res)=>{
    const query = 'SELECT COUNT(*) as filas FROM atencion_cliente';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener el inventario' });
        }
        res.json(results);
    });
}

exports.getHistoryGanancias=(req,res)=>{
    const query = 'SELECT sum(total) as ganancias FROM ventas';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener el inventario' });
        }
        res.json(results);
    });
}



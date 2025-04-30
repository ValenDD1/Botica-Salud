const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root', // Tu usuario
    password: '', // Tu contraseña
    database: 'bd_nova_salud',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// db.connect(err => {
//     if (err) {
//         console.error('Error de conexión a la base de datos:', err.stack);
//         return;
//     }
//     console.log('Conexión a la base de datos exitosa!');
// });

module.exports = db;
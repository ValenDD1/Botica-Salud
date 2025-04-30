const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db'); // Configuración de la base de datos



const inventa = require('./Routes/InventarioRoutes'); // Rutas de inventario
const usuaria=require('./Routes/UserRoutes');
const sales=require('./Routes/SalesRoutes');
const atencion=require('./Routes/AtencionClienteRoutes');
const History = require('./Routes/HistoryRoutes');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/inventario', inventa);
app.use('/api/usuarios', usuaria);
app.use('/api/ventas', sales);
app.use('/api/atencion', atencion);
app.use('/api/historial', History);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

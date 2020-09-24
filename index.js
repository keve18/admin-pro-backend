require('dotenv').config();
const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');

// Creando el Servidor
const app = express();

//Configurar Cors
app.use(cors());
// Lectura y parseo del body
app.use(express.json());


// Base de Datos
dbConnection();

//Rutas
app.use('/api/usuarios', require('./routes/usuario.router'));
app.use('/api/login', require('./routes/auth.router'));

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto', process.env.PORT);
});
//clave mongo atlas: pJx4DJlqHObOgyoZ
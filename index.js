require('dotenv').config();
const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');

// Creando el Servidor
const app = express();

//Configurar Cors
app.use(cors());


// Base de Datos
dbConnection();
// console.log(process.env);

//Rutas
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto', process.env.PORT);
});
//clave mongo atlas: pJx4DJlqHObOgyoZ
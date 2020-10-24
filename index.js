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
//Directorio Publico
app.use(express.static('public'));

//Rutas
app.use('/api/usuarios', require('./routes/usuario.router'));
app.use('/api/login', require('./routes/auth.router'));
app.use('/api/login/google', require('./routes/auth.router'));
app.use('/api/hospitales', require('./routes/hospitales.router'));
app.use('/api/medicos', require('./routes/medicos.router'));
app.use('/api/todo', require('./routes/busquedas.router'));
app.use('/api/upload', require('./routes/uploads.router'));


app.use('/api/constante', require('./routes/constante.router')); //pruebas para lo de Pool Eliminar luego

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto', process.env.PORT);
});
//clave mongo atlas: pJx4DJlqHObOgyoZ
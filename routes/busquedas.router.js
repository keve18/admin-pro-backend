/* Ruta: /api/hospitales */
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();
const { getTodo, getcoleccion } = require('../controllers/busquedas.controller');

router.get('/:busqueda', validarJWT, getTodo);
router.get('/coleccion/:tabla/:busqueda', validarJWT, getcoleccion);

module.exports = router;
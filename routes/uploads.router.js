/* Ruta: /api/upload */
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-jwt');
const { putArchivos, getFoto } = require('../controllers/uploads.controller');

const router = Router();

router.use(expressFileUpload());

router.put('/:tipo/:id', validarJWT, putArchivos);
router.get('/:tipo/:foto', validarJWT, getFoto);

module.exports = router;
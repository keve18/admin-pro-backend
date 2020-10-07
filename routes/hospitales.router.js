/* Ruta: /api/hospitales */
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();
const { getHospitales, postHospitales, putHospitales, deleteHospitales } = require('../controllers/hospitales.controller');

router.get('/', validarJWT, getHospitales);
router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del hospital es obligatorio').not().notEmpty(),
        validarCampos
    ],
    postHospitales
);
router.put('/:id', [],
    putHospitales
);
router.delete('/:id', deleteHospitales);
module.exports = router;
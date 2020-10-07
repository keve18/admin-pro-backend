/* Ruta: /api/constante */
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();
const { getConstante, postConstante } = require('../controllers/constante.controller');

router.get('/', getConstante);
router.post('/', [
        check('valor', 'El valor de la constante es obligatorio').not().notEmpty(),
        check('nombre', 'El nombre de la constante es obligatorio').not().notEmpty(),
        validarCampos
    ],
    postConstante
);
module.exports = router;
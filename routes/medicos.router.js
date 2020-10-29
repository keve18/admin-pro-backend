/* Ruta: /api/medicos */
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();
const { getMedico, postMedico, putMedico, deleteMedico } = require('../controllers/medicos.controller');

router.get('/', validarJWT, getMedico);
router.post('/', [
        validarJWT,
        check('nombres', 'Los Nombres son obligatorios').notEmpty(),
        check('apellidoP', 'El apellido paterno es obligatorios').notEmpty(),
        check('apellidoM', 'El apellido materno es obligatorios').notEmpty(),
        check('email', 'El email es obligatorios').isEmail(),
        check('sucursal', 'El ID del hospital tiene que ser valido').isMongoId(),
        validarCampos
    ],
    postMedico
);
router.put('/:id', [
        validarJWT,
        check('nombres', 'Los Nombres son obligatorios').notEmpty(),
        check('apellidoP', 'El apellido paterno es obligatorios').notEmpty(),
        check('apellidoM', 'El apellido materno es obligatorios').notEmpty(),
        check('email', 'El email es obligatorios').isEmail(),
        check('sucursal', 'El ID del hospital tiene que ser valido').isMongoId(),
        validarCampos
    ],
    putMedico
);
router.delete('/:id', deleteMedico);
module.exports = router;
/* Ruta: /api/usuarios */
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();
const { getUsuarios, postUsuarios, putUsuarios, deleteUsuarios } = require('../controllers/usuario.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

router.get('/', validarJWT, getUsuarios);
router.post('/', [
        check('nombres', 'El nombre es obligatorio').not().notEmpty(),
        check('apellidoP', 'El apellido Paterno es obligatorio').not().notEmpty(),
        check('apellidoM', 'El apellido Materno es obligatorio').not().notEmpty(),
        check('clave', 'La clave es obligatorio').not().notEmpty(),
        check('email', 'El Email es obligatorio').isEmail(),
        validarCampos
    ],
    postUsuarios
);
router.put('/:id', [
        validarJWT,
        check('nombres', 'El nombre es obligatorio').not().notEmpty(),
        check('apellidoP', 'El apellido Paterno es obligatorio').not().notEmpty(),
        check('apellidoM', 'El apellido Materno es obligatorio').not().notEmpty(),
        check('email', 'El Email es obligatorio').isEmail(),
        check('clave', 'El Rol es obligatorio').not().notEmpty(),
        validarCampos
    ],
    putUsuarios
);
router.delete('/:id', validarJWT, deleteUsuarios);
module.exports = router;
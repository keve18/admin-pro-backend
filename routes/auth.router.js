/* Ruta: /api/login */
const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { login, google, renovarToken } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

router.post('/', [
        check('email', 'El email es obligatorio').isEmail(),
        check('clave', 'El password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login
);
router.post('/google', [
        check('token', 'El token es obligatorio').not().isEmpty(),
        validarCampos
    ],
    google
);
router.get('/expirartoken', validarJWT, renovarToken);


module.exports = router;
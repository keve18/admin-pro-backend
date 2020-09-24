const { response } = require('express');
const { validationResult } = require('express-validator');


const validarCampos = (req, res = response, next) => {

    const ValidarErrores = validationResult(req);
    if (!ValidarErrores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: ValidarErrores.mapped()
        });
    }
    next();
}
module.exports = {
    validarCampos
}
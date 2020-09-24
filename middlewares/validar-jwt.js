const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    //Leer el token desde el Headers
    const vToken = req.header('x-token');
    if (!vToken) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }
    try {
        const { uid } = jwt.verify(vToken, process.env.JWT_SECRET_KEY);
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }
};

module.exports = {
    validarJWT,
};
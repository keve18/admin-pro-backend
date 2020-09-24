const { response } = require('express');
const bcrypt = require('bcryptjs');
const UsuarioM = require('../models/usuario.model');
const { generarJWT } = require('../helpers/jwt');




login = async(req, res = response) => {
    const { email, clave } = req.body;
    try {
        //Verificar Email
        const UsuarioDB = await UsuarioM.findOne({ email });
        if (!UsuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no valido'
            });
        }
        //Verificar Password
        const validPass = bcrypt.compareSync(clave, UsuarioDB.clave);
        if (!validPass) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña invalida'
            });
        }
        //Generar Token (Json Web Token = JWT)
        const token = await generarJWT(UsuarioDB.id);
        res.json({
            ok: true,
            token
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador del sistema'
        });
    }
};


module.exports = {
    login,
};
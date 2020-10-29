const { response } = require('express');
const bcrypt = require('bcryptjs');
const UsuarioM = require('../models/usuario.model');
const { generarJWT } = require('../helpers/jwt');
const { googleverify } = require('../helpers/google-login');




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

google = async(req, res = response) => {
    const gooleToken = req.body.token;
    try {
        const { name, email, picture } = await googleverify(gooleToken);
        const UsuarioDB = await UsuarioM.findOne({ email });
        let usuarioData;
        if (!UsuarioDB) {
            //No existe usuario
            usuarioData = new UsuarioM({
                nombres: name,
                email,
                clave: '',
                img: picture,
                google: true
            });
        } else {
            //Existe usuario
            usuarioData = UsuarioDB;
            usuarioData.google = true;
        }
        //Guardar en BD
        await usuarioData.save();
        //Generar Token (Json Web Token = JWT)
        const token = await generarJWT(usuarioData.id);
        res.json({
            ok: true,
            token
        });
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token incorrecto comuniquese con el administrador del sistema'
        });
    }
};
const renovarToken = async(req, res = response) => {
    const uid = req.uid;
    //Generar Token (Json Web Token = JWT)
    const tokenNew = await generarJWT(uid);
    res.json({
        ok: true,
        tokenNew
    });
};

module.exports = {
    login,
    google,
    renovarToken
};
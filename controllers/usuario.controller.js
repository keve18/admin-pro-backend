const { response } = require('express');
const bcrypt = require('bcryptjs');
const UsuarioM = require('../models/usuario.model');
const { generarJWT } = require('../helpers/jwt');
getUsuarios = async(req, res) => {
    const desde = Number(req.query.desde) || 0;
    const [ListUsuario, total] = await Promise.all([
        UsuarioM.find({}, 'nombres apellidoP apellidoM email img')
        .skip(desde)
        .limit(5),
        UsuarioM.count()
    ]);
    res.json({
        ok: true,
        ListUsuario,
        total
    });
};
postUsuarios = async(req, res = response) => {
    const { email, clave } = req.body;

    try {
        const existeEmail = await UsuarioM.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }
        const usuarioData = new UsuarioM(req.body);

        //Encriptar clave
        const salt = bcrypt.genSaltSync();
        usuarioData.clave = bcrypt.hashSync(clave, salt);

        //Guardar registro en MongoDB
        await usuarioData.save();

        //Generar Token (Json Web Token = JWT)
        const token = await generarJWT(usuarioData.id);
        res.json({
            ok: true,
            usuarioData,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... Revisar logs'
        });
    }
};
putUsuarios = async(req, res = response) => {
    //TODO: Validar token y comprobar si el usuario es correcto
    const uid = req.params.id;
    try {
        const usuarioDB = await UsuarioM.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }
        //Actualizar usuario
        const { clave, google, email, ...campos } = req.body;
        if (usuarioDB.email != email) {
            const existeEmail = await UsuarioM.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }
        campos.email = email;

        const DataUpdate = await UsuarioM.findByIdAndUpdate(uid, campos, { new: true });
        res.json({
            ok: true,
            usuarioData: DataUpdate
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... Revisar logs'
        });
    }
};
deleteUsuarios = async(req, res = response) => {
    const uid = req.params.id;
    try {
        const usuarioDB = await UsuarioM.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }
        await usuarioM.findByIdAndDelete(uid);
        res.json({
            ok: true,
            msg: 'Usuario Eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... Revisar logs'
        });
    }
};
module.exports = {
    getUsuarios,
    postUsuarios,
    putUsuarios,
    deleteUsuarios
};
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarimg } = require('../helpers/actualizar-imagen');
const path = require('path');
const fs = require('fs');

getFoto = async(req, res = response) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathimg = path.join(__dirname, `../uploads/${tipo}/${foto}`);
    // Imagen por defecto
    if (fs.existsSync(pathimg)) {
        res.sendFile(pathimg);
    } else {
        const pathimg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathimg);
    }
};
putArchivos = async(req, res = response) => {
    const tipo = req.params.tipo;
    const id = req.params.id;

    //Validar tipo de Archivos
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un medico , usuario o hospital - (tipo)'
        });
    }
    //Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
    }

    //Procesar imagen
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.'); // obtenemos la extension de la img
    const extensionArchivo = nombreCortado[nombreCortado.length - 1].toLowerCase();
    // validar extencion
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extencion permitida'
        });
    }
    //Generar nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;
    //Path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;
    //Mover la imagen a la carpeta correspondiente
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }
        // Actualizar imagenes en la BD
        actualizarimg(tipo, id, nombreArchivo);

        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });
    });




}

module.exports = {
    getFoto,
    putArchivos
};
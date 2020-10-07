const { response } = require('express');
const UsuarioM = require('../models/usuario.model');
const MedicoM = require('../models/medico.model');
const HospitalesM = require('../models/hospital.model');

getTodo = async(req, res = response) => {
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');
    const [DataUsuario, DataMedico, DataHospital] = await Promise.all([
        UsuarioM.find({ nombres: regex }),
        MedicoM.find({ nombres: regex }),
        HospitalesM.find({ nombre: regex }),
    ]);


    res.json({
        ok: true,
        DataUsuario,
        DataMedico,
        DataHospital
    });
};
getcoleccion = async(req, res = response) => {
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');
    let data = [];

    switch (tabla) {
        case 'usuarios':
            data = await UsuarioM.find({ nombres: regex })
                .populate('nombres apellidoP apellidoM');
            break;
        case 'hospitales':
            data = await HospitalesM.find({ nombre: regex })
                .populate('usuario', 'nombre usuario');
            break;
        case 'medicos':
            data = await MedicoM.find({ nombres: regex })
                .populate('usuario', 'nombres apellidoP apellidoM sucursal');
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
            });
    }
    res.json({
        ok: true,
        data
    });
}

module.exports = {
    getTodo,
    getcoleccion
};
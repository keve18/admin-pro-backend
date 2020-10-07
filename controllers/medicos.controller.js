const { response } = require('express');
const MedicoM = require('../models/medico.model');
// const HospitalM = require('../models/hospital.model');


getMedico = async(req, res = response) => {
    const ListMedico = await MedicoM.find({}, 'nombres apellidoP apellidoM email img')
        .populate('usuario', 'nombres apellidoP img')
        .populate('sucursal', 'nombre');
    res.json({
        ok: true,
        ListMedico
    });
};
postMedico = async(req, res = response) => {
    const uid = req.uid;
    // const idsucursal = new HospitalM({
    //     id = usuarioData.id;
    // });
    const MedicoData = new MedicoM({
        usuario: uid,
        ...req.body
    });
    try {
        const medicoDB = await MedicoData.save();
        res.json({
            ok: true,
            medico: medicoDB
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        });
    }
};
putMedico = async(req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizar'
    });
};
deleteMedico = async(req, res = response) => {
    res.json({
        ok: true,
        msg: 'eliminar'
    });
};
module.exports = {
    getMedico,
    postMedico,
    putMedico,
    deleteMedico
};
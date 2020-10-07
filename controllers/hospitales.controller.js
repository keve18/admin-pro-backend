const { response } = require('express');
const HospitalesM = require('../models/hospital.model');


getHospitales = async(req, res = response) => {
    const ListHospital = await HospitalesM.find()
        .populate('usuario', 'nombres apellidoP img');
    res.json({
        ok: true,
        ListHospital
    });
};
postHospitales = async(req, res = response) => {
    const uid = req.uid;
    const HospitalData = new HospitalesM({
        usuario: uid,
        ...req.body
    });
    try {
        const hospitalDB = await HospitalData.save();
        res.json({
            ok: true,
            hospital: hospitalDB
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        });
    }
};
putHospitales = async(req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizar'
    });
};
deleteHospitales = async(req, res = response) => {
    res.json({
        ok: true,
        msg: 'eliminar'
    });
};
module.exports = {
    getHospitales,
    postHospitales,
    putHospitales,
    deleteHospitales
};
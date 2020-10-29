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
const putHospitales = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;
    try {
        const HospitalData = await HospitalesM.findById(id);
        if (!HospitalData) {
            return res.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado'
            });
        }
        const ActualizarHospital = {
            ...req.body,
            usuario: uid
        };
        const hospitalDB = await HospitalesM.findByIdAndUpdate(id, ActualizarHospital, { new: true });
        // console.log(hospitalDB);
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
deleteHospitales = async(req, res = response) => {
    const id = req.params.id;
    try {
        const HospitalData = await HospitalesM.findById(id);
        if (!HospitalData) {
            return res.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado'
            });
        }
        const hospitalDB = await HospitalesM.findByIdAndDelete(id);
        // console.log(hospitalDB);
        res.json({
            ok: true,
            msg: 'Hospital eliminado'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        });
    }
};
module.exports = {
    getHospitales,
    postHospitales,
    putHospitales,
    deleteHospitales
};
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
    const id = req.params.id;
    const uid = req.uid;
    try {
        const MedicoData = await MedicoM.findById(id);
        if (!MedicoData) {
            return res.status(404).json({
                ok: true,
                msg: 'Medico no encontrado'
            });
        }
        const ActualizarMedico = {
            ...req.body,
            usuario: uid
        };
        const MedicoDB = await MedicoM.findByIdAndUpdate(id, ActualizarMedico, { new: true });
        // console.log(MedicoDB);
        res.json({
            ok: true,
            medico: MedicoDB
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        });
    }
};
deleteMedico = async(req, res = response) => {
    const id = req.params.id;
    try {
        const MedicoData = await MedicoM.findById(id);
        if (!MedicoData) {
            return res.status(404).json({
                ok: true,
                msg: 'Medico no encontrado'
            });
        }
        const MedicoDB = await MedicoM.findByIdAndDelete(id);
        // console.log(MedicoDB);
        res.json({
            ok: true,
            msg: 'Medico eliminado'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        });
    }
};
module.exports = {
    getMedico,
    postMedico,
    putMedico,
    deleteMedico
};
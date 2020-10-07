const { response } = require('express');
const ConstanteM = require('../models/constante.model');


getConstante = async(req, res = response) => {
    const ListConstante = await ConstanteM.find()
        .populate('constante', 'nombres valor');
    res.json({
        ok: true,
        ListConstante
    });
};
postConstante = async(req, res = response) => {
    const uid = req.uid;
    const ConstanteData = new ConstanteM({
        usuario: uid,
        ...req.body
    });
    try {
        const ConstanteDB = await ConstanteData.save();
        res.json({
            ok: true,
            constante: ConstanteDB
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        });
    }
};

module.exports = {
    getConstante,
    postConstante
};
const fs = require('fs');
const UsuarioM = require('../models/usuario.model');
const MedicoM = require('../models/medico.model');
const HospitalM = require('../models/hospital.model');

const borrarimg = (path) => {
    if (fs.existsSync(path)) {
        //Borrar imagen anterior
        fs.unlinkSync(path);
    }
};

const actualizarimg = async(tipo, id, nombreArchivo) => {
    const pathViejo = '';
    switch (tipo) {
        case 'usuarios':
            const DataUsuario = await UsuarioM.findById(id);
            if (!DataUsuario) {
                console.log('No es un usuario por ID');
                return false
            }
            this.pathViejo = `./uploads/usuarios/${DataUsuario.img}`;
            borrarimg(this.pathViejo);
            DataUsuario.img = nombreArchivo;
            await DataUsuario.save();
            return true;

            break;
        case 'medicos':
            const DataMedico = await MedicoM.findById(id);
            if (!DataMedico) {
                console.log('No es un medico por ID');
                return false
            }
            this.pathViejo = `./uploads/medicos/${DataMedico.img}`;
            borrarimg(this.pathViejo);
            DataMedico.img = nombreArchivo;
            await DataMedico.save();
            return true;

            break;
        case 'hospitales':
            const DataHospital = await HospitalM.findById(id);
            if (!DataHospital) {
                console.log('No es un hospital por ID');
                return false
            }
            this.pathViejo = `./uploads/hospitales/${DataHospital.img}`;
            borrarimg(this.pathViejo);
            DataHospital.img = nombreArchivo;
            await DataHospital.save();
            return true;

            break;

        default:
            break;
    }
};

module.exports = {
    actualizarimg
}
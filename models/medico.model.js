const { Schema, model } = require('mongoose');
const MedicoSchema = Schema({
    nombres: {
        type: String,
        require: true
    },
    apellidoP: {
        type: String,
        require: true
    },
    apellidoM: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    img: {
        type: String
    },
    sucursal: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        require: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    }
});
//Codigo para cambiar la vista del _id de mongoDB y ocultar el __v
MedicoSchema.method('toJSON', function() {
    const { __v, _id, clave, ...object } = this.toObject();
    object.uid = _id;
    return object;
});
module.exports = model('Medico', MedicoSchema);
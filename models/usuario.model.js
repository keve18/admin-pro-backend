const { Schema, model } = require('mongoose');
const UsuarioSchema = Schema({
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
    clave: {
        type: String,
        require: true
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        require: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    }
});
//Codigo para cambiar la vista del _id de mongoDB y ocultar el __v
UsuarioSchema.method('toJSON', function() {
    const { __v, _id, clave, ...object } = this.toObject();
    object.uid = _id;
    return object;
});
module.exports = model('Usuario', UsuarioSchema);
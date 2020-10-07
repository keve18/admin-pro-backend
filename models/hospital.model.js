const { Schema, model, SchemaTypes } = require('mongoose');
const HospitalSchema = Schema({
        nombre: {
            type: String,
            require: true
        },
        img: {
            type: String
        },
        usuario: {
            require: true,
            type: Schema.Types.ObjectId,
            ref: 'Usuario' // con esta referencia relacionamos en mongose la tabla hospital y la tabla usuario
                //El nombre Usuario viene de usuario.model.js el mismo nombre con el que se exporta
        }
    },
    //colleccion es para colocar el nombre que queremos en la tabla de mongose en español y evite de agregar la "S" como si estuviera en ingles
    { collection: 'hospitales' }
);
//Codigo para cambiar la vista del _id de mongoDB y ocultar el __v
HospitalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});
module.exports = model('Hospital', HospitalSchema);
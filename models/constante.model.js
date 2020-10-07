const { Schema, model, SchemaTypes } = require('mongoose');
const ConstanteSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    valor: {
        type: String,
        require: true
    }
});
//Codigo para cambiar la vista del _id de mongoDB y ocultar el __v
ConstanteSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});
module.exports = model('Constante', ConstanteSchema);
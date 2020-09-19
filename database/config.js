const mongoose = require('mongoose');
const url = process.env.DB_CNN;

const dbConnection = async() => {
    try {
        mongoose.connect(`${url}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la coneccion a la BD ver logs');
    }
};
module.exports = {
    dbConnection
};


// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));
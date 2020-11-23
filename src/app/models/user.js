const mongoose = require('mongoose')
//nos permite encriptar 
const bcrypt = require('bcrypt-nodejs')

const userSchema= new mongoose.Schema({
    local:{
        email: String,
        password: String
    },
    facebook:{
        email: String,
        password:String,
        id: String,
        token: String
    },
    twitter:{
        email: String,
        password: String,
        id: String,
        token: String
    },
    google:{
        email: String,
        password: String,
        id: String,
        token: String
    }
});

//generar clave y cifrarla antes de almacenar en la base de datos 
userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

//transformar contraseña para comparar la que el usuario introduce con la
//que esta almacenada en al base de datos

userSchema.methods.validatePassword = function(password){
    return bcrypt.compareSync(password, this.local.password)
}

//exportar
module.exports = mongoose.model('User', userSchema)
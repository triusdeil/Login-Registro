//modulo express => permite crear el servidor
const express = require('express')
const app = express()
//modulo express-session
const session = require('express-session')
//modulo path => permite manejar las rutas(las carpetas)
const path =  require('path')
//modulo mongoose para conectar a la base de datos
const mongoose = require('mongoose')
//modulo passport nos permite configurar la manera en que nos vamos a autenticar
const passport = require('passport')
//modulo connect-flash
const flash = require('connect-flash')
//modulo morgan definir los metodos http que llegan al servidor y verlos por consola
const morgan = require('morgan')
//modulo cookie para poder administrar las cookies
const cookieParser = require('cookie-parser')
//modulo body-parser converti el cuerpo de la informacion que llegue del navegador al servidor
const bodyParser = require('body-parser')


//requerir la url de la base de datos
const {url} = require('./config/database')

//conectar la base de datos
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
//dividir el servidor
//settings
app.set('port',process.env.PORT || 3000)
//middlewares

//routes

//static files
app.listen(app.get('port'), () =>{
    console.log('server on port ' + app.get('port'))
})
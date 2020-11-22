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
//decir al servidor donde estaran todos los archivos de las vistas
app.set('views', path.join(__dirname, 'views'))
//configurar el motor de plantillas
app.set('view engine', 'ejs') 

//middlewares
//ver los mensajes por consola
app.use(morgan('dev'))
//convertir cookies de las peticiones para utilizarlas
app.use(cookieParser())
//la informacion que reciba de los formularios la voy a poder interpretar a traves de la url
//extended false: no procesar imagenes solo datos
app.use(bodyParser.urlencoded({extended: false}))
//poder manejar las sesiones de express
//secret variable de entorno
//resave false para que no se borre cada cierto tiempo
//
app.use(session({
    secret: 'triusdeil',
    resave: false,
    saveUninitialized:false
}))
//nos permite conectarnos o como nos vamos a autenticar
app.use(passport.initialize)
app.use(passport.session())
//comunicar entre las paginas html
app.use(flash())

//routes
//requerir donde estan las rutas
//le agregaremos 2 parametros
//la aplicacion express donde se han venido pasando los middleware y demas
//tambien le agregaremos passport para poder utilizar autenticacion
require('./app/routes/routes')(app,passport)

//static files
//definir donde estan los archivos css y demas
app.use(express.static( path.join(__dirname, 'public')))

app.listen(app.get('port'), () =>{
    console.log('server on port ' + app.get('port'))
})
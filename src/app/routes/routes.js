const passport = require("passport");

//recibimos los modulos de passport y express(app)
//configuramos las rutas
//y renderizamos la vista llamada index
module.exports = (app,passport) => {
    app.get('/',(req,res)=>{
        res.render('index')
    })
    app.get('/login',(req,res)=>{
        res.render('login',
        {
            message: req.flash('loginMesaje')
        })
    })
    app.get('/signup',(req,res)=>{
        res.render('index')
    })

    app.post('/login',(req,res)=>{
        
    })
}
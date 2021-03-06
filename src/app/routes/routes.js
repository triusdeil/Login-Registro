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
            message: req.flash('loginMessage')
        })
    })
    app.get('/signup',(req,res)=>{
        res.render('signup',{
            message: req.flash('signupMessage')
        })
    })

    app.post('/login', passport.authenticate('local-login',{
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }))

    app.post('/signup',passport.authenticate('local-signup',{
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }))

    app.get('/profile',isLoggedIn, (req,res) => {
        res.render('profile',{
            user: req.user
        })    
    })

    app.get('/logout', (req, res) =>{
        req.logout()
        res.redirect('/')
    })

    function isLoggedIn(req,res,next){
        if(req.isAuthenticated()){
            return next()
        }
        return res.redirect('/')
    }

    }
const express = require('express')

const cookieParser = require('cookie-parser')

const exphbs = require( 'express-handlebars' );

const app = express()
const port = 2000

const uname = 'hemalatha'
const pswd = 'hemalatha'

// body parser middleware
app.use( express.urlencoded( { extended: true } ) );

//cookie parser
app.use(cookieParser())

// set up template engine
app.engine( 'handlebars', exphbs() );
app.set( 'view engine', 'handlebars' );

app.get( '/', ( req, res ) => {
    res.render('./login.handlebars')
});
// app.get('/create-cookie',(req,res)=>{
//     res.cookie('myName','Hema')
//     res.send('cookie is created')
// })
// var express = require('express');
// var cookieParser = require('cookie-parser');
// var app = express();
// app.use(cookieParser('YOUR-SECRET-SALT'));

// app.get('/', (req, res, next) => {
//   res.cookie('name', 'value', { signed: true });
//   res.send('Success');
// });

// app.get('/test', (req, res, next) => {
//   req.signedCookies.name; 
// });

app.post('/login',(req,res)=>{
    const {username,password,checkbox} =req.body

    //logic  to create cookies or not 
  
    if(uname === username && pswd === password){
        console.log(req.session);
        res.render('./landingpage.handlebars');
        if(checkbox){

            res.cookie("myname",username,{
                maxAge:36000
            })
            res.cookie("password",password,{
                maxAge:36000
            })
        }

    }else{
        res.redirect('/')
    }

 

})
app.get("/logout", (req,res)=>{
    // req.session.destroy();
    res.redirect("/")
});


app.listen(port,()=>{
    console.log(`Server listening at ${port}`);
})
// //oreder of writing
// //remember the way of writing at the right place
const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
//handling authentication
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo');//install library before using it
const sassMiddleware=require('node-sass-middleware');
app.use(sassMiddleware(
    {
        src:'./assets/scss',//remenber./
        dest:'./assets/css',
        debug:true,//showing error while comiling into css,
        outputStyle:'extended',//multiple lines or single elines
        prefix:'/css'
    }
));//rember the position

app.use(bodyParser.urlencoded({extended: false}))
//using cookir parser first install it
app.use(cookieParser());
//to use before view
app.use(express.static('./assets'));

app.use(expressLayouts);//tell befoore layout is using
// extract style and scripts from sub pages into the layout

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
//mongo store is used to store the session cookie in the db

app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,//false to unintialesed session
    resave: false,//if session is saved then dont want rewrite
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store:MongoStore.create(
        {
            mongoUrl:'mongodb://localhost/codeial_development',
            autoRemove:'disabled'
        },
        function(err)
        {
            console.log(err||'connect-mogodb setup ok')

        }
    )


}));
//tell app to use passport and passport session passport also has session helps to mainatning the session
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser)
// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


// use express router
app.use('/', require('./routes'));



app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
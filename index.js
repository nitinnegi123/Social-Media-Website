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
app.use(bodyParser.urlencoded({extended: false}))
//using cookir parser first install it
app.use(cookieParser());
//to use before view
app.use(express.static('./assets'));

app.use(expressLayouts);//tell befoore layout is using
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,//false to unintialesed session
    resave: false,//if session is saved then dont want rewrite
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));
//app to use passport and passport session passport also has session
app.use(passport.initialize());
app.use(passport.session());

// use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
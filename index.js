const express=require('express');
const app=express();
const bodyParser = require('body-parser')
const cookieParser=require('cookie-parser');
const expressLayouts=require('express-ejs-layouts');
app.use(expressLayouts);//tell befoore layout is using
const port=8000;
app.use(bodyParser.urlencoded({extended: false}))
//using cookir parser first install it
app.use(cookieParser());
const db=require('./config/mongoose');
//to use before view
app.use(express.static('./assests'));
//extract style and scripts from sub pages to layout
app.set("layout extractStyles",true)
app.set("layout extractScripts",true)
//use express router
app.use('/',require('./routes/index.js'))
//set up view engine
app.set('view engine','ejs');
app.set('views',"./views")
app.listen(port,function(error)
{
    if(error)
    {
        console.log(`error in the running:${error}`);
    }
    console.log(`running port is ${port}`)
})
const express=require('express');
const app=express();
const port=8000;
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
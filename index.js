const express=require('express');
const app=express();
const port=8000;
app.listen(port,function(error)
{
    if(error)
    {
        console.log(`error in the running:${error}`);
    }
    console.log(`running port is ${port}`)
})
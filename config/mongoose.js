const mongoose=require("mongoose");
mongoose.connect('mongodb://localhost/codeial_development');
const db=mongoose.connection;
db.on('error',console.error.bind(console,"error connecting to databse"));
db.once('open',function()
{
    console.log('connection to database::mongodb')
});
module.exports=db;


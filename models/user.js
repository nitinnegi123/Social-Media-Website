const mongoose=require('mongoose');
const { use } = require('../routes');
const userSchema=new mongoose.Schema(
    {
        email:
        {
            type:String,
            required:true,
            unique:true
        },
        password:
        {
            type:String,
            required:true
        },
        name:
        {
            type:String,
            required:true
        }
    },{
        timestamps:true
        //it manages to maintain created and updted at the dtata
    }
);
const user=mongoose.model('user',userSchema);
module.exports=user;


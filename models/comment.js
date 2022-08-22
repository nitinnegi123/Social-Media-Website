const mongoose=require('mongoose');


const commentSchems= new mongoose.Schema(
    {
        content:{
            type:String,
            required:true
        },
        //comments belongs to a user
        user:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        post:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Post'
        }
        

    },
    {
        timestamps:true
    }
)
const Comment=mongoose.model('Comment',commentSchems);
module.exports=Comment;
// we are using here not in config because we are posting it for user schema we can make it common in config
const mongoose = require('mongoose');
const multer=require("multer");
const path=require('path');
//it will be stored path name
const AVATAR_PATH=path.join('/uploads/users/avatars')
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar:{
        type:String
    }
}, {
    timestamps: true//it manages to maintain created and updted at the dtata
});
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  })
//statics methods

userSchema.statics.uploadedAvatar=multer({storage:storage,limits:{fileSize:1024*100}})
// fileFilter:function(req,file,cb)
// {
//     const fileSize = parseInt(req.headers["content-length"]);
//     if(fileSize>1024*10)
//     {
//         req.flash('error','file extended')
//         cb(null,false)
//     }
// }})
.single('avatar');
userSchema.statics.avatarPath=AVATAR_PATH;




const User = mongoose.model('User', userSchema);

module.exports = User;
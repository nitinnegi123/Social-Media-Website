const User=require('../../../models/user');
const jwt=require('jsonwebtoken');
//after getting username and password we have to generate the web token
module.exports.createSession = async function(req, res){
    try
    {
        let user=await User.findOne({email:req.body.email});
        if(!user||user.password!=req.body.password)
        {
            //422 invalid input
            res.status(422).json({
                message:"invalid username or password"
            })
        }
        res.status(200).json({
            message:"signed in successful ,here is your token,please keep it safe",
            data:
            {
                token:jwt.sign(user.toJSON(),'codeial',{expiresIn:'10000000'})
            }
        })

    }catch(e)
    {
        res.status(500).json({
            message:"internal server error"
        })
    }
}

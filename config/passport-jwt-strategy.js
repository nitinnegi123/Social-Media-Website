const passport=require('passport');
const JWTStrategy=require('passport-jwt').Strategy;
//it helps us to extract the token from the header
const ExtractJWT=require('passport-jwt').ExtractJwt
const User=require('../models/user');
let opts={
    //header is a list of keys has authoriaztion which has bearer key which has jwt token
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:'codial'
};
passport.use(new JWTStrategy(opts,function(jwtPayLoad,done)
{
    User.findById(jwtPayLoad._id,function(err,user)
    {
        if(err)
        {
            console.log('error in finding user');
            return;
        }
        if(user)
        {
            return done(null,user);
        }
        else
        {
            return done(null,false);
        }
    })
}))
module.exports=passport
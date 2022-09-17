const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');

//tell passport to use a new strategy for google login
passport.use(new googleStrategy(
    {
        clientID:"499666480070-mc6apej0takbbeej23avm50natgehog4.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL:"http://localhost:8000/users/auth/google/callback"//it will be matched with gogel callback url

    },
    function(accessToken,refreshToken,profile,done)
    {
        //accesstoken for authentication like jwt //refreshtoken if accesstoken token expires we will use refreshtoken to get another one without asking user to login again
        //you ccan access many things with this access token like location
        //profile will contain information about profile like email
        //find a user 
        User.findOne({email:profile.emails[0].value}).exec(function(err,user)
        {
            if(err)

            
            {
                console.log('error in google-strategy-error',err);
                return ;
            }
            console.log(profile);
            if(user)
            {
                //if found set this user as req.user
                return done(null,user);

            }
            else
            {
                //if not found create it and set it as req.user
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },function(err,user)
                {
                    if(err)
                    {
                        console.log('error in creating user');
                        return;
                    }
                   return done(null,user);
                })
            }
        })
    }
))
module.exports=passport;
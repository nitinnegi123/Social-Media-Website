const passport=require('passport');
const User=require('../models/user')
const LocalStrategy=require('passport-local').Strategy

// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback:true
},
function(req,email, password, done){
    // find a user and establish the identity
    User.findOne({email: email}, function(err, user)  {
        if (err){
            console.log('Error in finding user --> Passport');
             req.flash('error','invalid username and password')
            return done(err);
        }
        if (!user || user.password != password){
            console.log('Invalid Username/Password');
            req.flash('error','invalid username or password')
            return done(null, false);
        }

        return done(null, user);//two argument first one is error and second one is authentication is in boolean
    });
}


));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
done(null, user.id);
});



// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
User.findById(id, function(err, user){
    if(err){
        console.log('Error in finding user --> Passport');
        return done(err);
    }

    return done(null, user);
});
});
passport.checkAuthentication=function(req,res,next)
{
    //if the user is signed in, then pass on the request to the next function();
    if(req.isAuthenticated())
    {
        return next();
    }
    //if the user is not signed in
    return res.redirect('/users/sign-in')

}
passport.setAuthenticatedUser=function(req,res,next)
{
    if(req.isAuthenticated())
    {
        //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for view
        res.locals.user=req.user;//when users sign in users information is in req.user it is handled by passport
    }
    next();
}



module.exports = passport;

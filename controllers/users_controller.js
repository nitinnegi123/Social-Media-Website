const User = require('../models/user');


module.exports.profile = function(req, res){
    User.findById(req.params.id,function(err,user)
    {
        if(err)
        {
            console.log('error in finding the id')
        }
            return res.render('user_profile', {
            title: 'User Profile',
            profile_user:user
        })
    })
   
}

module.exports.update = function(req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            req.flash('success','users profile updated')
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }
}


// render the sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile')
    }
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile')
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = async function(req, res){
    // if (req.body.password != req.body.confirm_password){
    //     return res.redirect('back');
    // }

    // User.findOne({email: req.body.email}, function(err, user){
    //     if(err){console.log('error in finding user in signing up'); return}

    //     if (!user){
    //         User.create(req.body, function(err, user){
    //             if(err){console.log('error in creating user while signing up'); return}

    //             return res.redirect('/users/sign-in');
    //         })
    //     }else{
    //         return res.redirect('back');
    //     }

    // });
    try
    {
        if (req.body.password != req.body.confirm_password){
            req.flash('error','password is not matching')
            return res.redirect('back');
        }
        let user=await  User.findOne({email: req.body.email})
        if (!user)
        {
            let user_create=await User.create(req.body)
            req.flash('success','your id created')
            return res.redirect('/users/sign-in');
        }
        else
        {
            req.flash('error','users already exists')
            return res.redirect('back');
        };
    }
    catch(e)
    {
        console.log('error',e);
    }
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success','logged in successfully')
    return res.redirect('/');//we can pass in content but it is hectic to pass everytime in res we will make our custom middleware
}
module.exports.destroySession=function(req,res)
{
    //req.logout();//this function is given by passport js
    req.logout(function(err) {
        if (err) { return next(err); }//ask
        req.flash('success','you have logged out!');
        return res.redirect('/');
      });
      req.flash('success','you have logged out!');
}

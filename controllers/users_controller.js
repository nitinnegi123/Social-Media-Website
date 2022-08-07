const User=require('../models/user')
module.exports.profile=function(req,res)
{
    res.render('users',
    {
        title:"yipee",
        content:"users"
    })
}
// render the sign up page
module.exports.signUp=function(req,res)
{
    res.render('user_signup',
    {
        title:"codeial|Sign Up"
    })
}
//render the sign in page
module.exports.signIn=function(req,res)
{
    res.render('user_signin',
    {
        title:"codeial|Sign In"
    })
}
module.exports.create=function(req,res)
{
    if(req.body.password!=req.body.confirm_password)
    {
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function
        (err,user)
        {
            if(err)
            {
                console.log('error in creating user while signing up')
                return;
            }
            if(!user)
            {
                User.create(req.body,function(err,user)
                {
                    if(err)
                    {
                        console.log('error in signing the page')
                        return;
                    }
                    return res.redirect('/users/sign-in')
                })

            }else
            {
                console.log('try zNother username')
                window.alert('try another username')
                res.redirect('back');
            }

        })
   
}
module.exports.createSession=function(req,res)
{
    //to do
}
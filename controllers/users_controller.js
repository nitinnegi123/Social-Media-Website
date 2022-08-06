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
    //to do
}
module.exports.createSession=function(req,res)
{
    //to do
}
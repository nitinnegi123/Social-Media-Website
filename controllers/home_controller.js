module.exports.home=(req,res)=>
{
    // res.cookie('user_id',25);//chnaging at response
    //console.log(req.cookies) //coming from request
    return res.render('home',
    {
        title:"home"
    })
}
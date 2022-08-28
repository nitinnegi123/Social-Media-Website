module.exports.setFlash=function(req,res,next)
{
    res.locals.flash={
        'success':req.flash('success'),
        'error':req.flash('error')
    }
    next();
}//flash helps to store in the session and lets it go ffor the next session
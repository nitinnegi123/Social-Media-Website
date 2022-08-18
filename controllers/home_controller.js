const Post=require('../models/post')
const { post } = require('../routes/posts')
module.exports.home=(req,res)=>
{
    // res.cookie('user_id',25);//chnaging at response
    //console.log(req.cookies) //coming from request
//    Post.find({},function(err,posts)
//    {
//         return res.render('home',
//         {
//             title:"home",
//             posts:posts
//         })
//    })
//when query get longer use exec for callback
   Post.find({}).populate('user').exec(function(err,posts)
   {
        return res.render('home',
        {
            title:"home",
            posts:posts
        })
   })
}
// module.exports.actionName = function(req, res){}
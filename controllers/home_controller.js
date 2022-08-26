const { populate } = require('../models/post')
const Post=require('../models/post')
const { post } = require('../routes/posts')
const User=require('../models/user');
module.exports.home=async function(req,res)
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
//when populating two models at a time we use this preloading comments and user
//    Post.find({})
//    .populate('user')
//    .populate(
//     {
//         path:'comments',
//         populate:{
//             path:'user'
//         }
//     }
//    ).exec(function(err,posts)
//    {    
//         if(err)
//         {
//             console.log('error in finding post')
//             return res.redirect('/');
//         }
//         User.find({},function(err,users)
//         {
//             return res.render('home',
//             {
//             title:"home",
//             posts:posts,
//             all_users:users
//             })


//         })
        
//    })
//using then 
//Post.find({}).populate('comments').then(function());
try{
    let posts=await Post.find({})
    .populate('user')
    .populate(
     {
         path:'comments',
         populate:{
             path:'user'
         }
     });
     let users=await User.find({})
     return res.render('home',
     {
     title:"home",
     posts:posts,
     all_users:users
     });
}catch(e)
{
    console.log('error',e);

}
}
// module.exports.actionName = function(req, res){}
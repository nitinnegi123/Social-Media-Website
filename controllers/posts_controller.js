const Post = require('../models/post');
const User = require('../models/user');
const Comment=require('../models/comment')

module.exports.create = function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function(err, post){
        if(err){console.log('error in creating a post'); 
        return res.redirect('back ');
    }

        
    });
    req.flash('success','post created successfully')
    return res.redirect('back');
}
module.exports.destroy=async function(req,res)
{
    // Post.findById(req.params.id,function(err,post)
    // {
    //     if(err)
    //     {
    //         console.log('error in finding id');
    //         return res.redirect('back');
    //     }
    //     //.id automatically converts into string post.user is string id
        // if(post.user==req.user.id){
        //     post.remove();
        //     Comment.deleteMany({post:req.params.id},function(err)
        //     {
        //         return res.redirect('back');
        //     })

        // }
        // else
        // {
        //     return res.redirect('back');
        // }
            
         


    // })
    try{
        let post=await Post.findById(req.params.id);
        if(post.user==req.user.id){
            post.remove();
            let comments=await Comment.deleteMany({post:req.params.id})
            req.flash('success','post deleted succesfuuly')
            return res.redirect('back');
        }
        else
        {
            req.flash('error','unable to delete post')
            return res.redirect('back');
        }
    }catch(e)
    {
        req.flash('error','unable to delete post')
        console.log('error',e)
    }

}
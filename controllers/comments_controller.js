const Comment=require('../models/comment');
const Post=require('../models/post')

module.exports.create=async function(req,res)
{
    // Post.findById(req.body.post,function(err,post)
    // {
    //     if(err)
    //     {
    //         console.log('error in finding the post')
    //     }
    //     if(post)
    //     {
    //         Comment.create({
    //             content:req.body.content,
    //             user:req.user._id,
    //             post:req.body.post
    //         },function(err,comment)
    //         {
    //             if(err)
    //             {
    //                 console.log('error in creating comment')
    //             }
    //             //first we do updation so save it after every update
    //             post.comments.push(comment);
    //             post.save();
    //             res.redirect('/');
    //         })
    //     }

    // })
    try{
        let post=await Post.findById(req.body.post)
        if(post)
        {
            let comment=await Comment.create({
                content:req.body.content,
                user:req.user._id,
                post:req.body.post
            })
                //first we do updation so save it after every update
                post.comments.push(comment);
                post.save();
             
                req.flash('success','comment added')
                res.redirect('/');
        }
    }catch(e)
    {
        console.log('error',e);
    }
}
module.exports.destroy=async function(req,res)
{
    // Comment.findById(req.params.id,function(err,comment)
    // {
    //     if(err)
    //     {
    //         console.log('enable to find id');
    //     }
    //     if(comment)
    //     {
    //             let postId=comment.post;
    //             comment.remove();//before removing we have to remove comment in post otherwisw we have no trace of comments in post

    //             Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,post)
    //             {
    //                 if(err)
    //                 {
    //                     console.log('error in finding comment')
    //                 }
    //                 res.redirect('back');
    //             });

            
    //     }
    // })
   try{
    let comment=await Comment.findById(req.params.id)
    if(comment)
    {
        let postId=comment.post;
        comment.remove();//before removing we have to remove comment in post otherwisw we have no trace of comments in post

        let post=await Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}})
        post.save();
         // send the comment id which was deleted back to the views
      
        req.flash('error','comment deleted')
        res.redirect('back');
    } 
   }
   catch(e)
   {
    console.log('error',e)
   }
}
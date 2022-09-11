const Post=require('../../../models/post');
const Comment=require('../../../models/comment');
module.exports.index=async function(req,res)
{
    
    let posts=await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate(
     {
         path:'comments',
         populate:{
             path:'user'
         }
     });
    return res.json(200,{
        message:"list of posts",
        posts:posts
    })
}
module.exports.destroy=async function(req,res)
{
   
try
{
    let post=await Post.findById(req.params.id);
    if(req.user.id==post.user)
    {
        post.remove();
        let comments=await Comment.deleteMany({post:req.params.id})
        return res.status(200).json({
            message:'post and associated comment deleted'
        })
    }
    else
    {
        return res.status(401).json({
            message:'you cannot delete this post'
        })
    }   
   
}catch(e)
{
    return res.status(500).json({
        message:'internal server error'
    })
}

}
const cloudinary = require('../middleware/cloudinary')
const Post = require('../models/Post')

exports.createPost = async (req, res) => {
    try{
        const result = await cloudinary.uploader.upload(req.file.path)

        await Post.create({
            title:req.body.title,
            image:result.secure_url,
            caption:req.body.caption,
            likes:0,
            user:req.user,
            cloudinaryId: result.public_id,
        })
    
        res.redirect('/profile')
    } catch(e){
        console.error(e)
    }
}

exports.getPost = async (req, res) => {
    try{
        const post = await Post.findOne({_id: req.params.id}).populate('user').lean()

        await res.render('post.ejs', {user: post.user, post: post})

        console.log(post)
    } catch(error){
        console.error(error)
    }
    
}

exports.likePost = async (req, res) => {
    try{
        const post = await Post.findOne({_id: req.params.id})
        post.likes += 1;
        await post.save()
        return res.redirect('/post/'+req.params.id)
    }
    catch(error){
        console.error(error)
    }
}
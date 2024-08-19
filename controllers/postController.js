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
            user:req.user, //wanted to do id and then populate it, but im too far in to fix this
            cloudinaryId: result.public_id,
        })
    
        res.redirect('/profile')
    } catch(e){
        console.error(e)
    }
}

exports.getPost = async (req, res) => {
    try{
        const post = await Post.findOne({_id: req.params.id}).populate('user')

        await res.render('post.ejs', {user: req.user, post: post})

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

exports.deletePost = async (req, res) => {
    try{
        const post = await Post.findOne({_id: req.params.id})


        await cloudinary.uploader.destroy(post.cloudinaryId)
        await Post.deleteOne({_id: req.params.id})

        return await res.redirect('/profile')
    }
    catch(error){
        console.error(error)
        res.redirect('/profile')
    }
    
}
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
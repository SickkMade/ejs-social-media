const Post = require('../models/Post')

module.exports = {
    getIndex:(req, res) => {
        res.render('index.ejs', {isAuth: req.isAuthenticated()})
    },
    getProfile: async (req, res) => {
        const posts = await Post.find({user:req.user.id}).sort({createdAt:"desc"}).lean()

        await res.render('profile.ejs', {user: req.user, posts:posts})
    },
    getFeed: async (req, res) => {
        const posts = await Post.find().sort({createdAt:"desc"}).lean()

        await res.render('feed.ejs', {posts: posts})
    }
}


module.exports = {
    getIndex:(req, res) => {
        res.render('index.ejs')
    },
    getProfile: (req, res) => {
        res.render('profile.ejs', {user: req.user})
    },
    getFeed: (req, res) => {
        res.render('feed.ejs')
    }
}